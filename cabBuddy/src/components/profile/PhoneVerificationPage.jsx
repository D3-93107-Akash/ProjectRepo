import { Card } from "../../components/ui/card";

export default function PhoneVerificationPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
  
      <Card className="w-full max-w-md p-6 space-y-4">

        <h1 className="text-xl font-semibold text-blue-700">
          Verify your mobile number
        </h1>

        <p className="text-sm text-slate-600">
          We’ll send a one-time passcode (OTP) to your registered phone number.
        </p>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-slate-700">Phone number</label>
            <input
              type="tel"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="+91 98765 43210"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-600 transition"
          >
            Send OTP
          </button>
        </form>
      </Card>
    </div>
  );
}
