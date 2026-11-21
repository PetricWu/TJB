// EXPORTS: MOCK_INNOVATION, MOCK_INNOVATION_ACHIEVEMENTS

import type { INews } from '@/types/news';

export interface IInnovationAchievement {
  id: string;
  title: string;
  year: string;
  level: string;
  description: string;
}

export const MOCK_INNOVATION: INews[] = [
  {
    id: 'inno-1',
    title: '连续两年蝉联全国学生信息素养活动最高荣誉"创新之星"',
    summary: '2024、2025连续两年，我校学子在全国学生信息素养提升实践活动中斩获最高荣誉"创新之星"。2025年高嘉煦（创意智造）、唐栎森（智能博物《成都之非遗》）获此殊荣，高嘉煦成为锦江区首位连续两年获此荣誉的学生。',
    content: '',
    category: '校园要闻',
    coverImage: '/images/BwGQ1wfhTy.webp',
    publishDate: '2025-07-20',
    author: '科创中心',
    viewCount: 1860,
    isPinned: true,
  },
  {
    id: 'inno-2',
    title: '我校获评"成都市人工智能科普教育示范校"',
    summary: '2026年，成都市田家炳中学凭借在人工智能教育领域的突出成果，获评"成都市人工智能科普教育示范校"。',
    content: '',
    category: '校园要闻',
    coverImage: '/images/BwGQ1wfhTy.webp',
    publishDate: '2026-03-15',
    author: '科创中心',
    viewCount: 1420,
    isPinned: true,
  },
  {
    id: 'inno-3',
    title: '张友科老师《机器学习分类算法》获基础教育精品课部级优课',
    summary: '张友科老师《机器学习分类算法》获基础教育精品课部级优课，参与编写区本高中人工智能教材《人工智能-可编程硬件》和《人工智能与创新实践》。',
    content: '',
    category: '教学教研',
    coverImage: '/images/38Bp1wfimz.webp',
    publishDate: '2024-03-20',
    author: '教务处',
    viewCount: 980,
    isPinned: false,
  },
];

export const MOCK_INNOVATION_ACHIEVEMENTS: IInnovationAchievement[] = [
  {
    id: 'ach-1',
    title: '全国学生信息素养活动"创新之星"',
    year: '2025',
    level: '国家级',
    description: '2024、2025连续两年蝉联最高荣誉，成都市唯一',
  },
  {
    id: 'ach-2',
    title: '成都市人工智能科普教育示范校',
    year: '2026',
    level: '市级',
    description: '人工智能教育领域突出成果获评',
  },
  {
    id: 'ach-3',
    title: '课程教材所人工智能教育试点单位',
    year: '2025',
    level: '国家级',
    description: '教育部课程教材研究所认定',
  },
  {
    id: 'ach-4',
    title: '基础教育精品课部级优课',
    year: '2024',
    level: '国家级',
    description: '张友科老师《机器学习分类算法》课程',
  },
  {
    id: 'ach-5',
    title: '近三年国家级省级科创奖项300余人次',
    year: '2023-2025',
    level: '综合',
    description: '机器人、3D打印、无人机等15个高标准实验室支撑',
  },
  {
    id: 'ach-6',
    title: '宋庆龄少年儿童发明奖全国银奖',
    year: '2025',
    level: '国家级',
    description: '张施琪、罗宇轩、黄玉龙"公园绿道智能AI报警系统"获全国银奖，四川省初中组第一名',
  },
  {
    id: 'ach-7',
    title: '世界机器人大赛一等奖',
    year: '2024',
    level: '国家级',
    description: '张睿同学获世界机器人大赛一等奖',
  },
];

export interface IInnovationCourseTier {
  tier: string;
  audience: string;
  description: string;
  courses: string[];
}

/** 通识 + 竞赛层级化科创课程集群 */
export const INNOVATION_COURSE_TIERS: IInnovationCourseTier[] = [
  {
    tier: '通识课程',
    audience: '面向全体学生',
    description: '普及科学素养与数字素养，为每一位学生打下科创基础。',
    courses: ['科学素养', '信息科技', 'AI 通识'],
  },
  {
    tier: '竞赛课程',
    audience: '面向社团与梯队',
    description: '面向科创社团与竞赛梯队，开展项目化训练与专项备赛。',
    courses: ['机器人', '信息素养', '智能博物', 'FLL'],
  },
];

export interface IInnovationStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

/** 2025 年科创赛事成绩 */
export const INNOVATION_STATS: IInnovationStat[] = [
  { id: 'participants', value: 216, suffix: '人次', label: '2025 年参与各级科创赛事' },
  { id: 'national', value: 30, suffix: '余项', label: '国家级奖项' },
  { id: 'province', value: 60, suffix: '余项', label: '省级奖项' },
  { id: 'stars', value: 2, suffix: '年', label: '连续获评全国「创新之星」' },
];

export interface IInnovationStar {
  name: string;
  award: string;
  project: string;
}

export const INNOVATION_STARS: IInnovationStar[] = [
  {
    name: '高嘉煦',
    award: '第 25 届全国学生信息素养提升实践活动「创新之星」',
    project: '两人合作项目',
  },
  {
    name: '文佳怡',
    award: '第 25 届全国学生信息素养提升实践活动「创新之星」',
    project: '两人合作项目',
  },
  {
    name: '唐栎森',
    award: '全国学生信息素养提升实践活动「创新之星」',
    project: '智能博物项目 · 单人参赛',
  },
];

export interface IInnovationFacility {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

export const INNOVATION_FACILITIES: IInnovationFacility[] = [
  {
    id: 'fac-room',
    name: '航空主题科创教室',
    description: '集「航天 + 国防 + 科创」功能于一体，为学生提供沉浸式科创实践场景。',
    tags: ['航天', '国防', '科创'],
  },
  {
    id: 'fac-lab',
    name: '15 个高标准科学实验室',
    description: '配备机器人、3D 打印、无人机等设备，支撑课程实施与项目探究。',
    tags: ['机器人', '3D 打印', '无人机'],
  },
];

