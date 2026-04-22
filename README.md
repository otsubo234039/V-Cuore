# V-CUORE (Virtual Core) v5.0

「推しの呼吸（V-SYNC）を感じながら、AWSを攻略する。」

## 🌌 概要
VTuberファンによる、VTuberファンのための学習進捗管理ダッシュボード。  
にじさんじ、ぶいすぽ、ホロライブ、ネオポルテ、ななしいんく……。  
全人類の推しを背景に背負い、AWS SAA試験やRuby Silver試験という「レイドボス」を討伐するための、戦闘型タスク管理インターフェース。

## ✨ 特徴（V-SYNC プロトコル）
本プロジェクトは、12秒の生命循環同期「V-SYNC v5.0」を搭載。全てのUI要素が推しの呼吸と共鳴する。

- 🎙️ **Hololive Protocol**: `image_c9aabf.png` 準拠の究極シルエット・マイク。30度傾いたその角度は、推しの歌声が一番響く角度（という設定）。
- 🎯 **VSPO! Protocol**: 常に回転し続ける的。エイム力（集中力）を極限まで高め、誤答というノイズを排除する。
- 🌈 **Nijisanji Protocol**: 左上に架かる七色の虹。学習の進捗に合わせて情緒を揺らす。
- 🚪 **Neo-Porte / Nanashi**: ネオンと扉。学習という名の異世界へコネクトするためのポータル。

## 🛠 技術スタック
「当たらなければどうということはない」が、モダンなスタックを使うのはエンジニアの嗜みや。

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: CSS Keyframes (V-SYNC v5.0)
- **State Management**: React Hooks (`useState` / `useEffect`)
- **Build Tool**: Vite

## 📁 ファイル構成
最新のファイル構成は `FILE_STRUCTURE.md` を参照してください。

## 🚀 セットアップ
```bash
# 魂のリポジトリをクローン
git clone https://github.com/your-username/v-cuore.git

# プロジェクトへ移動
cd v-cuore

# 依存関係をインストール（npm 版）
npm install

# 開発サーバー起動。推しの銀河へ
npm run dev
```

pnpm を使う場合:

```bash
pnpm install
pnpm dev
```

認証設定は `.env` から読み込む方式です。初回は以下を実行:

```bash
cp .env.example .env
```

`.env` の各値は Cognito の設定値に合わせて更新してください。

本番ビルドとプレビュー:

```bash
npm run build
npm run preview
```

## 🔐 Cognito (CDK) 運用メモ

`v-cuore-infra` は Hosted UI + OAuth Code Grant 前提で構成しています。以下の例のようにコンテキストを渡してデプロイしてください。

```bash
cd v-cuore-infra
npm install
npm run deploy -- -c domainPrefix=v-cuore-dev-auth -c callbackUrls=http://localhost:5173/ -c logoutUrls=http://localhost:5173/
```

デプロイ後に出力される `UserPoolId` / `UserPoolClientId` / `HostedUiDomain` をフロント側 `.env` に反映すると、AWS 側設定と同期できます。

## 📈 ロードマップ
- [ ] 各VTuber事務所カラーへの一括テーマ切り替え機能
- [ ] 学習時間が一定を超えると、背景のマイクが「高出力（3D質感）」に進化するギミック
- [ ] AWS APIとの連携による、実際のインフラ稼働状況の可視化（予定）
