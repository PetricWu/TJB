// EXPORTS: MOCK_STUDENT_ACTIVITIES, STUDENT_CATEGORIES

import type { INews } from '@/types/news';

export interface IStudentActivity {
  id: string;
  title: string;
  description: string;
  category: '艺术活动' | '体育活动' | '社团活动' | '实践活动';
  coverImage: string;
  date: string;
  location: string;
  organizer: string;
  highlights: string[];
  sourceUrl?: string;
}

export const STUDENT_CATEGORIES = [
  { label: '全部', value: 'all' },
  { label: '艺术活动', value: '艺术活动' },
  { label: '体育活动', value: '体育活动' },
  { label: '社团活动', value: '社团活动' },
  { label: '实践活动', value: '实践活动' },
] as const;

export const MOCK_STUDENT_ACTIVITIES: IStudentActivity[] = [
  {
    id: 'sa-1',
    title: '第23届校园文化艺术节闭幕汇演',
    description: '以"青春飞扬·艺彩田中"为主题的第23届校园文化艺术节圆满落幕。涵盖校园歌手大赛、班级合唱、书画摄影展、话剧展演等十余项活动，充分展现田中学子的艺术才华与青春风采。',
    category: '艺术活动',
    coverImage: '/images/38Bp1wfimz.webp',
    date: '2025-05-26',
    location: '学校演艺厅',
    organizer: '德育处、艺术教研组',
    highlights: ['高二(8)班刘思涵获歌手大赛冠军', '原创话剧《百年回响》感动全场', '书画摄影展展出作品200余幅'],
    sourceUrl: 'https://mp.weixin.qq.com/s/GHbLqdSNx1qGWUP0Dg1ASA',
  },
  {
    id: 'sa-2',
    title: '第十六届春季田径运动会',
    description: '第十六届春季田径运动会隆重举行，主题"百年荣耀，体育筑梦"。前国脚魏群助阵，设足球、篮球、乒乓球等球类项目，全校学生参与竞技，展现田中学子昂扬向上的精神风貌。',
    category: '体育活动',
    coverImage: '/images/38Bp1wfimz.webp',
    date: '2025-04-12',
    location: '学校田径场',
    organizer: '体育教研组',
    highlights: ['男子100米11.2秒破校纪录', '女子4×100米接力52.8秒刷新纪录', '高一(9)班获团体总分第一'],
    sourceUrl: 'https://mp.weixin.qq.com/s/hKZlMYfjHIQ3azXfxQAdrQ',
  },
  {
    id: 'sa-3',
    title: '机器人社团出征VEX世锦赛挺进八强',
    description: '我校机器人社团代表中国出征VEX机器人世界锦标赛，凭借出色的机械设计、编程能力和团队协作，在工程挑战赛高中组中挺进八强，展现了我校科创教育的国际竞争力。学校是教育部人工智能教育"双试点"单位，拥有15个高标准科学实验室。',
    category: '社团活动',
    coverImage: '/images/38Bp1wfimz.webp',
    date: '2025-04-20',
    location: '美国达拉斯',
    organizer: '科技创新社团',
    highlights: ['VEX世锦赛八强', '工程挑战赛高中组', '代表中国出征'],
  },
  {
    id: 'sa-4',
    title: '学雷锋志愿服务月社区实践活动',
    description: '组织学生走进锦江区顺江社区，开展环境美化、助老扶幼、科普宣传等志愿服务活动。同学们用实际行动践行"崇实适性，润育心田"的办学理念，获得社区居民一致好评。',
    category: '实践活动',
    coverImage: '/images/38Bp1wfimz.webp',
    date: '2025-03-05',
    location: '锦江区顺江社区',
    organizer: '校团委',
    highlights: ['服务社区居民200余人次', '开展科普小课堂3场', '获社区感谢信'],
  },
  {
    id: 'sa-5',
    title: '第五届"田中之声"校园歌手大赛',
    description: '第五届"田中之声"校园歌手大赛决赛在学术报告厅举行，经过初赛、复赛层层选拔的12位选手同台竞技，用歌声传递青春力量，线上直播观看超5000人次。',
    category: '艺术活动',
    coverImage: '/images/38Bp1wfimz.webp',
    date: '2024-12-10',
    location: '学术报告厅',
    organizer: '校学生会文艺部',
    highlights: ['12位选手晋级决赛', '增设原创歌曲赛道', '线上直播观看超5000人次'],
  },
];

export const MOCK_STUDENT_NEWS: INews[] = [
  {
    id: 'sn-1',
    title: '我校学子在四川省中学生艺术展演中斩获佳绩',
    summary: '在四川省第十届中学生艺术展演活动中，我校选送的舞蹈节目《青春飞扬》荣获一等奖，合唱节目荣获二等奖。',
    content: '',
    category: '校园要闻',
    coverImage: '/images/38Bp1wfimz.webp',
    publishDate: '2025-05-25',
    author: '艺术教研组',
    viewCount: 1520,
    isPinned: false,
  },
  {
    id: 'sn-2',
    title: '春季运动会圆满落幕 多项校纪录被刷新',
    summary: '为期三天的春季田径运动会于4月12日圆满落幕，共有6人次打破4项校纪录，展现了田中学子昂扬向上的精神风貌。',
    content: '',
    category: '校园要闻',
    coverImage: '/images/38Bp1wfimz.webp',
    publishDate: '2025-04-13',
    author: '体育教研组',
    viewCount: 980,
    isPinned: false,
  },
  {
    id: 'sn-3',
    title: '关于举办2025年社团招新活动的通知',
    summary: '校团委定于9月15日至17日在操场举办社团招新活动，涵盖科技创新、文化艺术、体育运动、社会实践四大类32个社团，欢迎全体同学积极参与。',
    content: '',
    category: '通知公告',
    coverImage: '',
    publishDate: '2025-09-10',
    author: '校团委',
    viewCount: 2100,
    isPinned: true,
  },
];

