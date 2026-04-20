// src/components/auth/AuthGate.tsx

import React from 'react';
import { LoginPage } from '../../pages/login/LoginPage';

interface AuthGateProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
}

export const AuthGate: React.FC<AuthGateProps> = ({ children, isLoggedIn = true }) => {
  // TODO: 認証統合後に実際の認証状態で判定する。

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return <>{children}</>;
};