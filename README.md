# GraphQL Inventory Sync
Northstar Retail Co. | The Meridian Pivot — Sprint 2

A GraphQL-powered inventory sync service built with Apollo Server and Node.js.
Exposes live stock data through a typed API, simulating a warehouse data feed
that updates every 10 seconds.

## What it does
- Queries product stock levels by ID
- Returns inStock status derived from current stock level
- Simulates a live warehouse sync via setInterval
- Supports manual stock updates via GraphQL mutations

## Tech Stack
- Node.js
- Apollo Server
- GraphQL

## How to run
npm install
node index.js

Then open http://localhost:4000 in your browser to access Apollo Sandbox.

## Author
Hannah | Solo Build — Days 1 and 2
