import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Bookings() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">My Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Mumbai to Pune</h3>
                  <p className="text-gray-600">Date: January 15, 2024</p>
                  <p className="text-gray-600">Time: 11:00 AM</p>
                  <p className="text-gray-600">Price: ₹350</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Cancel</Button>
                </div>
              </div>
            </div>

            <div className="text-center py-8 text-gray-500">
              <p>No more bookings found.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

