import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * 背景音乐播放器 — 最大化自动播放能力（增强版）
 *
 * 使用 audio.muted 代替 audio.volume 控制音量，
 * 彻底避免 IndexSizeError。
 *
 * 策略链（依次尝试）：
 * 1. muted autoplay → unmute
 * 2. 直接 play
 * 3. Web Audio API 解锁后播放
 * 4. iframe 静音播放解锁（iOS 微信/支付宝）
 * 5. Video 元素解锁
 * 6. 手势监听（滑动/触摸/点击持续重试直到成功，节流 300ms）
 * 7. 延迟重试（500ms / 1s / 2s / 5s）
 * 8. 页面可见性变化重试
 * 9. 窗口加载重试
 * 10. 持续轮询（每 3s，持续 30s）
 * 11. 鼠标移动 + 页面焦点监听
 */
export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const unlocked = useRef(false);
  const userPaused = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gestureCount = useRef(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true;

    const onSuccess = () => {
      if (unlocked.current) return;
      unlocked.current = true;
      audio.muted = false;
      setIsPlaying(true);
      cleanup();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: '成都市田家炳中学',
          artist: '校园背景音乐',
        });
      }
    };

    const isStopped = () => unlocked.current || userPaused.current;

    // === 策略 1：muted autoplay → unmute ===
    const tryMutedAutoplay = () => {
      if (isStopped()) return;
      if (audio.readyState < 2) audio.load();
      audio.muted = true;
      audio.play().then(() => {
        onSuccess();
      }).catch(() => {
        audio.muted = false;
        tryDirectPlay();
      });
    };

    // === 策略 2：直接 play ===
    const tryDirectPlay = () => {
      if (isStopped()) return;
      if (audio.readyState < 2) audio.load();
      audio.play().then(onSuccess).catch(() => {
        tryAudioContextUnlock();
      });
    };

    // === 策略 3：Web Audio API 解锁 ===
    const tryAudioContextUnlock = () => {
      if (isStopped()) return;
      try {
        const AC = window.AudioContext || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext;
        if (!AC) { tryVideoUnlock(); return; }
        const ctx = audioCtxRef.current || new AC();
        audioCtxRef.current = ctx;
        if (ctx.state === 'suspended') {
          ctx.resume().then(() => {
            const buffer = ctx.createBuffer(1, 1, 22050);
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.start(0);
            setTimeout(() => {
              if (isStopped()) return;
              audio.play().then(onSuccess).catch(() => {
                tryIframeUnlock();
              });
            }, 50);
          }).catch(() => {
            tryVideoUnlock();
          });
        } else {
          tryVideoUnlock();
        }
      } catch {
        tryVideoUnlock();
      }
    };

    // === 策略 4：iframe 解锁（iOS 微信/支付宝）===
    // 不创建新的 audio 元素，避免重复下载 bgm.m4a
    const tryIframeUnlock = () => {
      if (isStopped()) return;
      try {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = 'about:blank';
        document.body.appendChild(iframe);
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          // 使用空的静音 video 解锁音频上下文，不加载 bgm.m4a
          const iframeVideo = iframeDoc.createElement('video');
          iframeVideo.muted = true;
          iframeVideo.playsInline = true;
          iframeDoc.body.appendChild(iframeVideo);
          iframeVideo.play().then(() => {
            iframeVideo.pause();
            iframeDoc.body.removeChild(iframeVideo);
            document.body.removeChild(iframe);
            if (isStopped()) return;
            if (audio.readyState < 2) audio.load();
            audio.play().then(onSuccess).catch(() => {
              tryVideoUnlock();
            });
          }).catch(() => {
            document.body.removeChild(iframe);
            tryVideoUnlock();
          });
        } else {
          document.body.removeChild(iframe);
          tryVideoUnlock();
        }
      } catch {
        tryVideoUnlock();
      }
    };

    // === 策略 5：Video 元素解锁 ===
    // 不设置 src，避免重复下载 bgm.m4a
    const tryVideoUnlock = () => {
      if (isStopped()) return;
      try {
        const video = document.createElement('video');
        video.style.display = 'none';
        video.muted = true;
        video.playsInline = true;
        document.body.appendChild(video);
        video.play().then(() => {
          video.pause();
          document.body.removeChild(video);
          if (isStopped()) return;
          if (audio.readyState < 2) audio.load();
          audio.play().then(onSuccess).catch(() => {});
        }).catch(() => {
          if (video.parentNode) document.body.removeChild(video);
        });
      } catch {}
    };

    // === 策略 6：手势监听（滑动/触摸/点击均触发，持续重试直到成功）===
    let lastGestureTime = 0;
    const handleGesture = () => {
      if (isStopped()) return;
      const now = performance.now();
      if (now - lastGestureTime < 300) return;
      lastGestureTime = now;
      gestureCount.current++;
      if (audio.readyState < 2) audio.load();

      // 先尝试 muted play（兼容性最好），失败再试直接 play
      audio.muted = true;
      audio.play().then(() => {
        audio.muted = false;
        onSuccess();
      }).catch(() => {
        audio.muted = false;
        audio.play().then(onSuccess).catch(() => {
          if (audioCtxRef.current?.state === 'suspended') {
            audioCtxRef.current.resume().then(() => {
              if (isStopped()) return;
              audio.play().then(onSuccess).catch(() => {});
            });
          } else {
            tryAudioContextUnlock();
          }
        });
      });
    };

    // 滚动专用处理：节流更宽松，确保滑动一定触发
    let lastScrollTime = 0;
    const handleScroll = () => {
      if (isStopped()) return;
      const now = performance.now();
      if (now - lastScrollTime < 500) return;
      lastScrollTime = now;
      handleGesture();
    };

    const touchEvents = ['touchstart', 'touchend', 'touchmove'] as const;
    const interactionEvents = ['click', 'mousedown', 'pointerdown', 'keydown', 'keypress', 'wheel', 'focus', 'mouseover'] as const;
    const opts: AddEventListenerOptions = { passive: true };

    function cleanup() {
      touchEvents.forEach((ev) => document.removeEventListener(ev, handleGesture));
      interactionEvents.forEach((ev) => document.removeEventListener(ev, handleGesture));
      document.removeEventListener('scroll', handleScroll);
    }

    touchEvents.forEach((ev) => document.addEventListener(ev, handleGesture, opts));
    interactionEvents.forEach((ev) => document.addEventListener(ev, handleGesture, opts));
    document.addEventListener('scroll', handleScroll, opts);

    // === 策略 7：立即尝试 ===
    tryMutedAutoplay();

    // === 策略 8：延迟重试 ===
    const retryTimers = [500, 1000, 2000, 5000].map(ms =>
      setTimeout(() => {
        if (!isStopped()) tryMutedAutoplay();
      }, ms)
    );

    // === 策略 9：页面可见性变化 ===
    const onVisible = () => {
      if (!isStopped() && !document.hidden) {
        tryMutedAutoplay();
      }
    };
    document.addEventListener('visibilitychange', onVisible);

    // === 策略 10：窗口加载 ===
    const onLoad = () => {
      if (!isStopped()) tryMutedAutoplay();
    };
    window.addEventListener('load', onLoad);

    // === 策略 11：持续轮询（每 3s，持续 30s）===
    const pollInterval = setInterval(() => {
      if (isStopped()) {
        clearInterval(pollInterval);
        return;
      }
      tryMutedAutoplay();
    }, 3000);
    const pollStop = setTimeout(() => clearInterval(pollInterval), 30000);

    // === 策略 12：鼠标移动 + 页面焦点 ===
    let lastMouseTime = 0;
    const onMouseMove = () => {
      if (isStopped()) return;
      const now = performance.now();
      if (now - lastMouseTime < 500) return;
      lastMouseTime = now;
      if (!unlocked.current) {
        audio.play().then(onSuccess).catch(() => {});
      }
    };
    document.addEventListener('mousemove', onMouseMove, { passive: true });

    const onFocus = () => {
      if (!isStopped()) tryMutedAutoplay();
    };
    window.addEventListener('focus', onFocus);

    return () => {
      cleanup();
      retryTimers.forEach(clearTimeout);
      clearTimeout(pollStop);
      clearInterval(pollInterval);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('load', onLoad);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      userPaused.current = false;
      audio.muted = false;
      audioCtxRef.current?.state === 'suspended' && audioCtxRef.current.resume();
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    } else {
      userPaused.current = true;
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/bgm.m4a"
        loop
        preload="none"
        playsInline
      />

      <div className="fixed bottom-6 right-6 z-[110]">
        <button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
            isPlaying
              ? 'bg-primary text-primary-foreground'
              : 'bg-background/80 backdrop-blur-sm text-foreground border border-border'
          }`}
          aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </div>
    </>
  );
}
