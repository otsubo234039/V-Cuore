import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Amplify } from 'aws-amplify';

const savedTheme = localStorage.getItem('v-cuore-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// 🛰️ 司令部を起動する前に、AWS Cognito との「同期（V-SYNC）」を完了させる
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'ap-southeast-2_Sm8EPStga',
      userPoolClientId: '3jvtpp8872fqq61b7oroh5mpr9',
      loginWith: {
        email: true, // ✅ これを足して認証基盤を安定させる
        oauth: {
          // https:// は抜きのドメイン名
          domain: 'ap-southeast-2sm8epstga.auth.ap-southeast-2.amazoncognito.com', 
          scopes: ['openid', 'email', 'profile'],
          // ⚠️ AWSコンソールの設定と「1文字（最後の/まで）」寸分違わず合わせるんやぞ
          redirectSignIn: ['http://localhost:5173/'],
          redirectSignOut: ['http://localhost:5173/'],
          responseType: 'code',
        }
      }
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)