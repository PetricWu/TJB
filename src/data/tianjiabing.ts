/**
 * 田家炳专题数据层
 *
 * 事实红线：田家炳博士生平、基金会规模、里程碑、我校渊源等均以
 * 田家炳基金会官网（tinkaping.org / tianjiabing.cn）及权威媒体报道为准，
 * 禁止编造；页尾设「资料来源」区块逐条溯源。
 */

export interface ITkpProfile {
  name: string;
  englishName: string;
  lifespan: string;
  birthplace: string;
  titles: string[];
  story: string[];
}

export interface ITkpQuote {
  text: string;
  context: string;
}

export interface ITkpStat {
  label: string;
  value: string;
  suffix?: string;
  description: string;
}

export interface ITkpMilestone {
  year: string;
  title: string;
  description: string;
}

export interface ISchoolBond {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface ISpiritItem {
  title: string;
  content: string;
}

export interface ISourceItem {
  label: string;
  url: string;
  note?: string;
}

/** 田家炳博士生平 */
export const MOCK_TKP_PROFILE: ITkpProfile = {
  name: '田家炳',
  englishName: 'Tin Ka Ping',
  lifespan: '1919 — 2018',
  birthplace: '祖籍广东大埔',
  titles: ['香港实业家', '慈善家', '田家炳基金会创办人', '"中国百校之父"'],
  story: [
    '田家炳博士（1919—2018），祖籍广东省大埔县，香港著名实业家、慈善家。他白手兴家，创办实业，被誉为享誉港澳台及东南亚地区的"人造革大王"。',
    '1982年，本着"留财予子孙不如积德予后代"的中华传统美德，田家炳博士捐资创办「田家炳基金会」，专事捐办教育、医疗、交通、文娱等公益事业，泽荫两岸四地。',
    '他一生奉行节俭，却倾其所有兴学育才，捐资遍及全国34省市区，累计捐资逾10亿港元，其中九成投向教育事业，被誉为"中国百校之父"。',
    '2009年，田博士将名下全部物业转赠基金会，并广邀社会贤达参与基金会管治，自己退任为无决策权、无投票权的荣誉主席。2018年，田家炳博士与世长辞，其"兴学育才"的教育情怀长留人间。',
  ],
};

/** 名言（广为传诵的教育信念） */
export const MOCK_TKP_QUOTES: ITkpQuote[] = [
  { text: '中国的希望在教育。', context: '田家炳博士毕生信念' },
  { text: '宁可实而不华，不可华而不实。', context: '田家炳博士座右铭，亦为我校校训精神之源' },
  { text: '留财予子孙，不如积德予后代。', context: '捐资创办田家炳基金会之初衷' },
];

/** 基金会捐学规模数字统计带 */
export const MOCK_TKP_STATS: ITkpStat[] = [
  { label: '覆盖省市区', value: '34', suffix: '个', description: '捐资先从香港开始，后惠及广东并延伸至全国' },
  { label: '资助大学', value: '93', suffix: '所', description: '含各省市区师范大学田家炳教育书院' },
  { label: '资助中学', value: '163', suffix: '所', description: '田家炳中学遍布全国，我校为其中之一' },
  { label: '资助小学', value: '42', suffix: '所', description: '基础教育全学段覆盖' },
  { label: '专业学校及幼稚园', value: '20', suffix: '所', description: '学前教育与职业教育并举' },
  { label: '乡村学校图书室', value: '1800', suffix: '余间', description: '把书香送到最需要的地方' },
];

/** 基金会发展时间轴（据基金会官网《历史与简介》） */
export const MOCK_TKP_MILESTONES: ITkpMilestone[] = [
  { year: '1982', title: '田家炳基金会成立', description: '在香港注册成立非牟利慈善机构，资金来源全部为田家炳博士个人及其家族公司之捐献，以「兴学育才，推广文教，回馈社会，贡献国家」为创会宗旨。' },
  { year: '1983', title: '首所捐办命名学校', description: '第一所捐办的命名学校「救世军田家炳学校」落成，开启田家炳命名学校之先河。' },
  { year: '1984', title: '大埔县家炳第一中学启用', description: '「广东省大埔县家炳第一中学」启用，田家炳博士反哺家乡教育。' },
  { year: '1987', title: '捐办香港仁爱堂田家炳中学', description: '捐办「香港仁爱堂田家炳中学」，深耕香港基础教育（该校后与我校结为友好学校）。' },
  { year: '1994', title: '新界粉岭田家炳中学', description: '获香港政府批准，在新界粉岭主办一所全新中学，命名为「田家炳中学」。' },
  { year: '2009', title: '全数物业转赠基金会', description: '田博士将名下全部物业转赠基金会，广邀社会贤达参与管治，自己退任荣誉主席。' },
  { year: '2010', title: '基金会管治转型', description: '邀请本港九所大学校长／代表及多位社会俊彦加入咨议局及董事局，更新使命为「促进道德教育、弘扬中华文化、融合世界文明，以提升中国教育素质，贡献国家」。' },
  { year: '2017', title: '广州注册成立代表处', description: '在广州注册成立代表处并获国家教育部出任业务主管单位；2020年获教育部评为「卓越合作伙伴」。' },
];

/** 我校与田家炳 */
export const MOCK_SCHOOL_BONDS: ISchoolBond[] = [
  {
    id: 'bond-2003',
    year: '2003',
    title: '捐资更名，落地成都',
    description: '香港爱国慈善家、实业家田家炳先生向学校捐赠250万元办学资金。经成都市教育局批准，"成都市第十九中学"正式更名为成都市田家炳中学，成为全国166所田家炳系列学校之一。',
  },
  {
    id: 'bond-motto',
    year: '办学理念',
    title: '履仁崇智　明德卓行',
    description: '学校传承田家炳先生"宁可实而不华，不可华而不实"的精神，确立"履仁崇智，明德卓行"的办学思想，坚持"崇实适性，润育心田"的办学理念。',
  },
  {
    id: 'bond-ai',
    year: '2025',
    title: 'AI 创新实验班',
    description: '在百年校庆之际成立 AI 创新实验班，与香港田家炳基金会深度合作，对接全国顶尖教育资源。全国田家炳学校中，仅上海、成都两地开设该实验班。',
  },
  {
    id: 'bond-friend',
    year: '友好学校',
    title: '香港仁爱堂田家炳中学',
    description: '与香港仁爱堂田家炳中学结为友好学校，开展师生互访与文化交流，延续田家炳基金会"两岸四地兴学育才"的愿景。',
  },
];

/** 精神传承 */
export const MOCK_TKP_SPIRIT: ISpiritItem[] = [
  { title: '爱国', content: '从"五卅"爱国运动中创校，到田家炳博士"中国的希望在教育"的信念，家国情怀始终是田中人最鲜明的底色。' },
  { title: '勤俭', content: '田家炳博士一生节俭，却倾其所有兴学育才；学校以"朴实无华、坚毅向上"为校风，让勤俭成为师生共同的修养。' },
  { title: '廉洁', content: '"宁可实而不华，不可华而不实"——务实求真、清正自守，是田家炳精神留给每一位田中人最珍贵的品格教育。' },
];

/** 资料来源区块 */
export const MOCK_TKP_SOURCES: ISourceItem[] = [
  {
    label: '田家炳基金会《历史与简介》',
    url: 'https://www.tinkaping.org/history/?lang=zh-hans',
    note: '基金会成立、捐学规模（34省市区／大学93／中学163／小学42／专业及幼稚园20／图书室1800余间）、1983—2017里程碑',
  },
  {
    label: '田家炳基金会《创办人简介》',
    url: 'https://www.tianjiabing.cn/tinkaping/?lang=zh-hans',
    note: '田家炳博士生平、1982年创办基金会、2009年物业转赠',
  },
  {
    label: '本站《学校概况·校史沿革》',
    url: '/about',
    note: '2003年捐资250万元更名、全国166所田家炳系列学校之一',
  },
  {
    label: '看度新闻（成都广播电视台）百年校庆报道',
    url: 'http://www.cditv.cn/show/4848-2380447.html',
    note: '百年办学成果展暨西部田家炳中学年会',
  },
];
