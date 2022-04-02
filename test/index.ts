import type { AxiosError } from "axios";

import { Razorpay } from "../src/index.js";

async function main() {
  if (process.env["RAZORPAY_ID"] === undefined) {
    throw Error("environment key not found: RAZORPAY_ID");
  }

  if (process.env["RAZORPAY_SECRET"] === undefined) {
    throw Error("environment key not found: RAZORPAY_SECRET");
  }

  const api = new Razorpay({
    keyId: process.env["RAZORPAY_ID"],
    keySecret: process.env["RAZORPAY_SECRET"],
  });

  const order = await api.order
    .create({
      amount: 1200,
      currency: "INR",
    })
    .catch((err: AxiosError) => {
      console.log(err.response?.data);
      throw err;
    });

  console.log(order.raw.id);
}

main();
