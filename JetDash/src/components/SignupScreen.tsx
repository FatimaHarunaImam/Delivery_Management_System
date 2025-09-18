import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, User, Truck } from "lucide-react";
import jetdashLogo from "figma:asset/65d0158fe7ae208ff3fd9bd401c0ba4ecb4059c8.png";

interface SignupScreenProps {
  onBack: () => void;
  onSignup: (userType: 'customer' | 'rider') => void;
  onSwitchToLogin: () => void;
}

export function SignupScreen({ onBack, onSignup, onSwitchToLogin }: SignupScreenProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedUserType, setSelectedUserType] = useState<'customer' | 'rider'>('customer');

  const handleSignup = () => {
    // Basic validation
    if (name && phone && password && password === confirmPassword) {
      onSignup(selectedUserType);
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
            Create Account
          </h1>
          <p className="text-muted-foreground">
            Join JetDash today
          </p>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-muted-foreground mb-3 block">
            I want to:
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
                <p className="font-medium text-[var(--jetdash-brown)]">Send Packages</p>
                <p className="text-xs text-muted-foreground">As a customer</p>
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
                <p className="font-medium text-[var(--jetdash-brown)]">Deliver Packages</p>
                <p className="text-xs text-muted-foreground">As a rider</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Signup Form */}
        <Card className="shadow-jetdash border-0">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 h-12 bg-[var(--input-background)] border-0 rounded-xl"
                />
              </div>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 h-12 bg-[var(--input-background)] border-0 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-muted-foreground">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 h-12 bg-[var(--input-background)] border-0 rounded-xl"
                />
              </div>
            </div>

            <Button
              onClick={handleSignup}
              disabled={!name || !phone || !password || password !== confirmPassword}
              className="w-full h-12 bg-[var(--jetdash-brown)] text-white hover:bg-[var(--jetdash-deep-brown)] disabled:opacity-50 rounded-xl"
            >
              Create {selectedUserType === 'customer' ? 'Customer' : 'Rider'} Account
            </Button>

            <div className="text-center text-xs text-muted-foreground">
              By signing up, you agree to our{" "}
              <Button variant="link" className="text-xs text-[var(--jetdash-brown)] p-0">
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button variant="link" className="text-xs text-[var(--jetdash-brown)] p-0">
                Privacy Policy
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              onClick={onSwitchToLogin}
              className="text-[var(--jetdash-brown)] hover:text-[var(--jetdash-deep-brown)] p-0"
            >
              Sign In
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}