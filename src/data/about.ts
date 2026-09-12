export interface IHistoryPeriod {
  year: string;
  title: string;
  description: string;
  icon: string;
  isEra?: boolean;
}

export interface IHonor {
  id: string;
  year: string;
  title: string;
  issuer: string;
  level: string;
}

export interface IFacultyMember {
  id: string;
  name: string;
  title: string;
  subject: string;
  description: string;
  avatar?: string;
}

export interface IStatItem {
  label: string;
  value: string;
  suffix?: string;
}

export interface ICampusImage {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const MOCK_ABOUT = {
  content: '成都市田家炳中学始建于1925年，时称"成城公学"，取意"众志成城，公学兴国"，由陶亮生、文百川等爱国知识分子在"五卅"反帝爱国运动中创办。后相继更名为成城中学、四川大学附属中学、成都十九中。2003年香港实业家、慈善家田家炳先生捐资250万元办学，更名为"成都市田家炳中学"，成为全国166所田家炳系列学校之一。2009年加入成都七中教育集团，2023年通过四川省一级示范性普通高中验收，2026年成为成都市六年贯通培养试点学校。学校现有高中部（顺江路369号）和初中部（工农院街69号）两个校区，共占地57亩，校舍建筑面积45940余平方米，在校学生约3100人，60个教学班。学校是教育部人工智能教育"双试点"单位、全国国防教育示范校、四川省首批中小学心理健康教育引领校。',
};

export const MOCK_ABOUT_STATS: IStatItem[] = [
  { label: '建校历史', value: '101', suffix: '年' },
  { label: '在校学生', value: '3100', suffix: '余人' },
  { label: '专任教师', value: '260', suffix: '余名' },
  { label: '校区面积', value: '57', suffix: '亩' },
];

export const MOCK_HISTORY: IHistoryPeriod[] = [
  {
    year: '一',
    title: '乱世肇始：成城公学诞生',
    description: '1925年，举国爆发"五卅"反帝爱国运动，一批爱国知识分子怀着教育救国的理想，在成都创办了成城公学，校名取自"众志成城，公学兴国"，寄托着知识分子抵御外侮、兴办教育、挽救民族危亡的壮志。建校之初，学校选址锦江北岸三官堂片区，与四川大学隔江相望，坐拥浓郁的文教氛围。在战火纷飞的民国岁月里，学校几经风雨，校名首次更改为成城中学。抗战时期，大批学者来川避难，学校吸纳了众多优秀师资，一边坚持正常教学，一边宣传爱国思想，培养了一大批投身救亡图存事业的青年学子。新中国成立前，成城中学始终坚守办学初心，在动荡时局里守住了西南地区基础教育的火种。',
    icon: 'book-open',
    isEra: true,
  },
  {
    year: '1925',
    title: '成城公学创办',
    description: '爱国知识分子在成都创办成城公学，校名取自"众志成城，公学兴国"，选址锦江北岸三官堂片区，与四川大学隔江相望。',
    icon: 'flag',
  },
  {
    year: '抗战时期',
    title: '烽火中坚守办学',
    description: '大批学者来川避难，学校吸纳优秀师资，坚持正常教学，宣传爱国思想，培养投身救亡图存事业的青年学子。',
    icon: 'shield',
  },
  {
    year: '二',
    title: '时代更迭：多次更名，并入川大体系',
    description: '新中国成立后，学校迎来全新发展阶段。建国初期更名为成都第九初级中学，转为公办学校。随后划归四川大学管理，正式定名四川大学附属中学（川大附中），依托川大雄厚的高校师资资源，办学实力大幅跃升，文史、理科教学质量稳居成都公办中学前列，成为望江片区知名的优质中学。上世纪60年代，教育布局重新规划，学校脱离川大管理，正式定名为成都市第十九中学，这一校名沿用长达四十余年。',
    icon: 'university',
    isEra: true,
  },
  {
    year: '1950s',
    title: '成都第九初级中学',
    description: '建国初期，学校更名为成都第九初级中学，转为公办学校，纳入成都市统一教育管理体系。',
    icon: 'school',
  },
  {
    year: '1950s',
    title: '四川大学附属中学',
    description: '学校划归四川大学管理，正式定名四川大学附属中学（川大附中），依托川大雄厚师资资源，办学实力大幅跃升。',
    icon: 'graduation-cap',
  },
  {
    year: '1960s',
    title: '成都十九中定名',
    description: '教育布局重新规划，学校脱离川大管理，正式定名为成都市第十九中学，校名沿用长达四十余年。',
    icon: 'edit',
  },
  {
    year: '三',
    title: '稳步深耕：成都十九中的稳步发展',
    description: '在"成都十九中"时期，学校扎根锦江区，稳步扩大办学规模，发展为一所完整的公办完全中学。改革开放之后，学校狠抓教学质量，完善软硬件设施，逐步跻身成都市优质公办中学行列。1997年被评为成都市合格普通高中，2001年获评成都市校风示范校，2002年正式晋升为成都市市级示范高中（市重点中学）。数十年间，成都十九中为成都本土培养了数万毕业生，校友遍布各行各业，积淀下严谨务实的校风。',
    icon: 'trending-up',
    isEra: true,
  },
  {
    year: '1997',
    title: '成都市合格普通高中',
    description: '学校被评定为成都市合格普通高中，办学质量得到市级教育部门认可。',
    icon: 'check-circle',
  },
  {
    year: '2001',
    title: '成都市校风示范校',
    description: '获评成都市校风示范校，校风建设成果显著。',
    icon: 'star',
  },
  {
    year: '2002',
    title: '晋升成都市重点中学',
    description: '正式晋升为成都市市级示范高中（市重点中学），办学水平得到全面认可，积淀下严谨务实的校风。',
    icon: 'award',
  },
  {
    year: '四',
    title: '薪火新生：更名田家炳中学，开启新篇',
    description: '2003年，香港爱国慈善家、实业家田家炳先生向学校捐赠250万元办学资金。经成都市教育局批准，"成都市第十九中学"正式更名为成都市田家炳中学，成为全国166所田家炳系列学校之一。学校传承田家炳先生"宁可实而不华，不可华而不实"的精神，确立"履仁崇智，明德卓行"的办学理念。2006年下划至锦江区，2007-2008年先后整合莲新中学、锦江育才中学，形成高中部（三官堂老校区）和初中部（莲新片区）一校两区格局。2014年起本科升学率突破90%，2016年一本上线率突破46%，连续多年获评成都市高考教学质量表彰。',
    icon: 'heart',
    isEra: true,
  },
  {
    year: '2003',
    title: '更名田家炳中学',
    description: '田家炳先生捐赠250万元，学校正式更名为成都市田家炳中学，成为全国166所田家炳系列学校之一，确立"履仁崇智，明德卓行"办学理念。',
    icon: 'heart',
  },
  {
    year: '2006-2008',
    title: '属地划转与校区整合',
    description: '2006年下划至锦江区，2007-2008年先后整合莲新中学、锦江育才中学，形成高中部、初中部一校两区格局，总占地57亩。',
    icon: 'building',
  },
  {
    year: '2014-2016',
    title: '教学质量腾飞',
    description: '2014年本科升学率突破90%，2016年一本上线率突破46%，连续多年获评成都市高考教学质量表彰，稳居锦江区公办高中第一梯队。',
    icon: 'trending-up',
  },
  {
    year: '五',
    title: '百年跨越：跻身省级一流示范高中',
    description: '2023年，学校正式晋升为四川省一级示范性普通高中（省重），完成了从市级重点到省级一流名校的历史性跨越，当年高考最高分674分，位列锦江区公办高中第二名。2025年迎来建校百年，举办"百年成城，炳新而行"大型校庆活动，同步成立AI创新实验班，与香港田家炳基金会深度合作，对接全国顶尖教育资源。截至百年校庆，学校汇聚一大批省市区特级教师、优秀班主任与骨干教师，初高中双校区运行稳定，成为锦江区核心公办完中。',
    icon: 'trophy',
    isEra: true,
  },
  {
    year: '2023',
    title: '晋升四川省一级示范校',
    description: '正式晋升为四川省一级示范性普通高中（省重），完成从市级重点到省级一流名校的历史性跨越。高考最高分674分，位列锦江区公办高中第二名。',
    icon: 'trophy',
  },
  {
    year: '2025',
    title: '百年校庆',
    description: '迎来建校百年（1925-2025），举办"百年成城，炳新而行"大型校庆活动，成立AI创新实验班，与香港田家炳基金会深度合作。',
    icon: 'party-popper',
  },
  {
    year: '2026',
    title: '成都市六年贯通培养试点',
    description: '成为成都市六年贯通培养试点学校，实现初高中一体化育人，开启现代化智慧教育新阶段。',
    icon: 'zap',
  },
  {
    year: '六',
    title: '百年文脉总结',
    description: '从1925年爱国救国的"成城公学"，到成城中学、川大附中、成都十九中，再到如今的成都市田家炳中学，整整一百年间，校名几经更迭，但"众志成城、仁爱育人"的初心始终没变。这所扎根锦江边的百年老校，既承载着民国知识分子教育救国的家国情怀，又传承着田家炳先生无私兴学的仁爱精神，历经战乱、改制、整合、提质，一步步从一所乱世私立学堂，成长为如今四川省内一流的省级示范公办中学，弦歌百年，桃李满城。',
    icon: 'book-open',
    isEra: true,
  },
];

export const MOCK_PHILOSOPHY = {
  content: '学校以"履仁崇智 明德卓行"为办学思想，秉承田家炳先生"宁可实而不华，不可华而不实"的校训精神，坚持"崇实适性，润育心田"的办学理念。构建"实际、实在、实效"的"三实"课堂和"实学、实用、实慧、实德"的"四实"课程体系，践行"润育、厚养、融化"的育人理念。学校核心文化为"真、实、新"——回归教育本真、立足教学实效、传承红色基因。在长期办学实践中形成了"朴实无华、坚毅向上"的校风，坚持"以仁固本、以智强势"的管理理念，追求"每一个学生都是我们的增长点"。',
};

export const MOCK_FACULTY: IFacultyMember[] = [
  {
    id: 'f1',
    name: '张石山',
    title: '正高级教师、全国教育世家',
    subject: '英语',
    description: '正高级教师，成都市张石山名师工作室主持人。28年班主任经历，先后57名学生考入清华北大。2021年获评教育部首批"全国教育世家"（四川仅5个家庭），主研各级课题15个，发表论文17篇，出版专著十多部，指导30多位省内外年轻教师。',
    avatar: '/teachers/teacher-1.webp',
  },
  {
    id: 'f2',
    name: '谢玉平',
    title: '四川省特级教师',
    subject: '数学',
    description: '四川省特级教师，教龄31年。发表教研论文51篇，合著出版书籍14本，主研课题20多项，课题或论文获奖32项。所带班级获"四川省普通高中先进班集体"，在省市区进行30多次培训讲座。',
    avatar: '/teachers/teacher-2.webp',
  },
  {
    id: 'f3',
    name: '孙阳菊',
    title: '四川省特级教师、教科室主任',
    subject: '语文',
    description: '四川省特级教师（2021年省政府表彰），成都市学科带头人，锦江区语文名师工作室主持人。赴菲律宾支教获国务院侨务办公室表彰，主持《人工智能赋能高中语文教学》等区级课题。',
    avatar: '/teachers/teacher-3.webp',
  },
  {
    id: 'f4',
    name: '余大海',
    title: '成都市优秀班主任',
    subject: '',
    description: '成都市优秀班主任。班级管理经验丰富，关爱学生成长，所带班级班风正、学风浓。',
    avatar: '/teachers/teacher-4.webp',
  },
  {
    id: 'f5',
    name: '文人',
    title: '成都市优秀班主任',
    subject: '',
    description: '成都市优秀班主任。注重学生全面发展，善于激发学生潜能，班级建设成果丰硕。',
    avatar: '/teachers/teacher-5.webp',
  },
  {
    id: 'f6',
    name: '曹洪义',
    title: '成都市优秀班主任',
    subject: '',
    description: '成都市优秀班主任。教书育人并重，管理科学民主，深受学生喜爱和家长信赖。',
    avatar: '/teachers/teacher-6.webp',
  },
  {
    id: 'f7',
    name: '席春',
    title: '成都市优秀班主任',
    subject: '',
    description: '成都市优秀班主任。班级管理有方，注重学生品格培养，教育教学成绩优异。',
    avatar: '/teachers/teacher-7.webp',
  },
  {
    id: 'f8',
    name: '袁敏',
    title: '成都市优秀班主任',
    subject: '',
    description: '成都市优秀班主任。用心呵护每一位学生，注重家校共育，班级凝聚力强。',
    avatar: '/teachers/teacher-8.webp',
  },
  {
    id: 'f9',
    name: '张平',
    title: '成都市优秀班主任',
    subject: '',
    description: '成都市优秀班主任。教育理念先进，管理方法创新，班级整体素质全面提升。',
    avatar: '/teachers/teacher-9.webp',
  },
  {
    id: 'f10',
    name: '刘宁',
    title: '成都市优秀班主任',
    subject: '',
    description: '成都市优秀班主任。爱岗敬业，关爱学生，班级学风优良，成绩突出。',
    avatar: '/teachers/teacher-10.webp',
  },
  {
    id: 'f11',
    name: '彭丹',
    title: '成都市优秀班主任',
    subject: '',
    description: '成都市优秀班主任。注重学生个性发展，善于因材施教，育人成效显著。',
    avatar: '/teachers/teacher-11.webp',
  },
  {
    id: 'f12',
    name: '谢玉军',
    title: '成都市优秀支教教师',
    subject: '',
    description: '成都市优秀支教教师。积极投身教育帮扶，传播先进教育理念，助力教育均衡发展。',
    avatar: '/teachers/teacher-12.webp',
  },
  {
    id: 'f13',
    name: '虞尚源',
    title: '成都市优秀青年教师',
    subject: '',
    description: '成都市优秀青年教师。教学基本功扎实，勇于创新探索，是青年教师中的佼佼者。',
    avatar: '/teachers/teacher-13.webp',
  },
  {
    id: 'f14',
    name: '张颖',
    title: '成都市优秀青年教师',
    subject: '',
    description: '成都市优秀青年教师。课堂教学生动活泼，深受学生喜爱，教学成绩突出。',
    avatar: '/teachers/teacher-14.webp',
  },
  {
    id: 'f15',
    name: '张应莲',
    title: '成都市优秀青年教师',
    subject: '',
    description: '成都市优秀青年教师。专业素养过硬，教学方法灵活，成长迅速，潜力巨大。',
    avatar: '/teachers/teacher-15.webp',
  },
  {
    id: 'f16',
    name: '陈琳',
    title: '成都市优秀青年教师',
    subject: '',
    description: '成都市优秀青年教师。热爱教育事业，潜心教学研究，是学校教学骨干后备力量。',
    avatar: '/teachers/teacher-16.webp',
  },
  {
    id: 'f17',
    name: '刘琼',
    title: '成都市教坛新秀',
    subject: '',
    description: '成都市教坛新秀。教学热情饱满，课堂充满活力，是教育战线上的新生力量。',
    avatar: '/teachers/teacher-17.webp',
  },
  {
    id: 'f18',
    name: '张友科',
    title: '成都市教坛新秀',
    subject: '',
    description: '成都市教坛新秀。人工智能名师工作室主持人，科创教育核心教师，指导学生多次获奖。',
    avatar: '/teachers/teacher-18.webp',
  },
  {
    id: 'f19',
    name: '徐秋文',
    title: '成都市优秀教师',
    subject: '',
    description: '成都市优秀教师。爱岗敬业，无私奉献，教育教学成果显著，深受师生好评。',
    avatar: '/teachers/teacher-19.webp',
  },
  {
    id: 'f20',
    name: '杨红霞',
    title: '锦江区特级教师',
    subject: '',
    description: '锦江区特级教师。区域学科带头人，教学经验丰富，引领区域学科发展。',
    avatar: '/teachers/teacher-20.webp',
  },
  {
    id: 'f21',
    name: '陈川',
    title: '锦江区特级教师',
    subject: '',
    description: '锦江区特级教师。教学风格鲜明，教育理念先进，是区域教育的中坚力量。',
    avatar: '/teachers/teacher-21.webp',
  },
  {
    id: 'f22',
    name: '杨芙蓉',
    title: '锦江区特级教师',
    subject: '',
    description: '锦江区特级教师。深耕教学一线，教研成果丰硕，发挥示范引领作用。',
    avatar: '/teachers/teacher-22.webp',
  },
  {
    id: 'f23',
    name: '何拥军',
    title: '锦江区特级教师',
    subject: '',
    description: '锦江区特级教师。教育教学成绩突出，培养大批优秀学子，师德高尚。',
    avatar: '/teachers/teacher-23.webp',
  },
  {
    id: 'f24',
    name: '钟富贵',
    title: '锦江区特级教师',
    subject: '',
    description: '锦江区特级教师。专业功底深厚，教学艺术精湛，深受学生爱戴。',
    avatar: '/teachers/teacher-24.webp',
  },
  {
    id: 'f25',
    name: '莫斌',
    title: '锦江区特级教师',
    subject: '',
    description: '锦江区特级教师。教育教学成果显著，教研能力突出，区域名师。',
    avatar: '/teachers/teacher-25.webp',
  },
  {
    id: 'f26',
    name: '谭凤',
    title: '锦江区特级教师',
    subject: '',
    description: '锦江区特级教师。教学风格独特，育人成效显著，学生喜爱的好老师。',
    avatar: '/teachers/teacher-26.webp',
  },
  {
    id: 'f27',
    name: '何小丽',
    title: '锦江区特级教师',
    subject: '',
    description: '锦江区特级教师。关爱学生成长，注重素质教育，班级管理卓有成效。',
    avatar: '/teachers/teacher-27.webp',
  },
  {
    id: 'f28',
    name: '刘君梅',
    title: '锦江区特级教师',
    subject: '',
    description: '锦江区特级教师。教学经验丰富，教育理念新颖，引领学科发展。',
    avatar: '/teachers/teacher-28.webp',
  },
  {
    id: 'f29',
    name: '曹莉',
    title: '锦江区特级教师',
    subject: '',
    description: '锦江区特级教师。爱岗敬业，教书育人，是学生成长路上的引路人。',
    avatar: '/teachers/teacher-29.webp',
  },
];

export const MOCK_HONORS: IHonor[] = [
  { id: 'h1', title: '四川省一级示范性普通高中', year: '2023', issuer: '四川省教育厅', level: '省级' },
  { id: 'h2', title: '全国国防教育示范校', year: '2023', issuer: '教育部、中央军委政治工作部', level: '国家级' },
  { id: 'h3', title: '四川省首批中小学心理健康教育引领校', year: '2024', issuer: '四川省教育厅', level: '省级' },
  { id: 'h4', title: '四川省普通高中课程改革省级样本校', year: '2022', issuer: '四川省教育厅', level: '省级' },
  { id: 'h5', title: '四川省校风示范校', year: '2015', issuer: '四川省教育厅', level: '省级' },
  { id: 'h6', title: '成都市人工智能科普教育示范校', year: '2026', issuer: '成都市教育局', level: '市级' },
  { id: 'h7', title: '成都市中小学心理健康教育特色学校', year: '2020', issuer: '成都市教育局', level: '市级' },
  { id: 'h8', title: '成都市第二批教师发展基地校', year: '2022', issuer: '成都市教育局', level: '市级' },
  { id: 'h9', title: '成都市阳光体育示范校', year: '2018', issuer: '成都市教育局', level: '市级' },
  { id: 'h10', title: '成都市六年贯通培养试点学校', year: '2026', issuer: '成都市教育局', level: '市级' },
  { id: 'h11', title: '课程教材所人工智能教育试点单位', year: '2025', issuer: '教育部课程教材研究所', level: '国家级' },
  { id: 'h12', title: '成都七中教育集团成员学校', year: '2019', issuer: '成都市教育局', level: '市级' },
];

export const MOCK_CAMPUS: ICampusImage[] = [
  { id: 'c1', title: '教学主楼', description: '现代化教学主楼，配备智慧教室、多媒体功能室及学科实验室', image: '/images/38Bp1wfimz.webp' },
  { id: 'c2', title: '图书馆', description: '藏书15万册的现代化图书馆，设有电子阅览区和自主学习空间', image: '/images/38Bp1wfimz.webp' },
  { id: 'c3', title: '运动场', description: '标准400米塑胶跑道、足球场、篮球场及室内体育馆', image: '/images/38Bp1wfimz.webp' },
  { id: 'c4', title: '校史馆', description: '百年校史陈列馆，展示学校发展历程、杰出校友事迹及办学成果', image: '/images/XtGR1wfimz.webp' },
  { id: 'c5', title: '科创实验室', description: '15个高标准实验室，配备机器人、3D打印机、无人机等设备，支撑人工智能与科创教育', image: '/images/38Bp1wfimz.webp' },
  { id: 'c6', title: '艺术中心', description: '集音乐教室、舞蹈排练厅、美术画室于一体的综合艺术教育中心', image: '/images/38Bp1wfimz.webp' },
];
