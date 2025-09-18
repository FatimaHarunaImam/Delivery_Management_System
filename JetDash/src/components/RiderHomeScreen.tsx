import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Menu, 
  User, 
  DollarSign, 
  MapPin, 
  Clock, 
  Package,
  Star,
  Bell
} from "lucide-react";
import jetdashLogo from "figma:asset/65d0158fe7ae208ff3fd9bd401c0ba4ecb4059c8.png";

interface DeliveryRequest {
  id: string;
  customerName: string;
  pickup: string;
  dropoff: string;
  packageSize: string;
  estimatedFee: string;
  distance: string;
  timePosted: string;
}

interface RiderHomeScreenProps {
  onViewRequest: () => void;
  onViewEarnings: () => void;
}

export function RiderHomeScreen({ onViewRequest, onViewEarnings }: RiderHomeScreenProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [todaysEarnings, setTodaysEarnings] = useState("₦4,250");
  const [completedDeliveries, setCompletedDeliveries] = useState(12);
  
  const [deliveryRequests, setDeliveryRequests] = useState<DeliveryRequest[]>([
    {
      id: "1",
      customerName: "Hauwa Musa",
      pickup: "Pantami District",
      dropoff: "Gombe Central",
      packageSize: "Medium",
      estimatedFee: "₦700",
      distance: "3.2 km",
      timePosted: "2 min ago"
    },
    {
      id: "2", 
      customerName: "Aisha Aliyu",
      pickup: "Tudun Wada",
      dropoff: "Nasarawo",
      packageSize: "Small",
      estimatedFee: "₦400",
      distance: "2.1 km",
      timePosted: "5 min ago"
    },
    {
      id: "3",
      customerName: "Khadija Ibrahim", 
      pickup: "Bolari",
      dropoff: "Jekadafari",
      packageSize: "Large",
      estimatedFee: "₦1,000",
      distance: "4.8 km",
      timePosted: "8 min ago"
    }
  ]);

  // Simulate new requests coming in
  useEffect(() => {
    const interval = setInterval(() => {
      const newCustomers = [
        "Zainab Usman", "Amina Garba", "Fatima Bello", "Maryam Ahmad",
        "Halima Yusuf", "Safiya Abdullahi", "Hadiza Salisu", "Rahinatu Sani"
      ];
      
      const locations = [
        "Pantami District", "Gombe Central", "Tudun Wada", "Nasarawo", 
        "Bolari", "Jekadafari", "Madaki", "Bambam"
      ];

      if (Math.random() > 0.7) {
        const newRequest: DeliveryRequest = {
          id: Date.now().toString(),
          customerName: newCustomers[Math.floor(Math.random() * newCustomers.length)],
          pickup: locations[Math.floor(Math.random() * locations.length)],
          dropoff: locations[Math.floor(Math.random() * locations.length)],
          packageSize: ["Small", "Medium", "Large"][Math.floor(Math.random() * 3)],
          estimatedFee: ["₦400", "₦700", "₦1,000"][Math.floor(Math.random() * 3)],
          distance: `${(Math.random() * 5 + 1).toFixed(1)} km`,
          timePosted: "Just now"
        };
        
        setDeliveryRequests(prev => [newRequest, ...prev.slice(0, 4)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[var(--jetdash-brown)] text-white px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" className="text-white">
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <img 
              src={jetdashLogo} 
              alt="JetDash" 
              className="h-8 w-auto"
            />
            <span className="text-lg font-semibold">Rider</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Online Status Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Muhammad Bello</h2>
            <p className="text-orange-100">Motorcycle • Gombe</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-orange-100">
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <Button
              onClick={() => setIsOnline(!isOnline)}
              className={`w-16 h-8 rounded-full ${
                isOnline 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-gray-400 hover:bg-gray-500'
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                isOnline ? 'translate-x-2' : '-translate-x-2'
              }`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Today's Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[var(--jetdash-orange)] rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today's Earnings</p>
                  <p className="text-xl font-semibold text-[var(--jetdash-brown)]">{todaysEarnings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[var(--jetdash-green)] rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deliveries</p>
                  <p className="text-xl font-semibold text-[var(--jetdash-brown)]">{completedDeliveries}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-3">
          <Button 
            onClick={onViewEarnings}
            variant="outline"
            className="flex-1 h-12 border-[var(--jetdash-brown)] text-[var(--jetdash-brown)] rounded-xl"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            View Earnings
          </Button>
          
          <Button 
            className="flex-1 h-12 bg-[var(--jetdash-orange)] text-white hover:bg-[var(--jetdash-light-orange)] rounded-xl"
          >
            <Star className="w-4 h-4 mr-2" />
            4.9 Rating
          </Button>
        </div>

        {/* Available Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--jetdash-brown)]">
              Available Delivery Requests ({deliveryRequests.length})
            </h3>
            {!isOnline && (
              <Badge variant="secondary" className="text-xs">
                Go online to see requests
              </Badge>
            )}
          </div>
          
          {isOnline ? (
            <div className="space-y-3">
              {deliveryRequests.map((request) => (
                <Card 
                  key={request.id} 
                  className="shadow-sm border-0 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={onViewRequest}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-[var(--jetdash-brown)]">
                          {request.customerName}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {request.timePosted}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-muted-foreground">From: {request.pickup}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-muted-foreground">To: {request.dropoff}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-muted-foreground">
                            {request.packageSize} • {request.distance}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-[var(--jetdash-brown)]">
                            {request.estimatedFee}
                          </p>
                          <p className="text-xs text-muted-foreground">Est. earnings</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="shadow-sm border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-600 mb-2">You're currently offline</h4>
                <p className="text-sm text-muted-foreground">
                  Switch to online to start receiving delivery requests
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}