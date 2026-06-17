import React from 'react';
import { Trophy, RotateCcw, Home, ChevronRight, Sparkles, TrendingUp, Flame, Target, Heart, BadgeCheck, MessageCircle, Mic2 } from 'lucide-react';

interface StudyResultPageProps {
  score: number;
  totalQuestions: number;
  chatTone?: string;
  onRestart: () => void;
  onGoHome: () => void;
}

type EndingPersona = 'entertainment' | 'gamer' | 'clumsy' | 'idol' | 'polite' | 'casual';

const resolveEndingPersona = (tone: string): EndingPersona => {
  const normalizedTone = tone.toLowerCase();

  if (normalizedTone.includes('エンタメ') || normalizedTone.includes('パッション') || normalizedTone.includes('ツッコミ') || normalizedTone.includes('関西弁')) {
    return 'entertainment';
  }

  if (normalizedTone.includes('ゲーマー') || normalizedTone.includes('fps') || normalizedTone.includes('エイム') || normalizedTone.includes('パニカン')) {
    return 'gamer';
  }

  if (normalizedTone.includes('ポンコツ') || normalizedTone.includes('真面目バカ') || normalizedTone.includes('一緒に考える') || normalizedTone.includes('親身')) {
    return 'clumsy';
  }

  if (normalizedTone.includes('アイドル') || normalizedTone.includes('全肯定') || normalizedTone.includes('癒やし') || normalizedTone.includes('褒めて')) {
    return 'idol';
  }

  if (normalizedTone.includes('丁寧') || normalizedTone.includes('ですます') || normalizedTone.includes('礼儀')) {
    return 'polite';
  }

  return 'casual';
};

