import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Phone, MessageCircle, Navigation, Clock, MapPin, Package } from "lucide-react";

interface ConfirmationScreenProps {
  onDeliveryComplete: () => void;
  onCancel: () => void;
}

export function ConfirmationScreen({ onDeliveryComplete, onCancel }: ConfirmationScreenProps) {
  const [eta, setEta] = useState(2);
  const [status, setStatus] = useState<'arriving' | 'arrived' | 'in_progress'>('arriving');
  
  const rider = {
    name: "Muhammad Bello",
    rating: 4.9,
    vehicle: "Motorcycle",
    licensePlate: "ABC 123 AB",
    phone: "+234 803 123 4567"
  };

  // Simulate rider arrival and delivery progress
  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'arriving' && eta > 0) {
        setEta(prev => Math.max(0, prev - 1));
      } else if (status === 'arriving' && eta === 0) {
        setStatus('arrived');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [eta, status]);

  const handleStartDelivery = () => {
    setStatus('in_progress');
    setTimeout(() => {
      onDeliveryComplete();
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Status Header */}
      <div className="bg-[var(--jetdash-brown)] px-6 py-8 text-white">
        <div className="text-center space-y-2">
          {status === 'arriving' && (
            <>
              <h1 className="text-2xl font-semibold">Dispatch rider is on the way</h1>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="text-lg">ETA: {eta} minute{eta !== 1 ? 's' : ''}</span>
              </div>
            </>
          )}
          {status === 'arrived' && (
            <>
              <h1 className="text-2xl font-semibold">Your dispatch rider has arrived!</h1>
              <p className="text-orange-100">Look for {rider.vehicle} • {rider.licensePlate}</p>
            </>
          )}
          {status === 'in_progress' && (
            <>
              <h1 className="text-2xl font-semibold">Delivery in progress</h1>
              <p className="text-orange-100">Your package is on its way!</p>
            </>
          )}
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Rider Info */}
        <Card className="shadow-jetdash border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[var(--jetdash-orange)] rounded-full flex items-center justify-center">
                <span className="text-2xl font-semibold text-white">
                  {rider.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[var(--jetdash-brown)]">{rider.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-amber-500">★ {rider.rating}</span>
                  <span className="text-muted-foreground">• {rider.vehicle}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{rider.licensePlate}</p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1 h-12 rounded-xl border-[var(--jetdash-brown)] text-[var(--jetdash-brown)]"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 h-12 rounded-xl border-[var(--jetdash-brown)] text-[var(--jetdash-brown)]"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Details */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <h3 className="font-semibold text-[var(--jetdash-brown)] mb-4">Delivery Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Pickup Location</p>
                  <p className="text-sm text-muted-foreground">GRA Phase 2, Abuja</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-sm text-muted-foreground">Federal Low Cost Housing Estate</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--jetdash-light-orange)]/30 rounded-xl p-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-[var(--jetdash-brown)]" />
                  <div>
                    <p className="font-medium text-[var(--jetdash-brown)]">Delivery Fee</p>
                    <p className="text-sm text-muted-foreground">Cash on delivery to rider</p>
                  </div>
                </div>
                <span className="text-lg font-semibold text-[var(--jetdash-brown)]">₦800</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Tracking */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[var(--jetdash-brown)]">Live Tracking</h3>
              <Button variant="ghost" size="sm" className="text-[var(--jetdash-brown)]">
                <Navigation className="w-4 h-4 mr-1" />
                View Map
              </Button>
            </div>
            
            <div className="h-32 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Navigation className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Real-time tracking active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-6 left-6 right-6 space-y-3">
        {status === 'arrived' && (
          <Button 
            onClick={handleStartDelivery}
            className="w-full h-14 bg-[var(--jetdash-orange)] text-white hover:bg-[var(--jetdash-light-orange)] rounded-2xl text-lg font-semibold shadow-lg"
          >
            Start Delivery
          </Button>
        )}
        
        {status === 'arriving' && (
          <Button 
            onClick={onCancel}
            variant="outline"
            className="w-full h-12 border-red-500 text-red-500 hover:bg-red-50 rounded-xl"
          >
            Cancel Request
          </Button>
        )}
      </div>
    </div>
  );
}