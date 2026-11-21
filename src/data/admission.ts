import { SCHOOL_FACTS, yearsSinceFounded } from './school-facts';

/** 招生监督电话（学校公布口径，SCHOOL_FACTS 未收录） */
const SUPERVISION_PHONE = '028-84551399';

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
    email: string;
    website: string;
    officeHours: string;
    postcode: string;
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
  subtitle: '四川省二级示范性普通高中',
  coverImage: '/images/38Bp1wfimz.webp',
  summary:
    '成都市田家炳中学始建于1925年，是四川省二级示范性普通高中（已通过四川省一级示范性普通高中现场评审）、全国国防教育示范校、成都七中教育集团成员学校。学校秉承"履仁崇智 明德卓行"办学思想，坚持"崇实适性，润育心田"办学理念，构建"三实"课堂和"四实"课程体系，连续多年实现"中进高出、高进优出"。',
  highlights: [
    { label: '办学历史', value: String(yearsSinceFounded()), suffix: '年', description: '百年名校，薪火相传' },
    { label: '在校学生', value: String(SCHOOL_FACTS.students), suffix: '余人', description: '初高中两个校区' },
    { label: '教职工', value: String(SCHOOL_FACTS.staff), suffix: '人', description: '师德高尚，业务精湛' },
    { label: '校区占地', value: String(SCHOOL_FACTS.campusAreaMu), suffix: '亩', description: '交通便利，环境优美' },
  ],
  requirements: [
    '热爱祖国，拥护中国共产党的领导，品德优良，遵纪守法',
    '身体健康，符合《普通高等学校招生体检工作指导意见》相关要求',
    '初中阶段综合素质评价达到B等及以上',
    '参加成都市中考，成绩达到我校录取分数线',
    '艺体特长生需参加我校专业测试并达到合格标准',
  ],
  contact: {
    address: `初中部：${SCHOOL_FACTS.juniorAddress}（莲新片区）；高中部：${SCHOOL_FACTS.seniorAddress}`,
    phone: SCHOOL_FACTS.phone,
    email: 'cdtjbzx@163.com',
    website: 'https://tjb.petricw.com',
    officeHours: '工作日 8:00-12:00, 14:30-17:30',
    postcode: '610061',
  },
};