const StudyResultPage: React.FC<StudyResultPageProps> = ({ score, totalQuestions, chatTone = '', onRestart, onGoHome }) => {
  const safeTotalQuestions = Math.max(1, totalQuestions);
  const percentage = Math.round((score / safeTotalQuestions) * 100);
  const motivationScore = Math.min(100, Math.max(15, Math.round(percentage * 0.9 + score * 4)));
  const persona = resolveEndingPersona(chatTone);

  const getGrade = (p: number) => {
    if (p >= 90) return { label: 'S', message: '完璧です！素晴らしい！' };
    if (p >= 80) return { label: 'A', message: 'その調子です！' };
    if (p >= 60) return { label: 'B', message: '合格点です。' };
    return { label: 'C', message: '次はもっと頑張りましょう。' };
  };

  const getMotivationState = (p: number) => {
    if (p >= 90) {
      return {
        label: 'MAX DRIVE',
        message: 'このまま仕上げ切れる。今の学習は勝ち筋に乗ってる。',
        accent: 'from-emerald-500/20 to-lime-500/10',
        bar: 'bg-emerald-500',
        icon: <Flame size={18} />,
      };
    }

    if (p >= 80) {
      return {
        label: 'HIGH GEAR',
        message: 'かなり良い流れ。あと少し伸ばしたら一段上にいける。',
        accent: 'from-sky-500/20 to-cyan-500/10',
        bar: 'bg-sky-500',
        icon: <TrendingUp size={18} />,
      };
    }

    if (p >= 60) {
      return {
        label: 'STEADY RUN',
        message: '土台はできてる。弱点を詰めれば一気に化ける。',
        accent: 'from-amber-500/20 to-orange-500/10',
        bar: 'bg-amber-500',
        icon: <Target size={18} />,
      };
    }

    return {
      label: 'COMEBACK MODE',
      message: 'まだ伸びしろが大きい。ここから積み上げるのがいちばん強い。',
      accent: 'from-rose-500/20 to-pink-500/10',
      bar: 'bg-rose-500',
      icon: <Sparkles size={18} />,
    };
  };

  const getEndingMessage = () => {
    const ratioText = `${percentage}%`;

    switch (persona) {
      case 'entertainment':
        return { title: '今日もおつかれさん！', body: `今日の正答率は ${ratioText}。ツッコミどころも含めて、ちゃんと前に進めてるで。明日はもっと気持ちよく正解を拾いにいこ。`, tag: 'パッション配信' };
      case 'gamer':
        return { title: 'GG、ナイスラン', body: `今日のエイム（正答率）は ${ratioText}。立ち回りはかなり見えてる。次は弱点の処理速度を上げて、さらに盤面を取りにいこう。`, tag: 'ランクマ締め' };
      case 'clumsy':
        return { title: '今日もよくやったよ', body: `今日の到達率は ${ratioText}。途中で迷っても、ちゃんと最後まで走り切れたのがえらい。次は一緒に弱点をほどいていこう。`, tag: '一緒に成長' };
      case 'idol':
        return { title: '今日も見に来てくれてありがとう！', body: `耐久配信おつかれさま！今日の正答率は ${ratioText}。毎日ちゃんと積み上げてるの、本当にえらすぎる！`, tag: '癒やしエンディング' };
      case 'polite':
        return { title: '本日もお疲れさまでした', body: `本日の正答率は ${ratioText} です。落ち着いて積み上げられています。次回は弱点を少しずつ埋めて、さらに安定感を高めていきましょう。`, tag: '丁寧フィードバック' };
      case 'casual':
      default:
        return { title: '今日もよく頑張った', body: `今日の正答率は ${ratioText}。ここまでちゃんと積み上げられてる。明日はさらに一段伸ばしにいこう。`, tag: 'エンディングログ' };
    }
  };

  const grade = getGrade(percentage);
  const motivation = getMotivationState(percentage);
  const ending = getEndingMessage();
  const momentumBars = [
    Math.max(18, Math.min(100, percentage)),
    Math.max(18, Math.min(100, percentage + 12)),
    Math.max(18, Math.min(100, percentage - 6 + score * 3)),
  ];

  return (
    <div className="fixed inset-0 z-50 bg-main-bg text-oshi-primary flex flex-col items-center justify-start md:justify-center pt-10 md:pt-16 px-4 pb-4 md:px-6 md:pb-6 font-sans transition-colors duration-500 overflow-y-auto overflow-x-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes stream-end-marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `,
        }}
      />

      <div className="absolute inset-0 opacity-[0.08] pointer-events-none select-none">
        <div className="absolute inset-0 text-[15vw] font-black tracking-[0.28em] uppercase whitespace-nowrap leading-none" style={{ animation: 'stream-end-marquee 18s linear infinite' }}>
          STREAM END STREAM END STREAM END STREAM END STREAM END STREAM END
        </div>
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-main-bg to-transparent" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-main-bg to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto my-8 md:my-12 grid grid-cols-1 gap-5 items-stretch">
        <div className="bg-card-bg/95 backdrop-blur-xl border-2 border-oshi-primary/15 rounded-[1.75rem] p-6 md:p-8 space-y-6 shadow-none">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-4 rounded-full bg-oshi-primary/10 border border-oshi-primary/20">
                <Trophy className="w-11 h-11 text-oshi-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-45">STREAM CLOSED</p>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">学習配信終了</h1>
              </div>
            </div>
            <div className="px-3 py-2 rounded-full border border-oshi-primary/15 bg-oshi-primary/5 text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <Mic2 size={14} /> {ending.tag}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-oshi-primary/10 bg-gradient-to-br from-oshi-primary/10 to-transparent p-5 md:p-6 space-y-3">
            <div className="flex items-center gap-3 text-oshi-primary/75">
              <BadgeCheck size={18} />
              <p className="text-[9px] font-black uppercase tracking-[0.35em]">Today&apos;s Final Message</p>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">{ending.title}</h2>
            <p className="text-sm leading-relaxed opacity-90">{ending.body}</p>
          </div>

          <div className="flex justify-around items-center bg-oshi-primary/5 rounded-2xl p-4 md:p-5 border border-oshi-primary/10">
            <div className="space-y-1">
              <p className="text-xs uppercase font-bold tracking-wider opacity-50">Score</p>
              <p className="text-2xl md:text-3xl font-bold">
                {score} <span className="text-base md:text-lg opacity-35">/ {totalQuestions}</span>
              </p>
            </div>

            <div className="h-8 w-px bg-oshi-primary/20" />

            <div className="space-y-1">
              <p className="text-xs uppercase font-bold tracking-wider opacity-50">Rank</p>
              <p className="text-3xl font-black text-oshi-primary">{grade.label}</p>
            </div>
          </div>

          <div className={`rounded-[1.5rem] border border-oshi-primary/10 bg-gradient-to-br ${motivation.accent} p-4 md:p-5 text-left space-y-3`}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-card-bg flex items-center justify-center border border-oshi-primary/10 text-oshi-primary">
                  {motivation.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] opacity-50">Motivation Meter</p>
                  <h2 className="text-xs md:text-sm font-black tracking-[0.2em] uppercase">{motivation.label}</h2>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Drive</p>
                <p className="text-xl md:text-2xl font-black">{motivationScore}%</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-full h-2.5 rounded-full bg-card-bg overflow-hidden border border-oshi-primary/10">
                <div
                  className={`h-full rounded-full ${motivation.bar} transition-all duration-700 ease-out`}
                  style={{ width: `${motivationScore}%` }}
                />
              </div>
              <p className="text-sm leading-relaxed font-medium opacity-80">{motivation.message}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-card-bg/80 border border-oshi-primary/10 p-2.5">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-45">継続力</p>
                <p className="text-lg font-black mt-1">{Math.min(100, percentage + 18)}%</p>
              </div>
              <div className="rounded-2xl bg-card-bg/80 border border-oshi-primary/10 p-2.5">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-45">安定感</p>
                <p className="text-lg font-black mt-1">{Math.min(100, percentage + 8)}%</p>
              </div>
              <div className="rounded-2xl bg-card-bg/80 border border-oshi-primary/10 p-2.5">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-45">伸びしろ</p>
                <p className="text-lg font-black mt-1">{Math.max(18, 100 - percentage)}%</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Momentum Snapshot</p>
              <div className="flex items-end gap-2 h-14">
                {momentumBars.map((barHeight, index) => (
                  <div key={`${index}-${barHeight}`} className="flex-1 flex flex-col justify-end gap-2">
                    <div className="h-full flex items-end">
                      <div
                        className={`w-full rounded-t-2xl ${motivation.bar} transition-all duration-700`}
                        style={{ height: `${barHeight}%` }}
                      />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40 text-center">
                      {index === 0 ? 'Start' : index === 1 ? 'Now' : 'Next'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-oshi-primary/10 bg-card-bg/60 p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-oshi-primary/10 flex items-center justify-center border border-oshi-primary/15">
                <MessageCircle size={18} className="text-oshi-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] opacity-45">Superchat-style Clip</p>
                <h3 className="text-sm font-black tracking-wider">今日のひとこと</h3>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Supporter A', message: persona === 'idol' ? '今日もえらい！毎回ちゃんと来てるの、ほんまにすごい！' : 'ナイス完走！次はさらに精度を上げていこう。' },
                { name: 'Supporter B', message: persona === 'gamer' ? '今のルートは悪くない。詰めるべきは細かい判断やね。' : 'ここまで積み上げてるのがちゃんと見えてる。' },
              ].map((item) => (
                <div key={item.name} className="rounded-2xl border border-oshi-primary/10 bg-card-bg px-4 py-3 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-oshi-primary/10 flex items-center justify-center shrink-0">
                    <Heart size={15} className="text-oshi-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">{item.name}</p>
                    <p className="text-sm leading-relaxed">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card-bg/90 backdrop-blur-xl border-2 border-oshi-primary/15 rounded-[1.75rem] p-5 md:p-6 space-y-4">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] opacity-45">Result Summary</p>
            <p className="text-sm leading-relaxed opacity-80">{grade.message}</p>
          </div>

          <div className="space-y-3 pt-1">
            <button
              onClick={onRestart}
              className="w-full bg-oshi-primary hover:opacity-90 text-card-bg font-bold py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 border-none"
            >
              <RotateCcw size={20} />
              もう一度挑戦する
            </button>

            <button
              onClick={onGoHome}
              className="w-full bg-card-bg border-2 border-oshi-primary/25 hover:border-oshi-primary text-oshi-primary font-bold py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Home size={20} />
              ホームに戻る
            </button>
          </div>

          <button className="text-sm font-bold flex items-center justify-center gap-1 mx-auto text-oshi-primary/45 hover:text-oshi-primary transition-colors">
            詳細な解答履歴を見る
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyResultPage;
