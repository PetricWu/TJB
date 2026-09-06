export interface IAdmissionInfo {
  title: string;
  subtitle: string;
  coverImage: string;
  summary: string;
  highlights: { label: string; value: string; description: string; suffix?: string }[];
  requirements: string[];
  contact: {
    address: string;
    phone: string;
    artPhone: string;
    email: string;
    website: string;
    officeHours: string;
  };
}

export interface IAdmissionFaq {
  id: string;
  question: string;
  answer: string;
}

export interface IAdmissionProcess {
  step: number;
  title: string;
  date: string;
  description: string;
  icon: string;
}

export interface IAdmissionFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  highlights: string[];
}

export interface IFacultyStat {
  label: string;
  value: string;
  suffix?: string;
}

export const MOCK_ADMISSION_INFO: IAdmissionInfo = {
  title: '成都市田家炳中学',
  subtitle: '四川省一级示范性普通高中',
  coverImage: '/images/38Bp1wfimz.webp',
  summary:
    '成都市田家炳中学始建于1925年，是四川省一级示范性普通高中、全国国防教育示范校。学校秉承"履仁崇智 明德卓行"校训，坚持"崇实适性，润育心田"办学理念，致力于培养具有家国情怀、科学精神、人文素养和创新能力的优秀学子。2026年成为成都市六年贯通培养试点学校，实现初高中一体化育人。',
  highlights: [
    { label: '办学历史', value: '101', suffix: '年', description: '百年名校，薪火相传' },
    { label: '在校学生', value: '3100', suffix: '余人', description: '初高中两个校区' },
    { label: '专任教师', value: '260', suffix: '余名', description: '师德高尚，业务精湛' },
    { label: '校区占地', value: '57', suffix: '亩', description: '交通便利，环境优美' },
  ],
  requirements: [
    '热爱祖国，拥护中国共产党的领导，品德优良，遵纪守法',
    '身体健康，符合《普通高等学校招生体检工作指导意见》相关要求',
    '初中阶段综合素质评价达到B等及以上',
    '参加成都市中考，成绩达到我校录取分数线',
    '艺体特长生需参加我校专业测试并达到合格标准',
  ],
  contact: {
    address: '成都市锦江区顺江路369号',
    phone: '028-84511688',
    artPhone: '028-84511699',
    email: 'cdtjbzx@163.com',
    website: 'https://tjb.petricw.com',
    officeHours: '工作日 8:00-12:00, 14:30-17:30',
  },
};

export const MOCK_ADMISSION_FEATURES: IAdmissionFeature[] = [
  {
    id: 'f1',
    title: '六年贯通培养',
    subtitle: '初高中一体化育人',
    description: '成都市六年贯通培养试点学校，初高中课程衔接一体化设计，学生发展更连贯。',
    icon: 'graduation-cap',
    highlights: [
      '初高中课程无缝衔接，减少学段转换损耗',
      '六年一贯制培养方案，个性化发展路径',
      '优先享受高中优质教育资源辐射',
    ],
  },
  {
    id: 'f2',
    title: '科创教育特色',
    subtitle: '人工智能与机器人',
    description: '15个高标准实验室，人工智能、机器人、3D打印等科创课程体系完善，竞赛成绩突出。',
    icon: 'cpu',
    highlights: [
      '15个高标准实验室，设备先进',
      '人工智能、机器人、3D打印特色课程',
      '省市科创竞赛屡获佳绩',
    ],
  },
  {
    id: 'f3',
    title: '心理健康教育',
    subtitle: '四川省首批引领校',
    description: '四川省首批中小学心理健康教育引领校，5名专职心理教师，"馨田"心育课程体系。',
    icon: 'heart',
    highlights: [
      '5名专职心理教师，师资雄厚',
      '"馨田"心育课程体系全覆盖',
      '个体辅导与团体辅导结合',
    ],
  },
  {
    id: 'f4',
    title: '国防教育特色',
    subtitle: '全国国防教育示范校',
    description: '全国国防教育示范校，国防教育课程体系完善，学生军事素养和家国情怀全面提升。',
    icon: 'shield',
    highlights: [
      '全国国防教育示范校称号',
      '国防教育课程体系完善',
      '军事训练与爱国主义教育结合',
    ],
  },
  {
    id: 'f5',
    title: '艺体教育成果',
    subtitle: '四川省艺术教育特色校',
    description: '四川省艺术教育特色学校，体育传统项目学校，学生艺体素养全面发展，竞赛成绩优异。',
    icon: 'palette',
    highlights: [
      '四川省艺术教育特色学校',
      '体育传统项目学校',
      '省市级艺体竞赛成绩优异',
    ],
  },
  {
    id: 'f6',
    title: '师资力量雄厚',
    subtitle: '名师领航，精益求精',
    description: '正高级教师、特级教师、省市学科带头人领衔，90%以上高三教师具有丰富毕业班教学经验。',
    icon: 'users',
    highlights: [
      '正高级教师、特级教师领衔',
      '省市学科带头人26名',
      '90%以上教师具有毕业班经验',
    ],
  },
];

