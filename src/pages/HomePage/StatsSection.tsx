import { memo } from 'react';
import { GraduationCap, Users, BookOpen, Trophy } from 'lucide-react';
import CountUp from '@/components/CountUp';
import type { IStatItem } from '@/types/common';

const STATS: IStatItem[] = [
  { label: '建校历史', value: '101', suffix: '年' },
  { label: '在校学生', value: '3100', suffix: '人' },
  { label: '专任教师', value: '260', suffix: '人' },
  { label: '教学班', value: '60', suffix: '个' },
];

const STAT_ICONS = [GraduationCap, Users, BookOpen, Trophy];

export default memo(function StatsSection() {
  return (
    <section className="w-full py-16 md:py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <div
                key={stat.label}
                className="reveal-up flex flex-col items-center text-center gap-3"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="size-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <Icon className="size-6 text-accent" strokeWidth={1.5} />
                </div>
                <div className="flex items-baseline gap-1">
                  <CountUp
                    value={Number(stat.value)}
                    duration={1400}
                    delay={i * 150}
                    className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight text-primary-foreground"
                  />
                  {stat.suffix && (
                    <span className="text-lg md:text-xl text-primary-foreground/70">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <span className="text-sm md:text-base text-primary-foreground/70">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
