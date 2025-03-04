import React from "react";
import axios from "axios";

const PaymentPage = () => {
  const initiatePayment = async (provider) => {
    try {
      const { data } = await axios.post("https://payment-gateway-sable.vercel.app/generate-upi-link", {
        provider,
        amount: 100, // Example amount
      });

      if (data.paymentUrl) {
        // Try opening the UPI link
        window.location.href = data.paymentUrl;

        // Wait for 3 seconds to check if the app opened
        setTimeout(() => {
          if (document.visibilityState === "visible") {
            // If the app didn't open, do NOT show download page (user already has app)
            console.log("App not opened. Check UPI limit or try a different amount.");
            alert("Payment app didn't open. Check UPI limit or try a smaller amount.");
          }
        }, 3000);
      } else {
        alert("Payment failed!");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Error initiating payment");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-2xl font-bold">Choose Payment Method</h2>
      <button onClick={() => initiatePayment("paytm")} className="px-6 py-2 bg-blue-600 text-white rounded">
        Pay with Paytm
      </button>
      <button onClick={() => initiatePayment("gpay")} className="px-6 py-2 bg-green-500 text-white rounded">
        Pay with Google Pay
      </button>
      <button onClick={() => initiatePayment("phonepe")} className="px-6 py-2 bg-purple-600 text-white rounded">
        Pay with PhonePe
      </button>
    </div>
  );
};

export default PaymentPage;