export const MOCK_ADMISSION_PROCESS: IAdmissionProcess[] = [
  {
    step: 1,
    title: '政策发布',
    date: '5月中旬',
    description: '发布当年招生计划、招生简章及相关政策，考生和家长可通过学校官网、微信公众号查询。',
    icon: 'file-text',
  },
  {
    step: 2,
    title: '咨询开放日',
    date: '5月下旬',
    description: '举办校园开放日活动，欢迎考生和家长到校参观，了解学校办学特色和招生政策。',
    icon: 'calendar',
  },
  {
    step: 3,
    title: '网上报名',
    date: '6月中旬',
    description: '考生在成都市中考网上报名系统填报志愿，统招生、调剂生、艺体特长生分类填报。',
    icon: 'edit',
  },
  {
    step: 4,
    title: '专业测试',
    date: '6月下旬',
    description: '报考艺体特长生的考生参加我校组织的专业测试，测试合格者方可填报我校艺体志愿。',
    icon: 'award',
  },
  {
    step: 5,
    title: '录取查询',
    date: '7月上旬',
    description: '成都市教育局统一组织录取，考生可通过学校官网或成都市中考网络应用服务平台查询录取结果。',
    icon: 'check-circle',
  },
  {
    step: 6,
    title: '新生报到',
    date: '7月中旬',
    description: '被录取的考生按通知书要求到校报到注册，办理入学手续，领取入学须知和军训安排。',
    icon: 'user-check',
  },
];

export const MOCK_ADMISSION_FAQ: IAdmissionFaq[] = [
  {
    id: 'faq1',
    question: '学校今年的招生计划是多少？',
    answer:
      '我校2026年高中计划招生12个班，共540人，其中统招生486人，调剂生54人。初中计划招生8个班，共360人。具体招生计划以成都市教育局正式公布为准。',
  },
  {
    id: 'faq2',
    question: '学校有哪些特色班型？',
    answer:
      '我校高中设有"火箭班"、"实验班"、"科创班"、"国防班"等特色班型，根据学生中考成绩和综合素质进行分层分类培养。其中科创班侧重人工智能与科技创新教育，国防班侧重国防教育与军事素养培养。',
  },
  {
    id: 'faq3',
    question: '艺体特长生如何报考？',
    answer:
      '艺体特长生需先参加我校组织的专业测试，测试合格后在中考志愿中填报我校艺体特长生志愿。招生项目包括：美术、音乐、舞蹈、体育（田径、篮球、足球等）。具体招生项目和人数以当年招生简章为准。',
  },
  {
    id: 'faq4',
    question: '学校是否为寄宿制学校？',
    answer:
      '我校为走读制学校，不提供住宿。学生每日到校上课，放学后由家长接回。学校特别重视走读学生的安全管理，放学后提供晚自习辅导（自愿参加），由任课教师或班主任值守，确保学生在校期间的安全和学习质量。',
  },
  {
    id: 'faq5',
    question: '学校的伙食怎么样？',
    answer:
      '学校食堂建筑面积3000余平方米，可同时容纳2000余人就餐。食堂菜品丰富，营养搭配合理，提供套餐、面食、小吃等多种选择，满足不同口味需求。严格执行食品安全管理制度，确保师生饮食安全。',
  },
  {
    id: 'faq6',
    question: '学校的交通是否便利？',
    answer:
      '学校位于成都市锦江区顺江路369号，交通十分便利。地铁6号线、13号线三官堂站A口出站50米即达，公交3路、18路、56路、68路、77路、82路、106路、1107路等多条线路直达学校门口。',
  },
  {
    id: 'faq7',
    question: '学校是否有奖学金和助学金政策？',
    answer:
      '学校设有"田家炳奖学金"、"校长奖学金"等多项奖学金，奖励品学兼优的学生。同时对家庭经济困难学生提供助学金，确保每一位学生都能顺利完成学业。具体政策可咨询学校学生处。',
  },
  {
    id: 'faq8',
    question: '如何获取最新的招生信息？',
    answer:
      '考生和家长可通过以下方式获取最新招生信息：1. 学校官网（tjb.petricw.com）招生专栏；2. 学校官方微信公众号"成都市田家炳中学"；3. 拨打招生咨询电话028-84511688；4. 参加校园开放日活动。',
  },
];

export const MOCK_ADMISSION_FACULTY_STATS: IFacultyStat[] = [
  { label: '正高级教师', value: '8', suffix: '人' },
  { label: '特级教师', value: '12', suffix: '人' },
  { label: '省市学科带头人', value: '26', suffix: '人' },
  { label: '高级教师', value: '98', suffix: '人' },
  { label: '硕士及以上学历', value: '65', suffix: '%' },
  { label: '中高级教师占比', value: '85', suffix: '%' },
];


