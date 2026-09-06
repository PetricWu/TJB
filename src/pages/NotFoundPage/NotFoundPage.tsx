import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useSEO({
    title: '页面未找到',
    description: '成都市田家炳中学 — 您访问的页面不存在或已被移动。',
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="animate-fade-in-up text-center max-w-md">
        {/* 404 大字：方形边框 + 校徽 */}
        <div
          className="animate-fade-in-scale relative mb-8 mx-auto border-2 border-ink rounded-sm neo-shadow-accent size-40 md:size-44 flex items-center justify-center bg-card overflow-hidden"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="absolute top-3 right-3 size-4 border-t-2.5 border-r-2.5 border-accent" aria-hidden />
          <span className="absolute bottom-3 left-3 size-4 border-b-2.5 border-l-2.5 border-accent" aria-hidden />
          <h1 className="font-english text-6xl md:text-7xl font-black text-ink tracking-tighter tabular-nums leading-none">
            404
          </h1>
          <School className="absolute bottom-3 right-3 size-6 text-ink/25" aria-hidden />
        </div>

        {/* 文字提示 */}
        <h2
          className="animate-fade-in-up text-xl md:text-2xl font-black text-foreground mb-2 font-serif"
          style={{ animationDelay: '0.3s' }}
        >
          页面走丢了
        </h2>
        <p
          className="animate-fade-in-up text-sm text-muted-foreground mb-8"
          style={{ animationDelay: '0.4s' }}
        >
          您访问的页面不存在或已被移动
        </p>

        {/* 按钮组 */}
        <div
          className="animate-fade-in-up flex flex-col sm:flex-row gap-3 justify-center"
          style={{ animationDelay: '0.6s' }}
        >
          <Button
            onClick={() => navigate("/")}
            className="bg-ink text-white hover:bg-accent border-2 border-ink rounded-sm neo-shadow-sm neo-press h-11 px-6 font-bold"
          >
            <Home className="size-4 mr-2" />
            返回首页
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-2 border-ink rounded-sm neo-shadow-sm neo-press bg-card text-ink hover:bg-ink hover:text-white h-11 px-6 font-bold"
          >
            <ArrowLeft className="size-4 mr-2" />
            返回上一页
          </Button>
        </div>
      </div>
    </div>
  );
}
