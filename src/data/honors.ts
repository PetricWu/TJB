export interface IHonorItem {
  id: string;
  title: string;
  level: '国家级' | '省级' | '市级';
  year?: string;
  issuer?: string;
  note?: string;
}

export const SCHOOL_HONORS: IHonorItem[] = [
  { id: 'nh-defence', title: '全国国防教育示范校', level: '国家级' },
  { id: 'sc-level2', title: '四川省二级示范性普通高中', level: '省级', year: '2018', issuer: '四川省教育厅' },
  { id: 'sc-curriculum', title: '四川省普通高中课程改革省级样本校', level: '省级', issuer: '四川省教育厅' },
  { id: 'sc-schoolwind', title: '四川省校风示范校', level: '省级', issuer: '四川省教育厅' },
  { id: 'sc-law', title: '四川省依法治校示范学校', level: '省级', issuer: '四川省教育厅' },
  { id: 'sc-growth', title: '四川省新成长型学校', level: '省级', issuer: '四川省教育厅' },
  { id: 'sc-sunshine', title: '四川省阳光体育示范学校', level: '省级', issuer: '四川省教育厅' },
  { id: 'cd-teacher', title: '成都市第二批教师发展基地校', level: '市级', issuer: '成都市教育局' },
  { id: 'cd-psy', title: '成都市中小学心理健康教育特色学校', level: '市级', issuer: '成都市教育局' },
  { id: 'cd-intl', title: '成都市教育国际化窗口学校', level: '市级', issuer: '成都市教育局' },
  { id: 'cd-culture', title: '中外人文交流项目特色学校', level: '市级' },
];

const FEATURED_IDS = ['nh-defence', 'sc-level2', 'sc-curriculum', 'sc-sunshine', 'cd-psy', 'cd-intl'];

export const FEATURED_HONORS = SCHOOL_HONORS.filter((honor) => FEATURED_IDS.includes(honor.id));
