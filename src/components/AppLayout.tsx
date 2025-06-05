import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import TeacherView from './TeacherView';
import AdminView from './AdminView';
import LoginForm from './LoginForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AppLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<'teacher' | 'admin' | 'login'>('teacher');
  const { isAdmin, setIsAdmin } = useAppContext();

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setCurrentView('admin');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentView('teacher');
  };

  const renderView = () => {
    switch (currentView) {
      case 'teacher':
        return <TeacherView />;
      case 'admin':
        return <AdminView />;
      case 'login':
        return <LoginForm onLogin={handleAdminLogin} />;
      default:
        return <TeacherView />;
    }
  };

  return (
    <div className="relative">
      {/* Navigation Bar */}
      <div className="fixed top-4 right-4 z-50">
        <Card className="p-2 shadow-lg bg-white/90 backdrop-blur-sm">
          <div className="flex gap-2">
            <Button
              onClick={() => setCurrentView('teacher')}
              variant={currentView === 'teacher' ? 'default' : 'outline'}
              size="sm"
            >
              👨‍🏫 Teacher
            </Button>
            {isAdmin ? (
              <>
                <Button
                  onClick={() => setCurrentView('admin')}
                  variant={currentView === 'admin' ? 'default' : 'outline'}
                  size="sm"
                >
                  🔧 Admin
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  size="sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setCurrentView('login')}
                variant="outline"
                size="sm"
              >
                🔐 Admin
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Main Content */}
      {renderView()}
    </div>
  );
};

export default AppLayout;