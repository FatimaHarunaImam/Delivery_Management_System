import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Menu, User, MapPin, Clock, Truck } from "lucide-react";
import jetdashLogo from "figma:asset/65d0158fe7ae208ff3fd9bd401c0ba4ecb4059c8.png";

interface DispatchRider {
  id: string;
  name: string;
  rating: number;
  eta: string;
  position: { x: number; y: number };
  vehicle: string;
  status: "available" | "busy";
}

interface CustomerHomeScreenProps {
  onSendPackage: () => void;
  onMenu: () => void;
  onProfile: () => void;
}

export function CustomerHomeScreen({ onSendPackage, onMenu, onProfile }: CustomerHomeScreenProps) {
  const [riders, setRiders] = useState<DispatchRider[]>([
    { id: "1", name: "Muhammad Bello", rating: 4.9, eta: "2 min", position: { x: 45, y: 30 }, vehicle: "Motorcycle", status: "available" },
    { id: "2", name: "Ahmed Usman", rating: 4.8, eta: "4 min", position: { x: 25, y: 60 }, vehicle: "Bicycle", status: "available" },
    { id: "3", name: "Abdallah Garba", rating: 4.7, eta: "3 min", position: { x: 70, y: 40 }, vehicle: "Van", status: "busy" },
    { id: "4", name: "Hayat Ibrahim", rating: 5.0, eta: "5 min", position: { x: 35, y: 75 }, vehicle: "Motorcycle", status: "available" },
    { id: "5", name: "Yusuf Aliyu", rating: 4.6, eta: "6 min", position: { x: 60, y: 20 }, vehicle: "Bicycle", status: "available" },
  ]);

  // Simulate real-time rider movement
  useEffect(() => {
    const interval = setInterval(() => {
      setRiders(prev => prev.map(rider => ({
        ...rider,
        position: {
          x: Math.max(10, Math.min(90, rider.position.x + (Math.random() - 0.5) * 4)),
          y: Math.max(10, Math.min(90, rider.position.y + (Math.random() - 0.5) * 4))
        }
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const availableRiders = riders.filter(rider => rider.status === "available");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-10 h-10"
            onClick={onMenu}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <img 
              src={jetdashLogo} 
              alt="JetDash" 
              className="h-8 w-auto"
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-10 h-10"
            onClick={onProfile}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Current Location */}
      <div className="px-6 py-3 bg-[var(--jetdash-light-orange)]/20">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-[var(--jetdash-brown)]" />
          <span className="text-sm text-[var(--jetdash-brown)]">Your location: Pantami, Gombe</span>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-96 bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden">
        {/* Mock map background with grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(#ddd 1px, transparent 1px),
              linear-gradient(90deg, #ddd 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Your location marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-[var(--jetdash-brown)] rounded-full border-4 border-white shadow-lg"></div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-[var(--jetdash-brown)] bg-white px-2 py-1 rounded-lg shadow-sm whitespace-nowrap">
            You are here
          </div>
        </div>

        {/* Dispatch rider markers */}
        {riders.map((rider) => (
          <div
            key={rider.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ease-in-out"
            style={{
              left: `${rider.position.x}%`,
              top: `${rider.position.y}%`
            }}
          >
            <div className="relative">
              <div className={`w-8 h-8 ${rider.status === 'available' ? 'bg-[var(--jetdash-orange)]' : 'bg-gray-400'} rounded-full border-2 border-white shadow-lg flex items-center justify-center`}>
                <Truck className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-[var(--jetdash-brown)] bg-white px-2 py-1 rounded-lg shadow-sm whitespace-nowrap">
                {rider.eta}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Location Input */}
      <div className="px-6 py-4 bg-white shadow-sm">
        <div className="space-y-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            <Input 
              placeholder="Pickup location"
              className="pl-10 h-12 bg-[var(--input-background)] border-0 rounded-xl"
              defaultValue="Current location (Pantami)"
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
            <Input 
              placeholder="Delivery address (e.g., Gombe Central, Tudun Wada)"
              className="pl-10 h-12 bg-[var(--input-background)] border-0 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Available Dispatch Riders */}
      <div className="px-6 py-4">
        <h3 className="font-semibold text-[var(--jetdash-brown)] mb-4">
          Available Dispatch Riders ({availableRiders.length})
        </h3>
        
        <div className="space-y-3">
          {availableRiders.slice(0, 3).map((rider) => (
            <Card key={rider.id} className="shadow-sm border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[var(--jetdash-orange)] rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-[var(--jetdash-brown)]">{rider.name}</span>
                        <span className="text-sm text-amber-500">★ {rider.rating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{rider.vehicle}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{rider.eta}</span>
                    </div>
                    <div className="w-2 h-2 bg-[var(--jetdash-green)] rounded-full mt-1"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Send Package Button */}
      <div className="fixed bottom-6 left-6 right-6">
        <Button 
          onClick={onSendPackage}
          className="w-full h-14 bg-[var(--jetdash-brown)] text-white hover:bg-[var(--jetdash-deep-brown)] rounded-2xl text-lg font-semibold shadow-lg"
        >
          Send Package
        </Button>
      </div>
    </div>
  );
}