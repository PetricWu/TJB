/**
 * 百年田中（建校百年）数据层
 *
 * 事实红线：百年历程、人物、荣誉等内容以 2025 年 12 月
 * 《公学成城 百年田中——成都市田家炳中学建校一百周年纪念》画册为准；
 * 校庆活动信息以权威媒体报道（人民网四川频道、川观新闻、看度新闻）补充；
 * 校史细段与《学校概况》页互链不重复；页尾「资料来源」逐条溯源。
 * 画册辨识存疑处（如 1952 年校名）已注明「以学校档案为准」。
 */

export interface ICentenaryTheme {
  label: string;
  value: string;
}

export interface ICentenaryStat {
  value: string;
  suffix?: string;
  label: string;
  description: string;
}

export interface ICentenaryMilestone {
  year: string;
  title: string;
  description: string;
}

export interface ICentenaryWriting {
  title: string;
  subtitle?: string;
  excerpt: string;
  note: string;
}

export interface ICentenaryPerson {
  name: string;
  meta: string;
  tribute?: string;
}

export interface ICentenaryPersonGroup {
  title: string;
  desc: string;
  people: ICentenaryPerson[];
}

export interface ICentenaryFeature {
  title: string;
  desc: string;
}

export interface ICentenaryHonor {
  name: string;
  issuer?: string;
}

export interface ICentenaryGala {
  date: string;
  title: string;
  desc: string;
  highlights: string[];
}

export interface ISourceItem {
  label: string;
  url: string;
  note?: string;
}

/** 百年主题 */
export const CENTENARY_THEME = {
  title: '公学成城　百年田中',
  years: '1925 — 2025',
  subtitle: '成都市田家炳中学百年华诞',
  thought: '履仁崇智　明德卓行',
};

/** 校训与三风 */
export const CENTENARY_MOTTO: ICentenaryTheme[] = [
  { label: '校训', value: '养仁爱之心　塑智慧人生' },
  { label: '校风', value: '朴实无华　坚毅向上' },
  { label: '教风', value: '育德启智　务滋尚实' },
  { label: '学风', value: '致品励学　求仁强智' },
];

/** 百年数字带 */
export const CENTENARY_STATS: ICentenaryStat[] = [
  { value: '1925', label: '肇始之年', description: '成城公学于东马棚街创立，开启百年办学历程' },
  { value: '100', suffix: '载', label: '弦歌不辍', description: '四易其名、薪火相传，2025 年迎来建校百年' },
  { value: '2', suffix: '校区', label: '双璧辉映', description: '高中部坐落于锦江北岸，初中部毗邻莲馨片区' },
  { value: '260', suffix: '余名', label: '教职工', description: '结构合理、素质优良的师资队伍（以学校官方发布为准）' },
];

/** 校名沿革时间轴（画册《百年历路 世纪跫音》） */
export const CENTENARY_MILESTONES: ICentenaryMilestone[] = [
  { year: '1925', title: '成城公学创立', description: '在东马棚街创立「成城公学」，取「众志成城」之意，是为百年办学之始。创校先贤陶亮生、文百川等以「教育救国」为志，开启民智。' },
  { year: '1937', title: '迁址三官堂街', description: '学校迁址三官堂街（即今高中部所在地），与锦江、川大为邻，办学规模逐步扩大。' },
  { year: '1952', title: '政府接办更名', description: '学校由政府接办并调整更名（画册标注为「成都市第九初级中学」，校名以学校档案为准）。' },
  { year: '1957', title: '更名成都市第十九中学', description: '学校更名为「成都市第十九中学」，进入新中国基础教育发展的新阶段。' },
  { year: '1962', title: '改名四川大学附属中学', description: '学校改名为「四川大学附属中学」，依托高校资源提升办学水平。' },
  { year: '1963', title: '恢复第十九中学校名', description: '学校更名为「成都市第十九中学」，此后数十年间以「十九中」之名深耕教坛。' },
  { year: '2003', title: '更名成都市田家炳中学', description: '香港实业家、慈善家田家炳先生捐资修建学校，学校更名为「成都市田家炳中学」，成为全国田家炳系列学校之一。' },
  { year: '2007', title: '合并莲新中学', description: '整合区域教育资源，莲新中学并入，办学规模进一步扩大。' },
  { year: '2008', title: '合并锦江育才中学', description: '锦江育才中学并入，形成高中部、初中部双校区办学格局。' },
  { year: '2025', title: '建校百年', description: '12 月 5 日，「百年成城 炳新而行」百年办学成果展暨西部田家炳中学年会隆重举行，四方校友共襄盛典。' },
];

