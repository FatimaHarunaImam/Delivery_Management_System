import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, MapPin, Phone, MessageCircle, Navigation, CheckCircle, Clock } from "lucide-react";

interface ActiveDeliveryScreenProps {
  onBack: () => void;
  onCompleteDelivery: () => void;
}

export function ActiveDeliveryScreen({ onBack, onCompleteDelivery }: ActiveDeliveryScreenProps) {
  const [deliveryStatus, setDeliveryStatus] = useState<'going_to_pickup' | 'delivering' | 'arrived'>('going_to_pickup');
  const [eta, setEta] = useState(3);

  const deliveryDetails = {
    id: "DR001",
    customer: {
      name: "Hauwa Musa",
      phone: "+234 803 456 7890"
    },
    pickup: {
      address: "No. 15 Pantami District, Gombe",
      landmark: "Near Central Mosque"
    },
    dropoff: {
      address: "Gombe Central Market, Shop 45",
      landmark: "Main entrance",
      recipient: "Aisha Garba",
      recipientPhone: "+234 805 234 5678"
    },
    package: {
      size: "Medium",
      description: "Documents and small electronics"
    },
    payment: {
      fee: "₦700",
      distance: "3.2 km"
    }
  };

  // Simulate delivery progress
  useEffect(() => {
    const timer = setTimeout(() => {
      if (deliveryStatus === 'going_to_pickup' && eta > 0) {
        setEta(prev => prev - 1);
      } else if (deliveryStatus === 'going_to_pickup' && eta === 0) {
        setDeliveryStatus('delivering');
        setEta(8);
      } else if (deliveryStatus === 'delivering' && eta > 0) {
        setEta(prev => prev - 1);
      } else if (deliveryStatus === 'delivering' && eta === 0) {
        setDeliveryStatus('arrived');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [deliveryStatus, eta]);

  const handleStatusUpdate = () => {
    switch (deliveryStatus) {
      case 'going_to_pickup':
        setDeliveryStatus('delivering');
        setEta(8);
        break;
      case 'delivering':
        setDeliveryStatus('arrived');
        break;
      case 'arrived':
        onCompleteDelivery();
        break;
    }
  };

  const getStatusText = () => {
    switch (deliveryStatus) {
      case 'going_to_pickup':
        return 'Going to pickup location';
      case 'delivering':
        return 'Delivering package';
      case 'arrived':
        return 'Arrived at destination';
      default:
        return 'Active delivery';
    }
  };

  const getButtonText = () => {
    switch (deliveryStatus) {
      case 'going_to_pickup':
        return 'Pickup Complete - Start Delivery';
      case 'delivering':
        return 'Arrived at Destination';
      case 'arrived':
        return 'Complete Delivery';
      default:
        return 'Update Status';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[var(--jetdash-brown)] text-white px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="text-xl font-semibold">Active Delivery</h1>
          
          <Badge variant="secondary" className="bg-[var(--jetdash-orange)] text-white">
            #{deliveryDetails.id}
          </Badge>
        </div>

        {/* Status */}
        <div className="text-center">
          <p className="text-lg font-medium mb-1">{getStatusText()}</p>
          {eta > 0 && (
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="text-orange-100">ETA: {eta} minutes</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Progress Steps */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <h3 className="font-semibold text-[var(--jetdash-brown)] mb-4">Delivery Progress</h3>
            
            <div className="space-y-4">
              {[
                { key: 'going_to_pickup', label: 'Going to pickup', icon: MapPin },
                { key: 'delivering', label: 'Delivering package', icon: MapPin },
                { key: 'arrived', label: 'Arrived at destination', icon: CheckCircle }
              ].map((step, index) => {
                const isActive = step.key === deliveryStatus;
                const isCompleted = ['going_to_pickup', 'delivering', 'arrived'].indexOf(step.key) < 
                                   ['going_to_pickup', 'delivering', 'arrived'].indexOf(deliveryStatus);
                
                return (
                  <div key={step.key} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-[var(--jetdash-green)]' :
                      isActive ? 'bg-[var(--jetdash-orange)]' : 'bg-gray-200'
                    }`}>
                      <step.icon className={`w-4 h-4 ${
                        isCompleted || isActive ? 'text-white' : 'text-gray-400'
                      }`} />
                    </div>
                    <span className={`${
                      isCompleted || isActive ? 'font-medium text-[var(--jetdash-brown)]' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Customer Contact */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[var(--jetdash-brown)]">Customer</h3>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-[var(--jetdash-brown)] text-[var(--jetdash-brown)]">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="border-[var(--jetdash-brown)] text-[var(--jetdash-brown)]">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Message
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[var(--jetdash-orange)] rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-white">
                  {deliveryDetails.customer.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-[var(--jetdash-brown)]">{deliveryDetails.customer.name}</p>
                <p className="text-sm text-muted-foreground">{deliveryDetails.customer.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Route */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[var(--jetdash-brown)]">Route</h3>
              <Button variant="ghost" size="sm" className="text-[var(--jetdash-brown)]">
                <Navigation className="w-4 h-4 mr-1" />
                Navigate
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <MapPin className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-[var(--jetdash-brown)]">Pickup</p>
                  <p className="text-sm text-muted-foreground">{deliveryDetails.pickup.address}</p>
                  <p className="text-xs text-muted-foreground">{deliveryDetails.pickup.landmark}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                  <MapPin className="w-3 h-3 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-[var(--jetdash-brown)]">Drop-off</p>
                  <p className="text-sm text-muted-foreground">{deliveryDetails.dropoff.address}</p>
                  <p className="text-xs text-muted-foreground">{deliveryDetails.dropoff.landmark}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Recipient: {deliveryDetails.dropoff.recipient} ({deliveryDetails.dropoff.recipientPhone})
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package & Payment */}
        <Card className="shadow-jetdash border-0 bg-[var(--jetdash-light-orange)]/30">
          <CardContent className="p-6">
            <h3 className="font-semibold text-[var(--jetdash-brown)] mb-4">Package & Payment</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Package size</span>
                <span className="font-medium">{deliveryDetails.package.size}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Description</span>
                <span className="font-medium">{deliveryDetails.package.description}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distance</span>
                <span className="font-medium">{deliveryDetails.payment.distance}</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[var(--jetdash-brown)]">You'll earn</span>
                  <span className="text-2xl font-bold text-[var(--jetdash-brown)]">{deliveryDetails.payment.fee}</span>
                </div>
                <p className="text-xs text-muted-foreground text-right">Cash on delivery</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      <div className="fixed bottom-6 left-6 right-6">
        <Button 
          onClick={handleStatusUpdate}
          disabled={deliveryStatus === 'going_to_pickup' && eta > 0}
          className="w-full h-14 bg-[var(--jetdash-brown)] text-white hover:bg-[var(--jetdash-deep-brown)] disabled:opacity-50 rounded-2xl text-lg font-semibold shadow-lg"
        >
          {deliveryStatus === 'going_to_pickup' && eta > 0 ? `Arriving in ${eta} min...` : getButtonText()}
        </Button>
      </div>
    </div>
  );
}