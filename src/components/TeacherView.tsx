import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import AvailableTaxis from './AvailableTaxis';
import TaxiColors from './TaxiColors';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TAXI_COLORS, TAXI_NAMES } from '@/constants/taxis'; // ✅ Use shared constants

const TeacherView: React.FC = () => {
  const { taxiState } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 p-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">🚖 Available Taxis</CardTitle>
            <p className="text-blue-100">Currently available taxi services</p>
          </CardHeader>
          <CardContent className="p-0">
            <AvailableTaxis
              colors={TAXI_COLORS}
              selectedColors={taxiState.selectedColors}
              taxiNames={TAXI_NAMES} // ✅ Updated to use shared labels
              showLabels={true}
            />
          </CardContent>
        </Card>

        <Separator className="my-4" />

        {/* Full Taxi Overview */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">All Taxis</h3>
            <TaxiColors
              colors={TAXI_COLORS}
              selectedColors={taxiState.selectedColors}
              taxiNames={TAXI_NAMES} // ✅ Updated to use shared labels
              onColorToggle={() => {}}
              onNameChange={() => {}}
              isClickable={false}
              showLabels={true}
            />
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Announcements</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="text1">Announcement 1</Label>
                <Textarea
                  id="text1"
                  value={taxiState.textField1}
                  readOnly
                  placeholder="No announcement"
                  className="mt-1 bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="text2">Announcement 2</Label>
                <Textarea
                  id="text2"
                  value={taxiState.textField2}
                  readOnly
                  placeholder="No announcement"
                  className="mt-1 bg-gray-50"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherView;
