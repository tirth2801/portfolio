---
title: E-Commerce Platform
repoUrl: https://github.com/tirth2801/amazon-clone
liveUrl: https://clone-cbb4c.web.app/
image: amazonClone.png
order: 2
stack: [React, Node.js, MongoDB, Firebase Auth, Stripe]
outcome: "Full checkout-to-order-history flow, live payments included"
---

**Problem:** build a production-shaped e-commerce flow — not just a product
grid — covering auth, cart state, payment, and order history.

**Approach:** MERN stack with Firebase for authentication and the Stripe API
for checkout/payments. Cart and checkout state are managed with React hooks
for real-time updates; completed orders persist to MongoDB per user, keyed off
the authenticated session.

- Modular React components for the product grid, cart, and checkout flow.
- Firebase authentication gating checkout and order history.
- Stripe-backed payment flow from cart to confirmed order.
- Per-user order history persisted in MongoDB.
