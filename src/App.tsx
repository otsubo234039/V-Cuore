// src/App.tsx
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import HomePage from './pages/home/HomePage';
import { LoginPage } from './pages/login/LoginPage';
import { SettingsPage } from './pages/settings/SettingPage';
import { StudySetupPage, type StudyConfig } from './pages/StudySetup/StudySetupPage';
import { StudyPage } from './pages/Study/StudyPage';
import ResultPage from './pages/Result/ResultPage';
import { THEME_CONFIG, toReadableHex } from './constants/theme';

type SettingsOrigin = 'home' | 'setup' | 'study' | 'login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => document.documentElement.classList.contains('dark'));
  const [isSetupVisible, setIsSetupVisible] = useState(false); // 🚀 セットアップ画面フラグ
  const [isStudyVisible, setIsStudyVisible] = useState(false); // 🚀 学習画面フラグ
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [lastScore, setLastScore] = useState(0);
  const [lastTotalQuestions, setLastTotalQuestions] = useState(0);
  const [settingsOrigin, setSettingsOrigin] = useState<SettingsOrigin>('home');

  // 🚀 試験タイトル管理（ハンバーガーメニュー等から変更される想定）
  const [selectedExam, setSelectedExam] = useState("AWS Certified SAA");
  const [themeColor, setThemeColor] = useState<string>(THEME_CONFIG.DEFAULT_COLOR);

  useEffect(() => {
    checkUserStatus();

    const applyThemeColor = () => {
      const root = document.documentElement;
      const isDarkMode = root.classList.contains('dark');
      const readableColor = toReadableHex(themeColor, isDarkMode);

      root.style.setProperty('--oshi-primary', readableColor);
      root.style.setProperty('--oshi-primary-20', `${readableColor}${THEME_CONFIG.ALPHA_20}`);
    };

    applyThemeColor();

    const observer = new MutationObserver((mutations) => {
      const classChanged = mutations.some((mutation) => mutation.attributeName === 'class');
      if (classChanged) {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
        applyThemeColor();
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

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

    return () => {
      observer.disconnect();
      unsubscribe();
    };
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

  const openSettingsFrom = (origin: SettingsOrigin) => {
    setSettingsOrigin(origin);
    setIsSettingsVisible(true);
    setIsLoginVisible(false);
    setIsSetupVisible(false);
    setIsStudyVisible(false);
    setIsResultVisible(false);
  };

  const closeSettingsToOrigin = () => {
    setIsSettingsVisible(false);

    switch (settingsOrigin) {
      case 'setup':
        setIsSetupVisible(true);
        break;
      case 'study':
        setIsStudyVisible(true);
        break;
      case 'login':
        setIsLoginVisible(true);
        break;
      default:
        break;
    }
  };

  const handleApplyColor = (newColor: string) => {
    setThemeColor(newColor);
    closeSettingsToOrigin();
  };

  const handleToggleTheme = () => {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains('dark');

    root.classList.toggle('dark', nextIsDark);
    localStorage.setItem('v-cuore-theme', nextIsDark ? 'dark' : 'light');
    setIsDarkMode(nextIsDark);
  };

  // 🚀 ミッション開始時の最終処理
  const handleStartMission = (config: StudyConfig) => {
    console.log("ミッション開始承認:", config);
    setIsSetupVisible(false);
    setIsStudyVisible(true);
  };

  const handleFinishStudy = (score: number, totalQuestions: number) => {
    setLastScore(score);
    setLastTotalQuestions(totalQuestions);
    setIsResultVisible(true);
    setIsStudyVisible(false);
    setIsSetupVisible(false);
  };

  return (
    /* 🚀 粛清：bg-white bg-v-cuore-vignette をパージ。bg-main-bg でライト/ダークを完全同期 */
    <div className="fixed inset-0 w-full h-full bg-main-bg font-sans overflow-hidden transition-colors duration-1000">
      
      {isSettingsVisible ? (
        <SettingsPage
          initialColor={themeColor}
          isDark={isDarkMode}
          onToggleTheme={handleToggleTheme}
          onBack={closeSettingsToOrigin}
          onApplyColor={handleApplyColor}
        />
      ) : isLoginVisible ? (
        <LoginPage onBack={() => setIsLoginVisible(false)} />
      ) : isSetupVisible ? (
        /* 🚀 介入：StudySetupPage へ試験名と撤退用関数を渡す */
        <StudySetupPage
          examTitle={selectedExam}
          onBack={() => setIsSetupVisible(false)}
          onStartMission={handleStartMission}
          onSettingsClick={() => openSettingsFrom('setup')}
        />
      ) : isStudyVisible ? (
        <StudyPage
          onBack={() => {
            setIsStudyVisible(false);
            setIsSetupVisible(true);
          }}
          onFinish={handleFinishStudy}
        />
      ) : isResultVisible ? (
        <ResultPage
          score={lastScore}
          totalQuestions={lastTotalQuestions}
          onRestart={() => {
            setIsResultVisible(false);
            setIsStudyVisible(false);
            setIsSetupVisible(true);
          }}
          onGoHome={() => {
            setIsResultVisible(false);
            setIsSetupVisible(false);
            setIsStudyVisible(false);
          }}
        />
      ) : (
        <HomePage
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setIsLoginVisible(true)}
          onSettingsClick={() => openSettingsFrom('home')}
          onStartClick={() => setIsSetupVisible(true)}
        />
      )}
    </div>
  );
}

export default App;