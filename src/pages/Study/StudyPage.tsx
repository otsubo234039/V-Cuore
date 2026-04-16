// src/pages/study/StudyPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, CheckCircle2, XCircle, Info, ArrowRight, Bot, Send, MessageSquare } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ChatMessage {
  id: number;
  role: 'assistant' | 'user';
  text: string;
}

// 🚀 実弾データ：本来はここを DB や AI から引っ張ってくる
const mockQuestions: Question[] = [
  {
    id: "SAA-001",
    text: "AWS Lambda を使用してデータを処理するアプリケーションがあります。処理時間が 15 分を超える可能性がある場合、どのサービスに移行するのが最も適切ですか？",
    options: ["Amazon EC2", "AWS Step Functions", "AWS Fargate", "Amazon RDS"],
    correctAnswer: 2,
    explanation: "Lambda の最大実行時間は 15 分です。長時間実行が必要なコンテナ化されたタスクには、サーバーレスでスケーラブルな AWS Fargate が最適解や。"
  },
  {
    id: "SAA-002",
    text: "数百万のユーザーが利用する動的ウェブサイトのパフォーマンスを向上させたい。地理的に分散したユーザーに対し、低レイテンシーでコンテンツを配信するにはどのサービスを使うべき？",
    options: ["Amazon S3", "Amazon CloudFront", "AWS Global Accelerator", "Amazon Route 53"],
    correctAnswer: 1,
    explanation: "エッジロケーションを利用してコンテンツをキャッシュし、低レイテンシーで配信するのは CloudFront の十八番や。これでユーザーも『助かる』わけやな。"
  }
];

const buildInitialChat = (question: Question): ChatMessage[] => ([
  {
    id: Date.now(),
    role: 'assistant',
    text: `AIチューター接続完了。\n${question.id} の攻略をサポートするで。ヒントが欲しければ「ヒント」と送ってな。`,
  },
]);

const buildAssistantReply = (text: string, question: Question, isAnswered: boolean): string => {
  const input = text.toLowerCase();

  if (input.includes('ヒント') || input.includes('hint')) {
    return `ポイントは要件の核を見抜くこと。\nこの問題なら「${question.text.slice(0, 24)}...」のキーワードを軸に考えてみて。`;
  }

  if (input.includes('正解') || input.includes('answer')) {
    if (!isAnswered) {
      return '先に自力で一回選んでみよう。回答後なら正解理由まで詳しく解説できるで。';
    }
    return `正解は ${String.fromCharCode(65 + question.correctAnswer)} やで。\n理由: ${question.explanation}`;
  }

  if (input.includes('解説') || input.includes('explain')) {
    return isAnswered
      ? question.explanation
      : 'まだ未回答やから、まずは選択してから解説を見るのがおすすめ。';
  }

  return '了解。問題文の要件整理、選択肢の比較、消去法のどれから進める？「ヒント」と送れば次の一手を出すで。';
};

