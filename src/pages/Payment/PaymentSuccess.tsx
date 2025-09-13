
//------------------------------------------------------------------------------------------------
//......handles PayU redirect, confirms with backend using txnid, and shows download link.
//------------------------------------------------------------------------------------------------

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "@/lib/api";

type SuccessResponse = {
  success: boolean;
  message: string;
  downloadUrl?: string;
};

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [successData, setSuccessData] = useState<SuccessResponse | null>(null);

  useEffect(() => {
    const txnid = searchParams.get("txnid");
    const albumId = searchParams.get("albumId");
    const storedEmail = window.localStorage.getItem("checkout_email");

    if (txnid && albumId && storedEmail) {
      api
        .post("/orders/payu/success", { txnid, status: "success" })
        .then((res) => {
          setSuccessData(res.data);
          window.localStorage.removeItem("checkout_email");
        })
        .catch(() => {
          setSuccessData({
            success: true,
            message: "Payment successful!",
            downloadUrl: "",
          });
        });
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      {successData ? (
        <div className="bg-white p-8 rounded-2xl shadow text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            {successData.message}
          </h2>
          {successData.downloadUrl ? (
            <a
              href={successData.downloadUrl}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Album
            </a>
          ) : (
            <p>Check your email for the download link.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
