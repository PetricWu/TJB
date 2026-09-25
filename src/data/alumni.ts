/**
 * 校友风采数据层
 *
 * 事实红线：所有人物、事迹、称号均须可溯源，禁止虚构。
 *  - 创校先贤陶亮生、文百川：定位为「创校先贤／名师」，不称校友。
 *  - 校友代表李世麟：1953 年入读，后任原成都市第十九中学校长。
 *  - 无法溯源的人物一律不收录。
 */

export interface IAlumniFigure {
  id: string;
  name: string;
  /** 人物定位：创校先贤 / 校友代表 */
  role: string;
  /** 时代／年代 */
  era: string;
  /** 身份标签 */
  identity: string;
  /** 主体介绍 */
  description: string;
  /** 代表性细节（可溯源的事实片段） */
  highlight?: string;
  /** 头像（无则用姓名首字占位） */
  avatar?: string;
}

export interface IAlumniNewsRef {
  /** 对应 merged-articles 中的文章 id */
  articleId: string;
  /** 展示标题 */
  title: string;
  /** 一句话说明 */
  note: string;
}

export interface ISourceItem {
  label: string;
  url: string;
  note?: string;
}

export const MOCK_ALUMNI_INTRO = {
  title: '校友风采',
  subtitle: '弦歌百年 · 桃李满城',
  description:
    '从1925年的成城公学到今天的成都市田家炳中学，一批批师长在此传道授业，一代代学子从锦江之滨走向山海四方。他们或以教育为毕生志业，或在各行各业默默耕耘，共同写就了这所百年学府"众志成城、仁爱育人"的精神底色。本页收录可溯源的创校先贤与校友代表，并以百年校庆为窗口，回望田中人的教育情怀与精神守望。',
};

/** 创校先贤（名师，不称校友） */
export const MOCK_ALUMNI_FOUNDERS: IAlumniFigure[] = [
  {
    id: 'founder-tao',
    name: '陶亮生',
    role: '创校先贤',
    era: '1925 · 建校初期',
    identity: '成城公学创办人之一、校长',
    description:
      '1925年，举国爆发"五卅"反帝爱国运动，陶亮生与文百川等爱国知识分子怀着教育救国的理想，在成都创办了成城公学，校名取自"众志成城，公学兴国"。他毕生致力于教育事业，是这所百年学府的奠基人之一。',
    highlight:
      '与文百川同被誉为当时成都教育界的"黑白二将军"，以教育为火种，照亮了成都田中最初的征程。2025年百年校庆，陶亮生校长次子陶大章、孙女陶映宇等亲属代表莅临现场，学校受赠陶亮生校长的校史实物。',
  },
  {
    id: 'founder-wen',
    name: '文百川',
    role: '创校先贤',
    era: '1925 · 建校初期',
    identity: '成城公学创办人之一',
    description:
      '早年毕业于成都高等师范学校（今四川大学前身），曾受业于蜀中硕儒林山腴、龚道耕、向楚门下，毕生致力于教育事业，在四川教育界享有盛誉，历任成都石室中学等多所中学语文教师及四川大学教授。',
    highlight:
      '娴于辞章，精于语文教学，与陶亮生同被称为成都教育界"黑白二将军"。2025年百年校庆，文百川侄女文瑶、长孙杨和生等亲属代表莅临现场，分享先辈的教育故事与家国情怀。',
  },
];

/** 校友代表 */
export const MOCK_ALUMNI_REPRESENTATIVES: IAlumniFigure[] = [
  {
    id: 'alumni-li',
    name: '李世麟',
    role: '校友代表',
    era: '1953 年入读',
    identity: '原成都市第十九中学校长',
    description:
      '1953年成为田中学子，受老师影响立志从教，毕业后回校任教并担任校长，见证并推动了学校的发展。他在百年校庆上动情讲述自己的求学与从教故事，感恩母校培育。',
    highlight:
      '从田中学子到掌舵母校，坚实的足迹铺就学校发展路——这是"受教于此、反哺于此"最生动的注脚。',
  },
];

/** 百年校庆回眸：引用站内「校庆专题」文章（复用 ArticleCard / merged-articles） */
export const MOCK_ALUMNI_NEWS: IAlumniNewsRef[] = [
  {
    articleId: '0ol4DU9TIzB1dFq9luhrpw',
    title: '百年成城炳新程　弦歌不辍育英才',
    note: '建校100周年庆祝大会隆重举行，各界校友、师生代表齐聚一堂，共庆百年华诞。',
  },
];

/** 资料来源区块（每条均可溯源） */
export const MOCK_ALUMNI_SOURCES: ISourceItem[] = [
  {
    label: '看度新闻（成都广播电视台）《百年成城炳新程　弦歌不辍育英才》',
    url: 'http://www.cditv.cn/show/4848-2380447.html',
    note: '创校先贤陶亮生、文百川"黑白二将军"称号；校友代表李世麟事迹',
  },
  {
    label: '人民网四川《成都市田家炳中学举行百年办学成果展》',
    url: 'http://sc.people.com.cn/n2/2025/1209/c345167-41436477.html',
    note: '创校先贤后代分享教育故事，学校受赠陶亮生校长校史实物',
  },
  {
    label: '川观新闻《C视觉丨成都：这所学校迎来百岁生日》',
    url: 'https://cbgc.scol.com.cn/news/7034599',
    note: '"百年成城　炳新而行"百年校庆系列活动',
  },
  {
    label: '本站《学校概况·校史沿革》',
    url: '/about',
    note: '创校与更名史实（1925年成城公学创办等）',
  },
];