/** 文脉篇章（画册《百秩寄语》《田中赋》《百年成城 炳新而行》） */
export const CENTENARY_WRITINGS: ICentenaryWriting[] = [
  {
    title: '百年成城　炳新而行',
    subtitle: '建校百年主题文（学校党委书记、校长罗秀云联署）',
    excerpt:
      '绵水悠悠，流光千载；田中熠熠，美誉百年。于悠悠锦江河畔，一所深耕教育达百年之久、为党育人为国育才的人文名校傲然挺立。自 1925 年「成城公学」肇基于爱国求真民智，在民族解放的烽火中凝聚成师，恰似星火初明；薪火相传，至 2003 年田家炳先生基金会捐资助学，遂更名为「成都市田家炳中学」。',
    note: '全文分「百年征程波澜壮阔」「百年师德立身树人」「百年英才勇担使命」「百年文脉弦歌绵续」四节，此处节选。',
  },
  {
    title: '众志成城　公学兴国',
    subtitle: '百年精神述要',
    excerpt:
      '1925 年，成城公学以「公学」之名扛起爱国教育重任，秉持「众志成城、公学兴国」宗旨，凝聚教育救国力量。学校数易其名而文脉不断，终以「履仁崇智、明德卓行」的办学思想，赓续百年传承。',
    note: '节选自画册《众志成城 公学兴国》篇。',
  },
  {
    title: '百秩寄语',
    subtitle: '百年赋文（节选）',
    excerpt:
      '一百年弦歌不辍，一代代田中人以「百年风华」的使命与担当，书写教育的厚度与温度；无不铭刻着关心与支持学校发展的社会各界人士，无不倾注着一百年来「履仁崇智、明德卓行」的一代代田中人的追求与奉献。',
    note: '《百秩寄语》《田中赋》为画册文脉篇章，此为节选大意。',
  },
];

/** 创校先贤 */
export const CENTENARY_FOUNDERS: ICentenaryPerson[] = [
  { name: '陶亮生', meta: '1900 — 1984　创校先贤', tribute: '1925 年受聘到校执教并主持校务，以「教育救国」为志，是成城公学主要创办人之一，毕生致力于蜀中教育与文化事业。' },
  { name: '文百川', meta: '1904 — 1965　创校先贤', tribute: '1945 年任成城中学校长，以「有教无类、乐育英才」为训，延聘名师、从严治校，深受师生敬仰。' },
];

