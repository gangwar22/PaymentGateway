import React, { useState } from "react";
import axios from "axios";

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async (provider) => {
    try {
      setLoading(true); // Show loading state while generating the payment link
      const { data } = await axios.post("https://payment-gateway-sable.vercel.app/generate-upi-link", {
        provider,
        amount: 10, // Example amount
      });

      if (data.paymentUrl) {
        // Try opening the UPI link
        window.location.href = data.paymentUrl;

        // Wait for 3 seconds to check if the app opened
        setTimeout(() => {
          if (document.visibilityState === "visible") {
            // If the page is still visible, suggest downloading the app
            alert("It seems the app is not installed. Redirecting to the app store.");
            redirectToDownload(provider);
          } else {
            // The UPI app opened successfully
            alert("Please complete your payment in the app.");
          }
        }, 3000);
      } else {
        alert("Payment failed!");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Error initiating payment");
    } finally {
      setLoading(false); // Hide loading state after processing
    }
  };

  // Redirect to App Download Page if app is not installed
  const redirectToDownload = (provider) => {
    const downloadLinks = {
      gpay: "https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user",
      phonepe: "https://play.google.com/store/apps/details?id=com.phonepe.app",
      paytm: "https://play.google.com/store/apps/details?id=net.one97.paytm",
    };

    window.location.href = downloadLinks[provider] || "https://play.google.com";
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-2xl font-bold">Choose Payment Method</h2>
      <button
        onClick={() => initiatePayment("paytm")}
        className="px-6 py-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        Pay with Paytm
      </button>
      <button
        onClick={() => initiatePayment("gpay")}
        className="px-6 py-2 bg-green-500 text-white rounded"
        disabled={loading}
      >
        Pay with Google Pay
      </button>
      <button
        onClick={() => initiatePayment("phonepe")}
        className="px-6 py-2 bg-purple-600 text-white rounded"
        disabled={loading}
      >
        Pay with PhonePe
      </button>

      {loading && <p>Loading... Please wait.</p>}
    </div>
  );
};

export default PaymentPage;