export const MOCK_ADMISSION_FEATURES: IAdmissionFeature[] = [
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
    subtitle: '成都市特色学校',
    description: '成都市中小学心理健康教育特色学校，5名专职心理教师，"馨田"心育课程体系。',
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
      '省市学科带头人16名',
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

export interface IAdmissionScore {
  year: string;
  unifiedScore: string;
  adjustScore: string;
  position?: string;
}

export const MOCK_ADMISSION_SCORES: IAdmissionScore[] = [
  { year: '2026', unifiedScore: '594', adjustScore: '593', position: '9610' },
  { year: '2025', unifiedScore: '594', adjustScore: '593', position: '9354' },
  { year: '2024', unifiedScore: '579', adjustScore: '573' },
  { year: '2023', unifiedScore: '593', adjustScore: '592' },
  { year: '2022', unifiedScore: '591', adjustScore: '591' },
];

export const MOCK_ADMISSION_FAQ: IAdmissionFaq[] = [
  {
    id: 'faq-area',
    question: '学校面向哪些区域招生？',
    answer:
      '学校高中面向成都市「5+2」区域招生。具体招生区域与志愿设置，以当年成都市教育局公布的中考政策为准。',
  },
  {
    id: 'faq-plan',
    question: '学校今年的招生计划是多少？',
    answer:
      '2025年高中招收550名，其中统招475名（含指标到校生238名），调剂生75名。每年招生计划以成都市教育局正式公布为准。',
  },
  {
    id: 'faq-boarding',
    question: '学校提供住校吗？',
    answer: SCHOOL_FACTS.boarding
      ? '学校可为部分学生提供住校，具体安排请咨询学校。'
      : '学校为走读制，不提供住校，学生每日到校上课、放学后回家。',
  },
  {
    id: 'faq-phone',
    question: '招生咨询电话是多少？',
    answer: `学校办公室 ${SCHOOL_FACTS.phone}，招生咨询 ${SCHOOL_FACTS.admissionPhone}，招生监督 ${SUPERVISION_PHONE}。建议在工作日办公时间来电。`,
  },
  {
    id: 'faq-class',
    question: '学校高中的班型如何设置？',
    answer:
      '高中设置实验班与平行班，依据学生学业基础与发展需要组织教学，实行分层分类的差异化教学策略。',
  },
  {
    id: 'faq-quota',
    question: '指标到校生如何录取？',
    answer:
      '指标到校按成都市教育局当年政策执行，名额分配、资格条件与录取办法以当年公布的细则为准。',
  },
];

/** 招生咨询电话（学校办公室 / 招生咨询 / 招生监督） */
export const ADMISSION_PHONES: { label: string; value: string }[] = [
  { label: '学校办公室', value: SCHOOL_FACTS.phone },
  { label: '招生咨询', value: SCHOOL_FACTS.admissionPhone },
  { label: '招生监督', value: SUPERVISION_PHONE },
];

export interface IAdmissionPlan {
  year: string;
  rows: { label: string; count: number; note: string }[];
  total: number;
  note: string;
}

/** 2025年高中招生计划结构 */
export const MOCK_ADMISSION_PLAN: IAdmissionPlan = {
  year: '2025',
  rows: [
    { label: '统招生', count: 475, note: '含指标到校生 238 名' },
    { label: '调剂生', count: 75, note: '面向成都市「5+2」区域' },
  ],
  total: 550,
  note: '数据来源：2025年成都市高中阶段教育学校统一招生计划。每年招生计划与结构以成都市教育局正式公布为准。',
};

export const MOCK_ADMISSION_FACULTY_STATS: IFacultyStat[] = [
  { label: '正高级教师', value: '3', suffix: '人' },
  { label: '特级教师', value: '14', suffix: '人' },
  { label: '省市学科带头人', value: '16', suffix: '人' },
  { label: '高级教师', value: '98', suffix: '人' },
  { label: '硕士及以上学历', value: '65', suffix: '%' },
  { label: '中高级教师占比', value: '85', suffix: '%' },
];

// ===== 校园地图与联系信息（原「联系我们」页数据层，现并入招生招聘页） =====

export interface ICampus {
  id: string;
  name: string;
  /** 学段 */
  stage: string;
  address: string;
  /** 地图检索关键词 */
  mapKeyword: string;
  description: string;
  /** 高德地图深链 */
  amapUrl: string;
  /** 百度地图深链 */
  baiduUrl: string;
  /** 校园图片 */
  image?: string;
}

export interface ITransport {
  id: string;
  mode: string;
  title: string;
  detail: string;
}

export interface IContactLink {
  label: string;
  path: string;
}

export interface ISourceItem {
  label: string;
  url: string;
  note?: string;
}

/** 两个校区 */
export const MOCK_CAMPUSES: ICampus[] = [
  {
    id: 'campus-senior',
    name: '高中部',
    stage: '高中',
    address: SCHOOL_FACTS.seniorAddress,
    mapKeyword: '成都市田家炳中学 高中部 顺江路369号',
    description: '学校主校区，坐落于锦江北岸三官堂片区，与四川大学隔江相望，占地约46.24亩（含初中部），校舍建筑面积约26386平方米。',
    amapUrl: 'https://uri.amap.com/search?keyword=%E6%88%90%E9%83%BD%E5%B8%82%E7%94%B0%E5%AE%B6%E7%82%B3%E4%B8%AD%E5%AD%A6%E9%A1%BA%E6%B1%9F%E8%B7%AF369%E5%8F%B7',
    baiduUrl: 'https://map.baidu.com/search/%E6%88%90%E9%83%BD%E5%B8%82%E7%94%B0%E5%AE%B6%E7%82%B3%E4%B8%AD%E5%AD%A6/@12797744.28,3582823.55,12z',
  },
  {
    id: 'campus-junior',
    name: '初中部',
    stage: '初中',
    address: `${SCHOOL_FACTS.juniorAddress}（莲新片区）`,
    mapKeyword: '成都市田家炳中学 初中部 工农院街69号',
    description: '初中部校区，位于锦江区莲新片区工农院街69号，2007—2008年学校整合莲新中学、锦江育才中学后形成一校两区格局。',
    amapUrl: 'https://uri.amap.com/search?keyword=%E6%88%90%E9%83%BD%E5%B8%82%E7%94%B0%E5%AE%B6%E7%82%B3%E4%B8%AD%E5%AD%A6%E5%B7%A5%E5%86%9C%E9%99%A2%E8%A1%9769%E5%8F%B7',
    baiduUrl: 'https://map.baidu.com/search/%E6%88%90%E9%83%BD%E5%B8%82%E7%94%B0%E5%AE%B6%E7%82%B3%E4%B8%AD%E5%AD%A6',
  },
];

/** 交通指引（高中部；具体出口与步行距离未经核实，不写） */
export const MOCK_TRANSPORT: ITransport[] = [
  {
    id: 'transport-metro',
    mode: '地铁',
    title: '地铁6号线／13号线',
    detail: '乘坐地铁6号线或13号线至「三官堂」站，出站即到三官堂站附近的高中部（顺江路369号）。',
  },
  {
    id: 'transport-bus',
    mode: '公交',
    title: '三官堂／顺江路沿线',
    detail: '在三官堂站可换乘公交前往学校；顺江路沿线亦有多条公交线路途经，具体线路以实际运营为准。',
  },
  {
    id: 'transport-drive',
    mode: '自驾',
    title: '导航至「成都市田家炳中学」',
    detail: '自驾可导航至高中部（顺江路369号）或初中部（工农院街69号），学校周边有公共交通与慢行系统接驳。',
  },
];

/** 相关链接（去掉自指当前页的条目） */
export const MOCK_CONTACT_LINKS: IContactLink[] = [
  { label: '了解学校概况', path: '/about' },
  { label: '浏览校园新闻', path: '/news' },
  { label: '田家炳专题', path: '/tianjiabing' },
  { label: '校友风采', path: '/alumni' },
];

/** 资料来源 */
export const MOCK_CONTACT_SOURCES: ISourceItem[] = [
  { label: '本站《招生招聘》报名条件与联系方式', url: '/admission#contact', note: '电话、邮箱、办公时间等口径' },
  { label: '本站《学校概况》基本信息', url: '/about', note: '双校区地址、校区面积、校舍建筑面积' },
];


