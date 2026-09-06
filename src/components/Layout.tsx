import { useEffect, useState, lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MusicPlayer = lazy(() => import('@/components/MusicPlayer'));

export function Layout() {
  const location = useLocation();
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMusicPlayer(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.hash) {
      // 懒加载页面可能晚于本 effect 挂载，重试直到锚点元素出现
      const headerHeight = window.innerWidth < 768 ? 64 : 80;
      let attempts = 0;
      const timer = setInterval(() => {
        attempts++;
        const element = document.querySelector(location.hash);
        if (element) {
          clearInterval(timer);
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        } else if (attempts > 13) {
          clearInterval(timer);
        }
      }, 150);
      return () => clearInterval(timer);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname, location.hash, location.search]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
      {showMusicPlayer && (
        <Suspense fallback={null}>
          <MusicPlayer />
        </Suspense>
      )}
    </div>
  );
}