/** 人物长廊（育人典范 + 功泽杏坛） */
export const CENTENARY_MENTOR_GROUPS: ICentenaryPersonGroup[] = [
  {
    title: '育人典范（部分）',
    desc: '20 世纪 20 年代到 80 年代的育人典范，或执鞭杏坛、或主政校务，为学校发展立下不朽功勋。',
    people: [
      { name: '张秀熟', meta: '1895 — 1994', tribute: '著名教育家、革命家，与学校渊源深厚，长期关心支持学校发展。' },
      { name: '刘洪恩', meta: '1911 — 1989', tribute: '毕生从教，治学严谨，为学校早期师资骨干。' },
      { name: '张采芹', meta: '1901 — 1984', tribute: '著名画家、教育家，蜀中画坛名家，曾任教于成城公学。' },
      { name: '王心波', meta: '1928 — 2012', tribute: '数十年扎根讲坛，桃李满天下。' },
    ],
  },
  {
    title: '功泽杏坛　留芳名（部分）',
    desc: '历任校长、书记承前启后，带领学校实现从普通中学到省级示范校的跨越。',
    people: [
      { name: '李世麟', meta: '历任成都市第十九中学校长' },
      { name: '熊本沅', meta: '历任成都市第十九中学校长' },
      { name: '杨贤英', meta: '历任成都市第十九中学书记' },
      { name: '冯庆堂', meta: '历任成都市第十九中学校长' },
      { name: '刘家珏', meta: '历任成都市田家炳中学首任校长、书记' },
      { name: '张尚', meta: '历任成都市田家炳中学书记、校长' },
      { name: '胡文武', meta: '现任成都市田家炳中学书记、校长' },
    ],
  },
];

/** 杰出校友（部分） */
export const CENTENARY_ALUMNI: ICentenaryPerson[] = [
  { name: '罗达天', meta: '初 56 级学生　全国五一劳动奖章获得者' },
  { name: '罗达公', meta: '初 57 级学生　全国优秀班主任' },
  { name: '江锁国', meta: '高 67 级学生　北京大学' },
  { name: '刘重森', meta: '高 67 级学生　攀钢集团某公司经理' },
  { name: '黎香友', meta: '高 68 级学生　北京大学' },
  { name: '张治玲', meta: '初 68 级学生　成都新闻宣传工作者' },
  { name: '许大全', meta: '高 75 级学生　书法家', tribute: '「田家炳中学，百年名校，人才辈出！抚今追昔，继往开来，桃李满天下！」' },
  { name: '杨东', meta: '初 76 级学生' },
  { name: '宾凯', meta: '高 87 级学生　北京大学' },
  { name: '何哲生', meta: '水彩画家' },
];

/** 青年校友与在校生祝福（部分） */
export const CENTENARY_YOUNG_ALUMNI: ICentenaryPerson[] = [
  { name: '罗宴', meta: '高 2001 级学生　沙画家' },
  { name: '张剑', meta: '高 2001 级学生　东海舰队' },
  { name: '李劲彬', meta: '初 2013 级学生　北京大学' },
  { name: '张圣杰', meta: '高 2014 级学生　中国核动力研究设计院' },
  { name: '吴思奇', meta: '高 2014 级学生　中航工业成都飞机设计研究所' },
  { name: '吴楚', meta: '高 2013 级学生　浙江大学' },
  { name: '胡亿仟', meta: '高 2013 级学生　北京大学' },
  { name: '巫珣', meta: '初 2013 级学生　清华大学' },
  { name: '毛一琦', meta: '高 2015 级学生　清华大学' },
  { name: '王雨芾', meta: '高 2015 级学生　清华大学' },
];

/** 校庆纪实（媒体报道） */
export const CENTENARY_GALA: ICentenaryGala = {
  date: '2025 年 12 月 5 日',
  title: '百年成城 炳新而行——百年办学成果展暨西部田家炳中学年会',
  desc: '各地校友跨越山海重返校园，与在校师生欢聚一堂，共忆同窗岁月、共话学校发展。校长罗秀云代表学校作主题报告，回望自 1925 年成城公学创办以来的百年历程，传承「众志成城」精神与田家炳先生务实理念，实现从普通中学到省级示范校的跨越。',
  highlights: [
    '创校先贤陶亮生先生与文百川先生后代亲临现场，分享先辈教育故事',
    '百年办学成果展与校园艺术展览同步开展，教育教学成果集中亮相',
    '西部田家炳中学年会同期举行，共商基础教育发展',
    '师生乐享「科技大餐」，科技节活动精彩纷呈',
  ],
};

