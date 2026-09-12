// EXPORTS: MOCK_TEACHING_SECTION, MOCK_TEACHERS, MOCK_ACHIEVEMENTS, ITeacherProfile, ITeachingAchievement, ITeachingSection

export interface ITeacherProfile {
  id: string;
  name: string;
  title: string;
  subject: string;
  description: string;
  avatar: string;
}

export interface ITeachingAchievement {
  id: string;
  title: string;
  description: string;
  year: string;
  level: string;
  sourceUrl?: string;
}

export interface ITeachingSection {
  title: string;
  description: string;
  image: string;
  features: { label: string; description: string }[];
}

export const MOCK_TEACHING_SECTION: ITeachingSection = {
  title: '教学教研',
  description:
    '成都市田家炳中学坚持"科研兴校、质量立校"的办学方略，构建"实际、实在、实效"的"三实"课堂和"实学、实用、实慧、实德"的"四实"课程体系。学校是四川省普通高中课程改革省级样本校、教育部人工智能教育"双试点"单位，国家社科基金教育学重大课题项目学校。90%以上的新高一教师来自原高三毕业班，实施"大分层、小分类、个别化"的差异化教学。',
  image: '/images/BwGQ1wfhTy.webp',
  features: [
    { label: '"三实"课堂', description: '国家社科基金课题项目，"实际、实在、实效"的生本教学模式，获国家级一等奖' },
    { label: '"四实"课程', description: '"实学、实用、实慧、实德"校本课程体系，每周五下午开设30余门选修课' },
    { label: 'AI融合教学', description: '教育部"双试点"单位，22门AI教育课程+4门本校开发选修课程，AI辅助分层备课' },
    { label: '青蓝工程', description: '师徒结对培养青年教师，新教师四阶段成长目标：站稳讲台→受学生喜爱→有育人成绩→管好学生' },
    { label: '分层教学', description: '基于教育大数据的"大分层、小分类、个别化"教学，探索选课走班多种形式' },
    { label: '贯通培养', description: '与四川大学共建"智能制造少年班"，聘请电子科大、西南交大专家组建导师团' },
  ],
};

export const MOCK_TEACHERS: ITeacherProfile[] = [
  {
    id: 't1',
    name: '张友科',
    title: '人工智能课程专家',
    subject: '信息技术',
    description:
      '锦江区第一批人工智能名师工作室主持人。其课程《机器学习分类算法》获得基础教育精品课部级优课荣誉。受邀在全国中小学人工智能教育创新学术论坛作经验分享，带领学生连续两年获全国学生信息素养活动最高荣誉"创新之星"。',
    avatar: '/teachers/teacher-18.webp',
  },
  {
    id: 't4',
    name: '何拥军',
    title: '锦江区特级教师',
    subject: '化学',
    description:
      '锦江区特级教师。教育教学成绩突出，培养大批优秀学子，师德高尚。深耕教学一线，教研成果丰硕，发挥示范引领作用。',
    avatar: '/teachers/teacher-23.webp',
  },
  {
    id: 't5',
    name: '曹洪义',
    title: '成都市优秀班主任',
    subject: '英语',
    description:
      '成都市优秀班主任。教书育人并重，管理科学民主，深受学生喜爱和家长信赖。注重学生全面发展，善于激发学生潜能。',
    avatar: '/teachers/teacher-6.webp',
  },
];

export const MOCK_ACHIEVEMENTS: ITeachingAchievement[] = [
  {
    id: 'a1',
    title: '四川省普通高中课程改革省级样本校',
    description: '获评四川省普通高中课程改革省级样本校，课堂教学改革走在全省前列。',
    year: '2023',
    level: '省级',
  },
  {
    id: 'a2',
    title: '成都市第二批教师发展基地校',
    description: '获评成都市第二批教师发展基地校，构建"教、学、研、训"一体化教师专业发展体系。',
    year: '2024',
    level: '市级',
  },
  {
    id: 'a3',
    title: '基础教育精品课部级优课',
    description: '张友科老师《机器学习分类算法》课程获基础教育精品课部级优课荣誉。',
    year: '2024',
    level: '国家级',
  },
  {
    id: 'a4',
    title: '国家级课题顺利结题',
    description: '教育部"十四五"规划课题"核心素养导向的课堂教学转型研究"顺利结题。',
    year: '2023',
    level: '国家级',
  },
  {
    id: 'a5',
    title: '四川省教学成果一等奖',
    description: '"高中语文思辨性阅读教学实践研究"获四川省第六届教学成果一等奖。',
    year: '2024',
    level: '省级',
  },
];
