# Why @infracia/razorpay

this nodejs package is wrapper for razorpay payment gateway with upto date api and typescript types, it's easier to use with your next nodejs project.
we are maintaining and regularly updating this package as per changes on razorpay api. This project is open source from infracia technologies,
you can contribute on this project by reporting errors or suggest us changes
using pull requests. Thank you.

# ⚠️ Note

we have created this package using razorpay documentation for api and webhook,
you may find `type errors` while using this package, we urge you to please report them [here](https://github.com/infracia/razorpay/issues)

this comment will be removed when the package is fully tested

# Module verification

all the api calls are seperated by services aka categories, their request and response required to be verified, check below list to see what api are fully functional in this package, you can also help complete us the verification by letting us know in github by submiting your report in issue section.

### ✔️ Passed

- none

### 🚧 Pending

- customer
- invoice
- items
- order
- payment-links
- payment
- refund
- settlements-ondemand
- settlements
- smart-collect
- subscription-addon
- subscription-plan
- subscription
- transfers
- webhook - orders
- webhook - payments
- webhook - refunds
- webhook - disputes
- webhook - invoices
- webhook - subscriptions
- webhook - partners
- webhook - route
- webhook - smart-collect
- webhook - payment-links
- webhook - razorpayx

# Example

```ts
import Razorpay from "@infracia/razorpay";

// create global instance
const razorpay = new Razorpay({
  keyId: "your key id",
  keySecret: "your key secret",
});

// get all orders
const orders = await razorpay.order.getAll();
console.log(orders);
```

# We are open for new suggestions

if you have any suggestions regarding razorpay, you can open a issue at github and let us know you idea, we will surely help you out.

# Disclaimer

This package is not associated with `Razorpay Software Private Limited` in any matter, it is created at `Infracia Technologies Private Limited` for internal projects, The package is published under MIT license for public usage. If you have any queries please contact us at `contact@infracia.com`

# Thank you
