import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/SectionHeader';

interface IFeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

const FEATURES: IFeatureCard[] = [
  {
    id: 'teaching',
    title: '教学教研',
    description: '深化课堂改革，推进"深度学习"教学模式，构建"教、学、研、训"一体化教师专业发展体系。',
    icon: 'BookOpen',
    path: '/teaching',
  },
  {
    id: 'innovation',
    title: '科创特色',
    description: '课程教材所人工智能教育试点单位，2026年获评成都市人工智能科普教育示范校，近三年国家级省级科创奖项300余人次。',
    icon: 'FlaskConical',
    path: '/innovation',
  },
  {
    id: 'moral',
    title: '德育园地',
    description: '践行"履仁崇智 明德卓行"校训，以主题活动和心理健康教育塑造健全人格。',
    icon: 'Heart',
    path: '/moral',
  },
  {
    id: 'student',
    title: '学生发展',
    description: '艺术、体育、社团、实践四位一体，让每一位田中学子找到属于自己的舞台，在体验中成长、在实践中收获。',
    icon: 'Users',
    path: '/student',
  },
  {
    id: 'honors',
    title: '荣誉资质',
    description: '四川省一级示范性普通高中（2023年通过验收），全国国防教育示范校，四川省校风示范校。',
    icon: 'Trophy',
    path: '/about#honors',
  },
  {
    id: 'admission',
    title: '招生招聘',
    description: '2026年面向"5+2"区域招收600名学生，开设六年贯通培养试点班，欢迎优秀初中毕业生报考。',
    icon: 'GraduationCap',
    path: '/admission',
  },
];

const HONORS = [
  '四川省一级示范性普通高中',
  '全国国防教育示范校',
  '四川省校风示范校',
];

const STATS = [
  { label: '建校历史', value: '101', suffix: '年' },
  { label: '在校学生', value: '3100', suffix: '人' },
  { label: '专任教师', value: '260', suffix: '人' },
  { label: '教学班', value: '60', suffix: '个' },
];

// 桌面端 4 列横向条 + 移动端 2x2 网格的分隔边框
const STAT_BORDERS = [
  '',
  'border-l',
  'border-t md:border-l md:border-t-0',
  'border-l border-t md:border-t-0',
];

/** 新版式卡片：2px 藏青描边 + 硬投影 + 大编号 */
const CARD_BASE =
  'relative bg-card border-2 border-ink rounded-sm p-6 md:p-8 neo-shadow-sm neo-press flex flex-col';

/** 卡片大编号（参考站 LOT 编号版式，弱化装饰） */
function CardNo({ no }: { no: string }) {
  return (
    <span
      aria-hidden
      className="font-english text-3xl md:text-4xl font-black text-accent/25 tabular-nums leading-none select-none"
    >
      {no}
    </span>
  );
}

export default function FeaturesSection() {
  const [teaching, innovation, moral, student, honors, admission] = FEATURES;

  return (
    <section className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 标题区 */}
        <div className="reveal-up">
          <SectionHeader
            no="01"
            en="Features"
            title="全面发展，多元成才"
            desc="六大特色栏目，全方位展示学校办学成果，助力每一位学子成就更好的自己"
          />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {/* Card 1 · 教学教研（大卡） */}
          <Link
            to={teaching.path}
            className={`reveal-up md:col-span-2 group justify-between ${CARD_BASE}`}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-serif text-xl md:text-2xl font-black text-ink">
                {teaching.title}
              </h3>
              <CardNo no="01" />
            </div>
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mt-3">
              {teaching.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink">
              了解更多
              <span aria-hidden className="font-sans transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>

          {/* Card 2 · 科创特色（数据高亮） */}
          <Link
            to={innovation.path}
            className={`reveal-up md:col-span-1 group justify-between ${CARD_BASE}`}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-serif text-lg font-black text-ink">
                {innovation.title}
              </h3>
              <CardNo no="02" />
            </div>
            <div className="my-4 flex items-baseline gap-1.5">
              <span className="font-display text-4xl md:text-5xl font-black text-accent tabular-nums tracking-tight">
                300+
              </span>
              <span className="font-sans text-base text-muted-foreground">人次</span>
            </div>
            <p className="font-sans text-sm text-muted-foreground">
              近三年国家级省级科创奖项
            </p>
          </Link>

          {/* Card 3 · 德育园地（校训引言） */}
          <Link
            to={moral.path}
            className={`reveal-up md:col-span-1 group justify-between ${CARD_BASE}`}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-serif text-lg font-black text-ink">
                {moral.title}
              </h3>
              <CardNo no="03" />
            </div>
            <blockquote className="mt-4 border-l-4 border-accent pl-4">
              <p className="font-serif text-xl md:text-2xl font-black text-ink leading-snug">
                履仁崇智 明德卓行
              </p>
            </blockquote>
            <p className="font-sans text-sm text-muted-foreground mt-4">
              校训 · 以主题活动和心理健康教育塑造健全人格
            </p>
          </Link>

          {/* Card 4 · 学生发展（横向大卡） */}
          <Link
            to={student.path}
            className={`reveal-up md:col-span-2 group md:flex-row md:items-center md:justify-between md:gap-8 ${CARD_BASE}`}
          >
            <div className="md:flex-1">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-xl md:text-2xl font-black text-ink">
                  {student.title}
                </h3>
                <CardNo no="04" />
              </div>
              <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mt-3">
                {student.description}
              </p>
            </div>
            <span className="mt-5 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-ink whitespace-nowrap">
              了解更多
              <span aria-hidden className="font-sans transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>

          {/* Card 5 · 荣誉资质（荣誉列表） */}
          <Link
            to={honors.path}
            className={`reveal-up md:col-span-1 group ${CARD_BASE}`}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-serif text-lg font-black text-ink">
                {honors.title}
              </h3>
              <CardNo no="05" />
            </div>
            <ul className="font-sans text-sm text-muted-foreground space-y-2.5">
              {HONORS.map((honor) => (
                <li key={honor} className="flex gap-2.5">
                  <span className="text-accent mt-1.5 text-[8px] leading-none" aria-hidden>●</span>
                  <span className="leading-relaxed">{honor}</span>
                </li>
              ))}
            </ul>
          </Link>

          {/* Card 6 · 招生招聘（CTA 按钮） */}
          <div className={`reveal-up md:col-span-1 justify-between ${CARD_BASE}`}>
            <div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-serif text-lg font-black text-ink">
                  {admission.title}
                </h3>
                <CardNo no="06" />
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {admission.description}
              </p>
            </div>
            <Button asChild className="mt-5 w-full bg-accent text-white hover:bg-accent/90 font-bold rounded-sm border-2 border-accent no-default-hover-elevate no-default-active-elevate">
              <Link to={admission.path}>了解招生详情</Link>
            </Button>
          </div>
        </div>

        {/* 数据统计条（深色面板 + 角标 + 强调色数字，参考站深色数据卡版式） */}
        <div className="reveal-up mt-10 md:mt-12 corner-mark overflow-hidden rounded-sm bg-ink text-white neo-shadow">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center px-4 py-7 md:py-9 border-white/10 ${STAT_BORDERS[i]}`}
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl md:text-4xl font-black text-accent tabular-nums tracking-tight">
                    {stat.value}
                  </span>
                  <span className="font-sans text-sm text-white/60">
                    {stat.suffix}
                  </span>
                </div>
                <span className="font-sans text-xs md:text-sm text-white/60 mt-1.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
