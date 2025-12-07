import { Card } from "../../components/ui/card";

export default function DrivingLicenseVerificationPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-xl font-semibold text-blue-700">
          Add your driving license
        </h1>

        <p className="text-sm text-slate-500">
          Add your license details to become eligible for driving on CabBuddy.
        </p>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-slate-600">License number</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              placeholder="DL-XXXXXXXXXX"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Expiry date</label>
            <input
              type="date"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Upload license photo</label>
            <input type="file" className="w-full mt-1 text-sm" accept="image/*" />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save and submit
          </button>
        </form>
      </Card>
    </div>
  );
}
