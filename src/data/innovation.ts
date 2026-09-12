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

