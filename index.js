const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = `#graphql
  type Product {
    id: ID
    name: String
    stockLevel: Int
    inStock: Boolean
  }

  type Query {
    product(id: ID!): Product
    products: [Product]
  }

  type Mutation {
    updateStock(id: ID!, quantity: Int!): Product
  }
`;

// Layer 2 — Cache (in-memory store)
const products = [
  { id: '1', name: 'Widget', stockLevel: 42 },
  { id: '2', name: 'Gadget', stockLevel: 7 },
];

// Layer 1 — Simulated warehouse sync (runs every 10 seconds)
setInterval(() => {
  products.forEach(product => {
    const change = Math.floor(Math.random() * 11) - 5; // random -5 to +5
    product.stockLevel = Math.max(0, product.stockLevel + change);
    console.log(`🔄 Synced: ${product.name} → stockLevel now ${product.stockLevel}`);
  });
}, 10000);

const resolvers = {
  Query: {
    product: (parent, args) => {
      return products.find(p => p.id === args.id);
    },
    products: () => products,
  },

  // Layer 4 — inStock derived automatically from stockLevel
  Product: {
    inStock: (parent) => parent.stockLevel > 0,
  },

  // Layer 3 — Mutation to manually update stock (simulates sync writing)
  Mutation: {
    updateStock: (parent, args) => {
      const product = products.find(p => p.id === args.id);
      if (!product) return null;
      product.stockLevel = Math.max(0, args.quantity);
      console.log(`✏️  Manual update: ${product.name} → stockLevel now ${product.stockLevel}`);
      return product;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀 Server ready at: ${url}`);
  console.log(`🔄 Warehouse sync running every 10 seconds...`);
});