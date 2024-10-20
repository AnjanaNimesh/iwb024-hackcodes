import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './donation.css';

declare const payhere: any;

interface UserData {
  name: string;
  email: string;
  mobile: string;
  address: string;
}

interface DonationFormProps {
  userData: UserData;
}

const DonationForm: React.FC<DonationFormProps> = ({ userData }) => {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    script.onload = () => console.log("PayHere SDK loaded");
    script.onerror = () => console.error("Failed to load PayHere SDK");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);

    };
  }, []);

  // Generate Hash function
  const generateHash = async (
    merchant_id: string,
    order_id: string,
    amount: string,
    currency: string,
    merchant_secret: string
  ): Promise<string> => {
    try {
      const response = await fetch("http://localhost:5000/generate-hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id,
          order_id,
          amount,
          currency,
          merchant_secret,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.hash; // Return the generated hash
    } catch (error) {
      console.error("Error generating hash:", error);
      throw error; // Rethrow to handle it in the handleDonate function
    }
  };

  const handleDonate = async () => {
    if (!amount) {
      toast.error("Please enter a donation amount.");
      return;
    }
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid number.");
      return;
    }
    
    const merchant_id = "1228376"; // Your Merchant ID
    const merchant_secret =
      "MzE1ODIwMjI2NDIxMzI3Mzk4NTczOTY1ODE1NjYxMTM1NTcxMDExMQ=="; // Your Merchant Secret
    const order_id = `ItemNo${Date.now()}`; // Unique order ID
    const currency = "LKR"; // Currency
    const notify_url =
      "https://0050-2402-d000-8118-5426-45f6-ae62-9322-8f7d.ngrok-free.app/payment-notify"; // Your notify URL
    const return_url = "http://localhost:5173/success"; // Redirect after payment
    const cancel_url = "http://localhost:5173/cancel"; // Redirect if payment is canceled
    const first_name = userData?.name?.split(" ")[0] || "First"; // Extract first name
    const last_name = userData?.name?.split(" ")[1] || "Last"; // Extract last name
    const email = userData?.email || "example@example.com"; // Use user email
    const phone = userData?.mobile || "0771234567"; // Use user phone
    const address = userData?.address || "Sri Lanka"; // Use user address
    const city = "Colombo"; // Example city
    const country = "Sri Lanka"; // Example country

    try {
      const hash = await generateHash(
        merchant_id,
        order_id,
        amount,
        currency,
        merchant_secret
      );

      const payment = {
        sandbox: true, // Ensure this is true for testing
        merchant_id: merchant_id,
        return_url: return_url,
        cancel_url: cancel_url,
        notify_url: notify_url,
        order_id: order_id,
        items: "Donation",
        amount: amount,
        currency: currency,
        hash: hash,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        address: address,
        city: city,
        country: country,
      };
      // Event Handlers for PayHere
      payhere.onCompleted = function onCompleted(orderId: string) {
        // Called when the payment is completed successfully
        console.log("Payment completed. OrderID:", orderId);
        toast.success("Payment successful!");
        window.location.href = "/success"; // Redirect to success page
      };

      payhere.onDismissed = function onDismissed() {
        // Called when the user closes the payment window without completing the payment
        console.log("Payment dismissed");
        toast.warn("Payment was canceled.");
      };

      payhere.onError = function onError(error: any) {
        // Called if there's an error with the payment process
        console.error("Payment error:", error);
        toast.error("Payment error. Please try again.");
      };

      // Start PayHere payment
      if (window.payhere) {
        window.payhere.startPayment(payment);
        setAmount("");
      } else {
        console.error("PayHere SDK not loaded");
      }
    } catch (error) {
      console.error("Error during payment process:", error);
    }

    // Sending donation data to the backend
    try {
      const response = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          first_name,
          last_name,
          email,
        }),
      });

      const data = await response.json();
      console.log("Donation saved:", data);
    } catch (error) {
      console.error("Error saving donation:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg">
      <div className="flex flex-col items-center pt-8 p-12 bg-[#f0cca0] rounded-xl shadow-2xl">
        <h2 className="mb-8 text-xl font-bold text-gray-800">
          Donate to Strays
        </h2>
        <div className="flex items-center mb-4 border-none rounded-md">
          <span className="bg-[#bb7d31] border-none text-white px-3 py-2 rounded-l-md">
            LKR
          </span>
          <input
            type="text" // Using text for custom validation
            placeholder="Enter Donation Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 w-80 rounded-r-md focus:outline-none focus:ring-1 focus:ring-[#9a6729]"
          />
        </div>
        <button
          onClick={handleDonate}
          className="px-6 py-2 mt-4 shadow-xl font-bold bg-[#bb7d31] text-white rounded-md hover:bg-[#9a6729] transition duration-300"
        >
          Donate
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DonationForm;
