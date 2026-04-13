// src/App.tsx
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import HomePage from './pages/home/HomePage';
import { LoginPage } from './pages/login/LoginPage';
import { SettingsPage } from './pages/settings/SettingPage';
import { StudySetupPage, type StudyConfig } from './pages/Study/StudySetupPage';
import { THEME_CONFIG, toSafeHex } from './constants/theme';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isSetupVisible, setIsSetupVisible] = useState(false); // 🚀 セットアップ画面フラグ

  // 🚀 試験タイトル管理（ハンバーガーメニュー等から変更される想定）
  const [selectedExam, setSelectedExam] = useState("AWS Certified SAA");
  const [themeColor, setThemeColor] = useState<string>(THEME_CONFIG.DEFAULT_COLOR);

  useEffect(() => {
    checkUserStatus();

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

  // 🚀 ミッション開始時の最終処理
  const handleStartMission = (config: StudyConfig) => {
    console.log("ミッション開始承認:", config);
    // ここで実際に演習画面へ遷移する（次なる開発フェーズ）
  };

  return (
    /* 🚀 粛清：bg-white bg-v-cuore-vignette をパージ。bg-main-bg でライト/ダークを完全同期 */
    <div className="fixed inset-0 w-full h-full bg-main-bg font-sans overflow-hidden transition-colors duration-1000">
      
      {isSettingsVisible ? (
        <SettingsPage
          initialColor={themeColor}
          onBack={() => setIsSettingsVisible(false)}
          onApplyColor={handleApplyColor}
        />
      ) : isLoginVisible ? (
        <LoginPage onBack={() => setIsLoginVisible(false)} />
      ) : isSetupVisible ? (
        /* 🚀 介入：StudySetupPage へ試験名と撤退用関数を渡す */
        <StudySetupPage
          examTitle={selectedExam}
          onBack={() => setIsSetupVisible(false)}
          onStartDuel={handleStartMission}
        />
      ) : (
        <HomePage
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setIsLoginVisible(true)}
          onSettingsClick={() => setIsSettingsVisible(true)}
          onStartClick={() => setIsSetupVisible(true)}
        />
      )}
    </div>
  );
}

export default App;