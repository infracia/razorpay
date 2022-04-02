# @infracia/razorpay

This is a powerful Node.js library that makes it easy to interact with the Razorpay API.

# Example

```ts
import Razorpay from "@infracia/razorpay";

// create global instance
const razorpay = new Razorpay({
  keyId: "REPLACE_WITH_API_KEY_ID",
  keySecret: "REPLACE_WITH_API_KEY_SECRET",
});

// get all orders
const orders = await razorpay.order.getAll();
console.log(orders);
```

# ☎️ Need help?

- Open a GitHub issue