/** 办学特色词条（画册章节） */
export const CENTENARY_FEATURES: ICentenaryFeature[] = [
  { title: '立德树人·五育并举', desc: '构建「课程、文化、活动、实践」四位一体育人生态，获评全国国际教育示范学校、四川省首批心理健康教育引领校。' },
  { title: '智创未来·科创领航', desc: '教育部人工智能教育试点校，构建「初中—高中—高校」贯通式培养路径，与川大、电子科大、西南交大共建导师团队。' },
  { title: '教研并举·知行合一', desc: '「分层培养、精准赋能」的教师发展体系，依托「名师工作室、青蓝工程」助力教师成长，践行「三实」课堂教学模式。' },
  { title: '以美育人·向美而行', desc: '以艺术节、书画展、文艺汇演浸润心灵，让文化浸润品格、提升学生审美素养和人文情怀。' },
  { title: '阳光体育·强国有我', desc: '以「健康第一」为理念，连续三年蝉联锦江区中小学生田径运动会团体一等奖。' },
  { title: '润育心田·向光而行', desc: '「预防—发展—干预」三位一体心理健康教育体系，全国中小学心理健康教育特色学校。' },
  { title: '植根中国·放眼全球', desc: '以教育国际化为纽带，与法国巴黎英迪国际高中等友好学校开展云端交流与文化互鉴。' },
];

/** 荣誉百年（画册牌匾精选） */
export const CENTENARY_HONORS: ICentenaryHonor[] = [
  { name: '四川省二级示范性普通高中', issuer: '四川省教育厅' },
  { name: '校风示范学校', issuer: '四川省教育厅' },
  { name: '四川省阳光体育示范学校', issuer: '四川省教育厅' },
  { name: '四川省实验教学示范学校', issuer: '四川省教育厅' },
  { name: '现代教育技术示范学校', issuer: '四川省教育厅' },
  { name: '四川省普通高中课程改革省级样本校', issuer: '四川省教育厅' },
  { name: '四川省依法治校示范学校', issuer: '四川省教育厅' },
  { name: '四川省新成长型学校', issuer: '四川省教育厅' },
  { name: '全国中小学心理健康教育特色学校', issuer: '成都市教育局' },
  { name: '成都市教师发展基地校', issuer: '成都市教育局' },
  { name: '成都市示范家长学校', issuer: '成都市妇女联合会、成都市教育局' },
  { name: '文明单位', issuer: '中共成都市委、成都市人民政府' },
  { name: '华东师范大学教育研究与实验基地', issuer: '华东师范大学' },
  { name: '西南大学素质教育课题实验基地', issuer: '西南大学' },
  { name: '西南财经大学优质生源基地', issuer: '西南财经大学' },
  { name: '教育部统编教材课程教材锦江实验区基地校', issuer: '教育部' },
];

/** 资料来源区块 */
export const CENTENARY_SOURCES: ISourceItem[] = [
  {
    label: '《公学成城 百年田中——成都市田家炳中学建校一百周年纪念》画册',
    url: '',
    note: '2025 年 12 月印行；百年历程、人物长廊、办学特色、荣誉等均据此整理',
  },
  {
    label: '人民网四川频道《成都市田家炳中学举行百年办学成果展》',
    url: 'http://sc.people.com.cn/n2/2025/1209/c345167-41436477.html',
    note: '2025-12-09；成果展与创校先贤后代分享',
  },
  {
    label: '川观新闻《这所学校迎来百岁生日 师生乐享「科技大餐」》',
    url: 'https://cbgc.scol.com.cn/news/7034599',
    note: '2025-12-05；「百年成城 炳新而行」校庆活动',
  },
  {
    label: '看度新闻（成都广播电视台）《百年成城炳新程 弦歌不辍育英才》',
    url: 'http://www.cditv.cn/show/4848-2380447.html',
    note: '百年办学成果展暨西部田家炳中学年会',
  },
  {
    label: '本站《学校概况·校史沿革》',
    url: '/about#history',
    note: '校史细段与办学理念详见该页',
  },
];
