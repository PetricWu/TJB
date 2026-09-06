import { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { articleCategories } from '@/data/merged-articles';

const SCHOOL_BADGE = '/images/38Bp1wfimz.webp';
const SCHOOL_BADGE_THUMB = '/images/38Bp1wfimz-thumb.webp';

interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
}

// 新闻分类下拉从文章数据动态生成，保证每个分类都有文章
const newsCategoryChildren = articleCategories().map((c) => ({
  label: c,
  path: `/news?category=${c}`,
}));

const NAV_ITEMS: NavItem[] = [
  { label: '首页', path: '/' },
  {
    label: '学校概况',
    path: '/about',
    children: [
      { label: '百年校史', path: '/about#history' },
      { label: '办学理念', path: '/about#philosophy' },
      { label: '师资队伍', path: '/about#faculty' },
      { label: '校园环境', path: '/about#campus' },
      { label: '荣誉资质', path: '/about#honors' },
    ],
  },
  {
    label: '新闻中心',
    path: '/news',
    children: newsCategoryChildren,
  },
  { label: '教学教研', path: '/teaching' },
  { label: '科创特色', path: '/innovation' },
  {
    label: '德育园地',
    path: '/moral',
    children: [
      { label: '德育活动', path: '/moral#activities' },
      { label: '心理健康', path: '/moral#psychology' },
      { label: '高三成长', path: '/moral#senior' },
    ],
  },
  {
    label: '学生发展',
    path: '/student',
    children: [
      { label: '艺术活动', path: '/student#art' },
      { label: '体育活动', path: '/student#sports' },
      { label: '社团活动', path: '/student#clubs' },
      { label: '实践活动', path: '/student#practice' },
    ],
  },
  { label: '招生招聘', path: '/admission' },
];

/** 从路径中提取 hash（如 /about#history → #history） */
function extractHash(path: string): string | null {
  const idx = path.indexOf('#');
  return idx >= 0 ? path.substring(idx) : null;
}

