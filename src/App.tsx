import React from 'react';
import { Header } from './components/layout';
import HomePage from './pages/home/HomePage';

function App() {
  return (
    <>
      {/* 1. 全体で使う CSS アニメーション定義（ここに残すのが管理しやすい） */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @property --rainbow-start { syntax: '<angle>'; initial-value: 90deg; inherits: false; }
          /* ... 既存の全てのアニメーション定義 ... */
        `
      }} />

      <div className="fixed inset-0 w-full h-full bg-linear-to-br from-white via-[#fff5f7] to-[#ffe4e9] overflow-hidden">
        <Header />
        {/* Home画面を呼び出す */}
        <HomePage />
      </div>
    </>
  );
}

export default App;