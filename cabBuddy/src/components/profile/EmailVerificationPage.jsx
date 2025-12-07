import { Card } from "../../components/ui/card";

export default function EmailVerificationPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-xl font-semibold text-blue-700">
          Verify your email
        </h1>

        <p className="text-sm text-slate-500">
          We’ll send a verification link to your email address.
        </p>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-slate-600">Email address</label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              placeholder="abcd@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Send verification email
          </button>
        </form>
      </Card>
    </div>
  );
}
