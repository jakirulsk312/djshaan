import { useSearchParams } from "react-router-dom";

export default function PaymentFailure() {
  const [searchParams] = useSearchParams();
  const txnid = searchParams.get("txnid");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
        <p className="mb-4">Something went wrong with your payment.</p>
        {txnid && (
          <p className="text-sm text-gray-500">Transaction ID: {txnid}</p>
        )}
        <a
          href="/"
          className="px-6 py-3 mt-6 bg-gray-700 text-white rounded-lg hover:bg-gray-800 inline-block"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
