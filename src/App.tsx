import React, { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import HomePage from './pages/home/HomePage';
import { LoginPage } from './pages/login/LoginPage';
import { SettingsPage } from './pages/settings/SettingPage';
// 🚀 定数をインポート
import { THEME_CONFIG, toSafeHex } from './constants/theme';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  // 🚀 粛清：ハードコードをパージし、定数から初期値をロード
  const [themeColor, setThemeColor] = useState<string>(THEME_CONFIG.DEFAULT_COLOR);

  useEffect(() => {
    checkUserStatus();

    // ⚡️ V-SYNC プロトコル：CSS変数への一括転送
    const validColor = toSafeHex(themeColor);
    const root = document.documentElement;

    root.style.setProperty('--oshi-primary', validColor);
    root.style.setProperty('--oshi-primary-20', `${validColor}${THEME_CONFIG.ALPHA_20}`);

    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          checkUserStatus();
          break;
        case 'signedOut':
          setIsLoggedIn(false);
          break;
      }
    });

    return () => unsubscribe();
  }, [themeColor]);

  const checkUserStatus = async () => {
    try {
      await getCurrentUser();
      setIsLoggedIn(true);
      setIsLoginVisible(false);
    } catch {
      setIsLoggedIn(false);
    }
  };

  const handleApplyColor = (newColor: string) => {
    setThemeColor(newColor);
    setIsSettingsVisible(false);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-white bg-v-cuore-vignette font-sans overflow-hidden transition-all duration-1000">
      {isSettingsVisible ? (
        <SettingsPage
          initialColor={themeColor}
          onBack={() => setIsSettingsVisible(false)}
          onApplyColor={handleApplyColor}
        />
      ) : isLoginVisible ? (
        <LoginPage onBack={() => setIsLoginVisible(false)} />
      ) : (
        <HomePage
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setIsLoginVisible(true)}
          onSettingsClick={() => setIsSettingsVisible(true)}
        />
      )}
    </div>
  );
}

export default App;