// src/components/auth/AuthGate.tsx

import React from 'react';
import { LoginPage } from '../../pages/login/LoginPage';

interface AuthGateProps {
  children: React.ReactNode;
}

export const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  // 🛰️ 生存確認プロトコル：ここを後で AWS Cognito の状態チェックに置き換える
  // 今は暫定的に false（未ログイン）にしておくで。
  const isLoggedIn = false; 

  if (!isLoggedIn) {
    // 認めたくないものだな、権限がないというだけで追い返されるという事実を……。
    // 未ログイン時は LoginPage を顕現（ジャスパ）させる
    return <LoginPage />;
  }

  // ログイン済みなら、中身（HomePage等）をそのまま通す
  return <>{children}</>;
};