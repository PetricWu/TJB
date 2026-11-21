export const SCHOOL_FACTS = {
  foundedYear: 1925,
  formerNames: ['成城公学', '成都十九中'],
  renamedYear: 2003,
  campusAreaMu: 46.24,
  campusAreaSqm: 30821,
  juniorAreaMu: 12.52,
  seniorAreaMu: 33.72,
  buildingAreaSqm: 26386,
  classes: 60,
  students: 2600,
  staff: 273,
  seniorAddress: '锦江区顺江路369号',
  juniorAddress: '锦江区工农院街69号',
  phone: '028-84551880',
  admissionPhone: '84513739',
  boarding: false,
  level: '四川省二级示范性普通高中',
  levelProgress: '已通过四川省一级示范性普通高中现场评审',
} as const;

export const yearsSinceFounded = () => new Date().getFullYear() - SCHOOL_FACTS.foundedYear;

export const SCHOOL_TITLES = ['四川省二级示范性普通高中', '已通过四川省一级示范性普通高中现场评审'] as const;

export const FACULTY_TIERS = [
  { label: '省特级教师', value: 3, note: '省教书育人名师、省首届「四有」好老师' },
  { label: '市特级教师', value: 1 },
  { label: '省骨干教师', value: 4 },
  { label: '区特级教师', value: 10 },
  { label: '市学科带头人', value: 4 },
  { label: '区学科带头人', value: 6 },
] as const;

export const FACULTY_OUTSTANDING = 80; // 全国（省、市、区）优秀教师等 80 余名
