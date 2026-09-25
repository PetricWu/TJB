import {
  Bus,
  Car,
  Clock,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Train,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { UniversalLink } from '@/components/UniversalLink';
import { useSEO } from '@/hooks/useSEO';
import {
  MOCK_CONTACT_INTRO,
  MOCK_CONTACT,
  MOCK_CAMPUSES,
  MOCK_TRANSPORT,
  MOCK_CONTACT_LINKS,
  MOCK_CONTACT_SOURCES,
} from '@/data/contact';

const TRANSPORT_ICONS = [Train, Bus, Car];

export default function ContactPage() {
  useSEO({
    title: '联系我们',
    description:
      '成都市田家炳中学联系方式与校园地图。高中部：锦江区顺江路369号；初中部：锦江区工农院街69号（莲新片区）。招生咨询电话 028-84551880，地铁6号线/13号线三官堂站A口直达。',
    canonical: 'https://tjb.petricw.com/contact',
    breadcrumbs: [
      { name: '首页', url: '/' },
      { name: '联系我们', url: '/contact' },
    ],
  });

  return (
    <div className="min-h-screen bg-transparent">
      <PageHero
        no="10"
        en="Contact"
        title={MOCK_CONTACT_INTRO.title}
        desc={MOCK_CONTACT_INTRO.description}
      />

      {/* 基础联系信息带 */}
      <section className="w-full bg-card border-b-2 border-ink/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 电话 */}
            <UniversalLink
              to={`tel:${MOCK_CONTACT.phone.replace(/-/g, '')}`}
              className="group flex items-start gap-3 p-4 rounded-sm border-2 border-ink/20 hover:border-accent transition-colors"
            >
              <div className="size-10 rounded-sm bg-accent/10 flex items-center justify-center">
                <Phone className="size-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">招生咨询电话</p>
                <p className="text-lg font-black text-ink tabular-nums group-hover:text-accent transition-colors">
                  {MOCK_CONTACT.phone}
                </p>
              </div>
            </UniversalLink>
            {/* 邮箱 */}
            <UniversalLink
              to={`mailto:${MOCK_CONTACT.email}`}
              className="group flex items-start gap-3 p-4 rounded-sm border-2 border-ink/20 hover:border-accent transition-colors"
            >
              <div className="size-10 rounded-sm bg-accent/10 flex items-center justify-center">
                <Mail className="size-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">电子邮箱</p>
                <p className="text-base font-bold text-ink truncate group-hover:text-accent transition-colors">
                  {MOCK_CONTACT.email}
                </p>
              </div>
            </UniversalLink>
            {/* 办公时间 */}
            <div className="flex items-start gap-3 p-4 rounded-sm border-2 border-ink/20">
              <div className="size-10 rounded-sm bg-accent/10 flex items-center justify-center">
                <Clock className="size-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">办公时间</p>
                <p className="text-base font-bold text-ink">{MOCK_CONTACT.officeHours}</p>
              </div>
            </div>
            {/* 邮编 */}
            <div className="flex items-start gap-3 p-4 rounded-sm border-2 border-ink/20">
              <div className="size-10 rounded-sm bg-accent/10 flex items-center justify-center">
                <Globe className="size-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">邮政编码</p>
                <p className="text-base font-bold text-ink tabular-nums">{MOCK_CONTACT.postcode}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-20 md:space-y-24">
        {/* 02 两校区与校园地图 */}
        <section id="campuses" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="02"
              en="Campuses"
              title="两校区与校园地图"
              desc="学校分设高中部、初中部两个校区，均位于成都市锦江区，交通便利。点击下方按钮即可在地图中导航。"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {MOCK_CAMPUSES.map((campus) => (
                <article
                  key={campus.id}
                  className="bg-card border-2 border-ink rounded-sm neo-shadow overflow-hidden corner-mark"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src="/images/38Bp1wfimz.webp"
                      alt={`成都市田家炳中学${campus.name}校园`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-sm bg-ink flex items-center justify-center">
                        <MapPin className="size-5 text-accent" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black text-ink">{campus.name}</h3>
                          <Badge className="text-xs rounded-sm bg-accent text-white border-0">{campus.stage}</Badge>
                        </div>
                        <p className="text-sm font-semibold text-foreground/85">{campus.address}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80">{campus.description}</p>
                    {/* 地图深链按钮 */}
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={campus.amapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-accent text-white rounded-sm neo-press"
                      >
                        <Navigation className="size-4" />
                        高德地图导航
                      </a>
                      <a
                        href={campus.baiduUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-card text-ink border-2 border-ink rounded-sm neo-press"
                      >
                        <Navigation className="size-4" />
                        百度地图导航
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 03 交通指引 */}
        <section id="transport" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="03"
              en="Getting Here"
              title="交通指引"
              desc="以高中部（顺江路369号）为例，公共交通便捷，欢迎莅临参观。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_TRANSPORT.map((item, i) => {
                const Icon = TRANSPORT_ICONS[i] ?? Bus;
                return (
                  <article
                    key={item.id}
                    className="p-6 rounded-sm bg-card border-2 border-ink/20 hover:border-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-sm bg-accent/10 flex items-center justify-center">
                        <Icon className="size-6 text-accent" />
                      </div>
                      <div>
                        <Badge className="text-xs rounded-sm bg-ink text-white border-0">{item.mode}</Badge>
                        <h3 className="mt-1 text-base font-black text-ink">{item.title}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/85">{item.detail}</p>
                  </article>
                );
              })}
            </div>
            <div className="mt-6 p-5 rounded-sm bg-accent/8 border-l-2 border-accent">
              <p className="text-sm text-foreground/80 leading-relaxed">
                <strong className="text-ink">温馨提示：</strong>
                高中部紧邻地铁6号线／13号线「三官堂」站，A口出站步行约50米即达；与四川大学隔江相望，区位优越。具体公交线路以实际运营为准，如有疑问欢迎来电咨询
                <UniversalLink to={`tel:${MOCK_CONTACT.phone.replace(/-/g, '')}`} className="mx-1 text-accent font-semibold hover:underline">
                  {MOCK_CONTACT.phone}
                </UniversalLink>
                。
              </p>
            </div>
          </div>
        </section>

        {/* 04 相关链接 */}
        <section id="links" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader no="04" en="Explore" title="相关链接" desc="了解更多田中信息" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MOCK_CONTACT_LINKS.map((link) => (
                <UniversalLink
                  key={link.label}
                  to={link.path}
                  className="group flex items-center justify-between p-5 rounded-sm bg-card border-2 border-ink neo-shadow-sm hover:border-accent hover:bg-accent/5 transition-colors"
                >
                  <span className="text-base font-bold text-ink">{link.label}</span>
                  <ExternalLink className="size-5 text-accent shrink-0" />
                </UniversalLink>
              ))}
            </div>

            {/* 资料来源 */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-5 bg-accent shrink-0" aria-hidden />
                <span className="font-english text-xs font-bold tracking-[0.28em] uppercase text-muted-foreground">
                  05 — Sources
                </span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MOCK_CONTACT_SOURCES.map((source) => (
                  <li key={source.label}>
                    <UniversalLink
                      to={source.url}
                      className="group flex items-start gap-3 p-4 rounded-sm bg-card border-2 border-ink/20 hover:border-accent transition-colors"
                    >
                      <ExternalLink className="size-4 text-accent shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                          {source.label}
                        </p>
                        {source.note && (
                          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{source.note}</p>
                        )}
                      </div>
                    </UniversalLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
