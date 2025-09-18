import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { SignupScreen } from './components/SignupScreen';
import { CustomerHomeScreen } from './components/CustomerHomeScreen';
import { BookingScreen } from './components/BookingScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { RiderHomeScreen } from './components/RiderHomeScreen';
import { IncomingRequestScreen } from './components/IncomingRequestScreen';
import { ActiveDeliveryScreen } from './components/ActiveDeliveryScreen';
import { EarningsScreen } from './components/EarningsScreen';
import { MenuScreen } from './components/MenuScreen';
import { ProfileScreen } from './components/ProfileScreen';

type Screen = 
  | 'welcome'
  | 'login'
  | 'signup'
  | 'customer-home'
  | 'booking'
  | 'confirmation'
  | 'completion'
  | 'rider-home'
  | 'incoming-request'
  | 'active-delivery'
  | 'earnings'
  | 'menu'
  | 'profile';

type UserType = 'customer' | 'rider' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userType, setUserType] = useState<UserType>(null);

  const handleGetStarted = () => {
    setCurrentScreen('login');
  };

  const handleLogin = (selectedUserType: 'customer' | 'rider') => {
    setUserType(selectedUserType);
    setCurrentScreen(selectedUserType === 'customer' ? 'customer-home' : 'rider-home');
  };

  const handleSignup = (selectedUserType: 'customer' | 'rider') => {
    setUserType(selectedUserType);
    setCurrentScreen(selectedUserType === 'customer' ? 'customer-home' : 'rider-home');
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentScreen('welcome');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
        
      case 'login':
        return (
          <LoginScreen
            onBack={() => setCurrentScreen('welcome')}
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentScreen('signup')}
          />
        );
        
      case 'signup':
        return (
          <SignupScreen
            onBack={() => setCurrentScreen('welcome')}
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentScreen('login')}
          />
        );
        
      case 'customer-home':
        return (
          <CustomerHomeScreen
            onSendPackage={() => setCurrentScreen('booking')}
            onMenu={() => setCurrentScreen('menu')}
            onProfile={() => setCurrentScreen('profile')}
          />
        );
        
      case 'menu':
        return (
          <MenuScreen
            onBack={() => setCurrentScreen('customer-home')}
            onProfile={() => setCurrentScreen('profile')}
            onOrderHistory={() => {}}
            onSettings={() => {}}
            onHelp={() => {}}
            onLogout={handleLogout}
          />
        );
        
      case 'profile':
        return (
          <ProfileScreen
            onBack={() => setCurrentScreen(userType === 'customer' ? 'customer-home' : 'rider-home')}
          />
        );
        
      case 'booking':
        return (
          <BookingScreen
            onBack={() => setCurrentScreen('customer-home')}
            onConfirmDelivery={() => setCurrentScreen('confirmation')}
          />
        );
        
      case 'confirmation':
        return (
          <ConfirmationScreen
            onDeliveryComplete={() => setCurrentScreen('completion')}
            onCancel={() => setCurrentScreen('customer-home')}
          />
        );
        
      case 'completion':
        return (
          <CompletionScreen
            onBackToHome={() => setCurrentScreen('customer-home')}
          />
        );
        
      case 'rider-home':
        return (
          <RiderHomeScreen
            onViewRequest={() => setCurrentScreen('incoming-request')}
            onViewEarnings={() => setCurrentScreen('earnings')}
          />
        );
        
      case 'incoming-request':
        return (
          <IncomingRequestScreen
            onBack={() => setCurrentScreen('rider-home')}
            onAccept={() => setCurrentScreen('active-delivery')}
            onDecline={() => setCurrentScreen('rider-home')}
          />
        );
        
      case 'active-delivery':
        return (
          <ActiveDeliveryScreen
            onBack={() => setCurrentScreen('rider-home')}
            onCompleteDelivery={() => setCurrentScreen('rider-home')}
          />
        );
        
      case 'earnings':
        return (
          <EarningsScreen
            onBack={() => setCurrentScreen('rider-home')}
          />
        );
        
      default:
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
}