export const StudyPage = ({ onBack, onFinish }: { onBack: () => void, onFinish: (score: number, totalQuestions: number) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(buildInitialChat(mockQuestions[0]));
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const currentQ = mockQuestions[currentIndex];
  const progress = ((currentIndex + 1) / mockQuestions.length) * 100;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelected(index);
    setIsAnswered(true);
    if (index === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < mockQuestions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelected(null);
      setIsAnswered(false);
      setChatMessages(buildInitialChat(mockQuestions[nextIndex]));
      setChatInput('');
    } else {
      onFinish(score, mockQuestions.length); // 🚀 全問終了時にリザルトへ射出
    }
  };

  const handleSendChat = () => {
    const text = chatInput.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      text,
    };

    const assistantMessage: ChatMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      text: buildAssistantReply(text, currentQ, isAnswered),
    };

    setChatMessages((prev) => [...prev, userMessage, assistantMessage]);
    setChatInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-main-bg text-oshi-primary font-sans flex flex-col items-center transition-colors duration-500 overflow-hidden">
      
      {/* 🚀 ヘッダー：配信進捗表示 */}
      <header className="w-full px-[5%] py-6 flex justify-between items-center border-b border-oshi-primary/10 backdrop-blur-md">
        <button onClick={onBack} className="p-2 hover:bg-oshi-primary/10 rounded-full transition-all cursor-pointer text-oshi-primary border-none bg-transparent">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">AWS Endurance Stream</p>
          <h1 className="text-sm font-black tracking-widest uppercase">
            {currentIndex + 1} <span className="opacity-20">/</span> {mockQuestions.length}
          </h1>
        </div>
        <button
          onClick={() => setIsChatVisible((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded-full border border-oshi-primary/20 bg-card-bg text-oshi-primary hover:bg-oshi-primary/10 transition-all cursor-pointer"
        >
          <MessageSquare size={16} />
          <span className="text-[10px] font-black uppercase tracking-wider">
            {isChatVisible ? 'Chat On' : 'Chat Off'}
          </span>
        </button>
      </header>

      <main className="relative z-10 w-full flex-1 p-4 md:p-6 overflow-hidden select-none">
        <div className={`w-full h-full max-w-1400px mx-auto grid grid-cols-1 ${isChatVisible ? 'xl:grid-cols-2' : 'xl:grid-cols-1'} gap-4 md:gap-6`}>

          <section className="min-h-0 bg-card-bg/20 border border-oshi-primary/15 rounded-3xl p-5 md:p-6 overflow-y-auto no-scrollbar">
            <div className="space-y-6">

              {/* 🛰️ 問題文：わからせエリア */}
              <div className="bg-card-bg/30 border-l-4 border-oshi-primary p-6 rounded-r-2xl">
                <p className="text-sm md:text-base font-bold leading-relaxed whitespace-pre-wrap">
                  {currentQ.text}
                </p>
              </div>

              {/* 🛰️ 選択肢：BARE-FLAT プロトコル */}
              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`w-full flex items-start gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                      isAnswered
                        ? i === currentQ.correctAnswer
                          ? 'bg-oshi-primary/20 border-oshi-primary text-oshi-primary'
                          : i === selected
                            ? 'border-red-500 text-red-500 bg-red-500/10'
                            : 'opacity-30 border-oshi-primary/5'
                        : 'bg-card-bg/20 border-oshi-primary/10 hover:border-oshi-primary/40'
                    }`}
                  >
                    <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center font-black text-[10px] ${
                      isAnswered && i === currentQ.correctAnswer ? 'bg-oshi-primary text-card-bg border-oshi-primary' : 'border-current'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-sm font-bold">{option}</span>
                  </button>
                ))}
              </div>

              {/* 🚀 解説エリア：回答後に「助かる」情報を射出 */}
              {isAnswered && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-5">
                  <div className={`flex items-center gap-3 p-2 font-black ${
                    selected === currentQ.correctAnswer ? 'text-oshi-primary' : 'text-red-500'
                  }`}>
                    {selected === currentQ.correctAnswer ? (
                      <><CheckCircle2 size={20} /> <span className="text-sm uppercase tracking-widest">ナイス助かる！正解や！</span></>
                    ) : (
                      <><XCircle size={20} /> <span className="text-sm uppercase tracking-widest">わからせ失敗...（不正解）</span></>
                    )}
                  </div>

                  <div className="bg-oshi-primary/5 border-2 border-oshi-primary/10 p-6 rounded-3xl">
                    <div className="flex items-center gap-2 mb-3 text-oshi-primary opacity-60">
                      <Info size={16} />
                      <span className="text-[9px] font-black uppercase tracking-[0.3em]">Wakarase Logs</span>
                    </div>
                    <p className="text-xs md:text-sm leading-relaxed opacity-90 font-bold">
                      {currentQ.explanation}
                    </p>
                  </div>

                  <div className="flex justify-center pt-2">
                    <button
                      onClick={handleNext}
                      className="bg-oshi-primary text-card-bg font-black py-4 px-16 rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 transition-all cursor-pointer border-none shadow-none"
                    >
                      {currentIndex < mockQuestions.length - 1 ? '次の枠へ移動' : '配信終了（リザルト）'}
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {isChatVisible && (
          <aside className="min-h-0 bg-card-bg/20 border border-oshi-primary/15 rounded-3xl p-5 md:p-6 flex flex-col">
            <div className="flex items-center gap-3 border-b border-oshi-primary/10 pb-4">
              <div className="w-10 h-10 rounded-full bg-oshi-primary/10 flex items-center justify-center">
                <Bot size={18} className="text-oshi-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">AI Support</p>
                <h2 className="text-sm font-black uppercase tracking-widest">Wakarase Chat</h2>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar py-4 space-y-3">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-oshi-primary text-card-bg font-bold'
                      : 'bg-card-bg border border-oshi-primary/15 text-oshi-primary'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="pt-4 border-t border-oshi-primary/10 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendChat();
                  }
                }}
                placeholder="AIに質問する（例: ヒント、解説）"
                className="flex-1 bg-card-bg border border-oshi-primary/20 rounded-xl px-4 py-3 text-sm text-oshi-primary outline-none focus:border-oshi-primary"
              />
              <button
                onClick={handleSendChat}
                className="bg-oshi-primary text-card-bg px-4 rounded-xl border-none cursor-pointer hover:opacity-90 transition-all"
                aria-label="AIへ送信"
              >
                <Send size={18} />
              </button>
            </div>
          </aside>
          )}
        </div>
      </main>

      {/* 🚀 フッター：耐久進捗バー */}
      <footer className="w-full bg-main-bg border-t border-oshi-primary/10 p-6">
        <div className="w-full max-w-800px mx-auto space-y-2">
          <div className="flex justify-between text-[8px] font-black uppercase tracking-widest opacity-40">
            <span>Endurance Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-oshi-primary/10 rounded-full overflow-hidden">
            <div 
              className="bg-oshi-primary h-full transition-all duration-1000 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </footer>
    </div>
  );
};