/** 平滑滚动到锚点或顶部 */
function scrollToHash(hash: string | null) {
  if (hash) {
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        const headerHeight = window.innerWidth < 768 ? 64 : 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 150);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const scrolledRef = useRef(false);

  // 滚动监听：直接操作 DOM class，避免 React 重渲染
  useEffect(() => {
    const onScroll = () => {
      const shouldBeScrolled = window.scrollY > 60;
      if (shouldBeScrolled !== scrolledRef.current) {
        scrolledRef.current = shouldBeScrolled;
        const el = headerRef.current;
        if (!el) return;
        if (shouldBeScrolled) {
          el.classList.remove('bg-background/95', 'border-border/30', 'shadow-lg');
          el.classList.add('bg-background/98', 'border-border/50', 'shadow-sm');
        } else {
          el.classList.remove('bg-background/98', 'border-border/50', 'shadow-sm');
          el.classList.add('bg-background/95', 'border-border/30', 'shadow-sm');
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // 初始化
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /** NavLink 点击处理：统一处理滚动 */
  const handleNavClick = useCallback((path: string, e: React.MouseEvent) => {
    const hash = extractHash(path);
    const routePath = hash ? path.substring(0, path.indexOf('#')) : path;
    const cleanPath = routePath.split('?')[0];
    const hasQuery = routePath.includes('?');

    if (cleanPath === pathname) {
      // 同页面：阻止 NavLink 默认导航，手动滚动
      e.preventDefault();
      if (hasQuery) {
        const qs = routePath.split('?')[1];
        navigate(`${pathname}?${qs}`, { replace: false });
      } else {
        scrollToHash(hash);
      }
    }
    // 不同页面：不阻止，让 NavLink 自然导航，Layout 的 useEffect 处理滚动
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname, navigate]);

  const isActive = (item: NavItem) => {
    if (item.path === '/') return pathname === '/';
    return pathname === item.path || pathname.startsWith(item.path + '/') || pathname.startsWith(item.path + '?');
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 border-b bg-background/95 backdrop-blur-md border-border/30 shadow-sm"
    >
      {/* 内容区顶部留空占位，防止 fixed 后被遮挡 */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex h-16 md:h-20 items-center justify-between">
        {/* Logo */}
        <NavLink to="/" end className="flex items-center gap-3 shrink-0" onClick={(e) => handleNavClick('/', e)}>
          <div className="size-10 md:size-12 rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src={SCHOOL_BADGE_THUMB}
              alt="成都市田家炳中学校徽"
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="block">
            <img
              src="/images/school-title.webp"
              alt="成都市田家炳中学"
              width="600"
              height="62"
              fetchPriority="high"
              className="school-title-img"
            />
            <div className="hidden lg:block text-xs font-english text-muted-foreground tracking-[0.1em]">
              CHENGDU TIANJIABING HIGH SCHOOL
            </div>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.path}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.path)}
              onMouseLeave={() => item.children && setOpenDropdown(null)}
            >
              {item.children ? (
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-2.5 xl:px-4 py-2 xl:py-2.5 text-sm xl:text-[15px] font-sans font-semibold rounded-sm transition-colors whitespace-nowrap ${
                    isActive(item)
                      ? 'bg-ink text-white'
                      : 'text-muted-foreground hover:text-ink hover:bg-ink/5 nav-underline'
                  }`}
                  onClick={() => {
                    if (openDropdown === item.path) {
                      // 已打开下拉：导航到该页面并滚动到顶部
                      navigate(item.path);
                      scrollToHash(null);
                      setOpenDropdown(null);
                      setMobileOpen(false);
                    } else {
                      setOpenDropdown(item.path);
                    }
                  }}
                >
                  {item.label}
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${
                      openDropdown === item.path ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive: linkActive }) =>
                    `block px-2.5 xl:px-4 py-2 xl:py-2.5 text-sm xl:text-[15px] font-sans font-semibold rounded-sm transition-colors whitespace-nowrap ${
                      linkActive ? 'bg-ink text-white' : 'text-muted-foreground hover:text-ink hover:bg-ink/5 nav-underline'
                    }`
                  }
                  onClick={(e) => handleNavClick(item.path, e)}
                >
                  {item.label}
                </NavLink>
              )}

              {item.children && openDropdown === item.path && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                  <div className="bg-popover border-2 border-ink rounded-sm shadow-lg py-2.5 min-w-[150px] dropdown-panel">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive: childActive }) =>
                          `flex items-center gap-2 px-5 py-2.5 text-sm transition-colors ${
                            childActive
                              ? 'text-accent font-bold'
                              : 'text-muted-foreground hover:text-ink hover:bg-ink/5'
                          }`
                        }
                        onClick={(e) => handleNavClick(child.path, e)}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t-2 border-ink/10 bg-background">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.path}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className={`flex items-center justify-between w-full px-3 py-3 text-base font-sans font-semibold rounded-sm transition-colors ${
                        isActive(item)
                          ? 'bg-ink text-white'
                          : 'text-foreground hover:bg-ink/5'
                      }`}
                      onClick={() => {
                        if (openDropdown === item.path) {
                          navigate(item.path);
                          scrollToHash(null);
                          setOpenDropdown(null);
                          setMobileOpen(false);
                        } else {
                          setOpenDropdown(item.path);
                        }
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        className={`size-4 transition-transform duration-200 ${
                          openDropdown === item.path ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openDropdown === item.path && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-accent pl-3">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive: childActive }) =>
                              `block px-3 py-2 text-sm rounded-sm transition-colors ${
                                childActive
                                  ? 'text-accent font-bold'
                                  : 'text-muted-foreground hover:text-ink hover:bg-ink/5'
                              }`
                            }
                            onClick={(e) => handleNavClick(child.path, e)}
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive: linkActive }) =>
                      `block px-3 py-3 text-base font-sans font-semibold rounded-sm transition-colors ${
                        linkActive
                          ? 'bg-ink text-white'
                          : 'text-foreground hover:bg-ink/5'
                      }`
                    }
                    onClick={(e) => handleNavClick(item.path, e)}
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
