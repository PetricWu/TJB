/**
 * 联系我们与校园地图数据层
 *
 * 事实红线：电话全站统一 028-84551880（不出现教务处/艺体专线等旧号码）；
 * 双校区地址格式统一为「锦江区工农院街69号（莲新片区）」「锦江区顺江路369号」。
 * 地图用高德/百度深链按钮 + 校园图片，不用 iframe（受站点 CSP default-src 'self' 限制）。
 */

export interface IContactInfo {
  phone: string;
  email: string;
  postcode: string;
  officeHours: string;
  website: string;
}

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

export const MOCK_CONTACT_INTRO = {
  title: '联系我们',
  subtitle: '锦江之滨　恭候莅临',
  description:
    '成都市田家炳中学坐落于锦江之滨，分设高中部、初中部两个校区，交通便利、环境优美。欢迎各界人士、家长与校友来电来函，或莅临参观指导。',
};

/** 基础联系方式（全站统一口径） */
export const MOCK_CONTACT: IContactInfo = {
  phone: '028-84551880',
  email: 'cdtjbzx@163.com',
  postcode: '610061',
  officeHours: '工作日 08:30 — 17:30',
  website: 'www.tjbzx.com',
};

/** 两个校区 */
export const MOCK_CAMPUSES: ICampus[] = [
  {
    id: 'campus-senior',
    name: '高中部',
    stage: '高中',
    address: '锦江区顺江路369号',
    mapKeyword: '成都市田家炳中学 高中部 顺江路369号',
    description: '学校主校区，坐落于锦江北岸三官堂片区，与四川大学隔江相望，占地约57亩（含初中部），校舍建筑面积45940余平方米。',
    amapUrl: 'https://uri.amap.com/search?keyword=%E6%88%90%E9%83%BD%E5%B8%82%E7%94%B0%E5%AE%B6%E7%82%B3%E4%B8%AD%E5%AD%A6%E9%A1%BA%E6%B1%9F%E8%B7%AF369%E5%8F%B7',
    baiduUrl: 'https://map.baidu.com/search/%E6%88%90%E9%83%BD%E5%B8%82%E7%94%B0%E5%AE%B6%E7%82%B3%E4%B8%AD%E5%AD%A6/@12797744.28,3582823.55,12z',
  },
  {
    id: 'campus-junior',
    name: '初中部',
    stage: '初中',
    address: '锦江区工农院街69号（莲新片区）',
    mapKeyword: '成都市田家炳中学 初中部 工农院街69号',
    description: '初中部校区，位于锦江区莲新片区工农院街69号，2007—2008年学校整合莲新中学、锦江育才中学后形成一校两区格局。',
    amapUrl: 'https://uri.amap.com/search?keyword=%E6%88%90%E9%83%BD%E5%B8%82%E7%94%B0%E5%AE%B6%E7%82%B3%E4%B8%AD%E5%AD%A6%E5%B7%A5%E5%86%9C%E9%99%A2%E8%A1%9769%E5%8F%B7',
    baiduUrl: 'https://map.baidu.com/search/%E6%88%90%E9%83%BD%E5%B8%82%E7%94%B0%E5%AE%B6%E7%82%B3%E4%B8%AD%E5%AD%A6',
  },
];

/** 交通指引（高中部；公交线路不确认不写） */
export const MOCK_TRANSPORT: ITransport[] = [
  {
    id: 'transport-metro',
    mode: '地铁',
    title: '地铁6号线／13号线',
    detail: '乘坐地铁6号线或13号线至「三官堂」站，A口出站步行约50米即达高中部。',
  },
  {
    id: 'transport-bus',
    mode: '公交',
    title: '三官堂／顺江路沿线',
    detail: '多条公交线路途经三官堂、顺江路一带，可在「三官堂」或「顺江路」公交站下车步行前往。',
  },
  {
    id: 'transport-drive',
    mode: '自驾',
    title: '导航至「成都市田家炳中学」',
    detail: '自驾车可导航至「成都市田家炳中学高中部」（顺江路369号）或「初中部」（工农院街69号），学校周边有公共交通与慢行系统接驳。',
  },
];

/** 相关链接 */
export const MOCK_CONTACT_LINKS: IContactLink[] = [
  { label: "查看2026年招生信息", path: '/admission' },
  { label: '了解学校概况', path: '/about' },
  { label: '浏览校园新闻', path: '/news' },
  { label: '田家炳专题', path: '/tianjiabing' },
];

/** 资料来源 */
export const MOCK_CONTACT_SOURCES: ISourceItem[] = [
  { label: '本站《招生招聘》联系方式', url: '/admission', note: '电话、邮箱、办公时间等口径' },
  { label: '本站《学校概况》基本信息', url: '/about', note: '双校区地址、校区面积、校舍建筑面积' },
];
