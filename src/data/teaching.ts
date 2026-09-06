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
    '成都市田家炳中学坚持"科研兴校、质量立校"的办学方略，以课堂教学改革为核心，以校本教研为抓手，构建"教、学、研、训"一体化教师专业发展体系。学校获评"四川省普通高中课程改革省级样本校"、"成都市第二批教师发展基地校"，90%以上的新高一教师来自原高三毕业班，实战经验丰富。',
  image: '/images/BwGQ1wfhTy.webp',
  features: [
    { label: '集体备课', description: '每周学科组集体备课，统一教学进度与质量标准' },
    { label: '公开课展示', description: '每学期开展校级、区级公开课及教学比武活动' },
    { label: '课题研究', description: '承担多项省市级教育科研课题，以研促教' },
    { label: '青蓝工程', description: '师徒结对，助力青年教师快速成长' },
    { label: '校本课程', description: '开发具有田中特色的校本选修课程体系，含17门科创校本课程' },
    { label: '教学督导', description: '建立常态化教学督导与质量监测机制' },
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
    avatar: '/teachers/teacher-18.jpg',
  },
  {
    id: 't2',
    name: '周旭良',
    title: '物理骨干教师',
    subject: '物理',
    description:
      '区域优秀骨干科学教师，深耕物理实验教学二十余年。注重培养学生科学思维与创新实践能力，指导学生获全国中学生物理竞赛一等奖3人次，教学风格严谨而不失生动。',
    avatar: '',
  },
  {
    id: 't3',
    name: '岳三鼎',
    title: '化学骨干教师',
    subject: '化学',
    description:
      '区域优秀骨干科学教师，擅长在实验中引导学生探究知识。课堂精彩高效，注重培养学生科学探究精神，指导学生获省级以上化学竞赛奖项40余人次。',
    avatar: '',
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
