import type { AxiosError } from "axios";

import { Razorpay } from "../src/index.js";

async function main() {
  const api = new Razorpay({
    keyId: "rzp_test_Gd3kNUYrH4Ot1Z",
    keySecret: "dDPUVKhTrH6GnB72ukHukBJf",
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
