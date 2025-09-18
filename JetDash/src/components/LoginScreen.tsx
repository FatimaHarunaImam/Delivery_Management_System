import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, User, Truck } from "lucide-react";
import jetdashLogo from "figma:asset/65d0158fe7ae208ff3fd9bd401c0ba4ecb4059c8.png";

interface LoginScreenProps {
  onBack: () => void;
  onLogin: (userType: 'customer' | 'rider') => void;
  onSwitchToSignup: () => void;
}

export function LoginScreen({ onBack, onLogin, onSwitchToSignup }: LoginScreenProps) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUserType, setSelectedUserType] = useState<'customer' | 'rider'>('customer');

  const handleLogin = () => {
    // Basic validation
    if (phone && password) {
      onLogin(selectedUserType);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-6 py-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-10 h-10"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      <div className="px-6 py-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src={jetdashLogo} 
            alt="JetDash Logo" 
            className="w-32 h-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-semibold text-[var(--jetdash-brown)] mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to continue
          </p>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-muted-foreground mb-3 block">
            I am a:
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Card 
              className={`cursor-pointer transition-all ${
                selectedUserType === 'customer' 
                  ? 'border-[var(--jetdash-orange)] bg-[var(--jetdash-light-orange)]/20' 
                  : 'border-border'
              }`}
              onClick={() => setSelectedUserType('customer')}
            >
              <CardContent className="p-4 text-center">
                <User className="w-8 h-8 mx-auto mb-2 text-[var(--jetdash-brown)]" />
                <p className="font-medium text-[var(--jetdash-brown)]">Customer</p>
                <p className="text-xs text-muted-foreground">Send packages</p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all ${
                selectedUserType === 'rider' 
                  ? 'border-[var(--jetdash-orange)] bg-[var(--jetdash-light-orange)]/20' 
                  : 'border-border'
              }`}
              onClick={() => setSelectedUserType('rider')}
            >
              <CardContent className="p-4 text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-[var(--jetdash-brown)]" />
                <p className="font-medium text-[var(--jetdash-brown)]">Rider</p>
                <p className="text-xs text-muted-foreground">Deliver packages</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-jetdash border-0">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-muted-foreground">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 803 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 h-12 bg-[var(--input-background)] border-0 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-muted-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 h-12 bg-[var(--input-background)] border-0 rounded-xl"
                />
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={!phone || !password}
              className="w-full h-12 bg-[var(--jetdash-brown)] text-white hover:bg-[var(--jetdash-deep-brown)] disabled:opacity-50 rounded-xl"
            >
              Sign In as {selectedUserType === 'customer' ? 'Customer' : 'Rider'}
            </Button>

            <div className="text-center">
              <Button
                variant="link"
                className="text-[var(--jetdash-brown)] hover:text-[var(--jetdash-deep-brown)]"
              >
                Forgot Password?
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Button
              variant="link"
              onClick={onSwitchToSignup}
              className="text-[var(--jetdash-brown)] hover:text-[var(--jetdash-deep-brown)] p-0"
            >
              Sign Up
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}