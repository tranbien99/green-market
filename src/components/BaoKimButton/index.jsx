import React from "react";
import Baokim from "baokim-react";

export default function BaoKimButton() {
  return (
    <Baokim
      type="checkout" // pro or checkout
      apiKey="v8ew5rvFMuH2gTCOGslofZGnQ2wGI6bC"
      configOrder={{
        // order config
        mrc_order_id: `my_order_id_${Math.random()
          .toString(36)
          .substring(2)}_${Date.now()}`,
        total_amount: 20000,
        payment_method_type: "card",
        description: "thanh toan dien thoai iphone xs max gia re",
        success_url:
          "https://sandbox-api.baokim.vn/payment/v8ew5rvFMuH2gTCOGslofZGnQ2wGI6bC",
        cancel_url: "https://www.messenger.com/",
      }}
      configButton={{
        // button config
        title: "Thanh toán với Bảo Kim",
        style: {
          background: "#eee",
          color: "#000",
          padding: "1rem",
        },
      }}
    />
  );
}
