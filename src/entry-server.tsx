// 预渲染服务端入口：静态导入各页面（绕过 React.lazy），StaticRouter 渲染为 HTML
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import HomePage from '@/pages/HomePage/HomePage';
import AboutPage from '@/pages/AboutPage/AboutPage';
import NewsListPage from '@/pages/NewsListPage/NewsListPage';
import NewsDetailPage from '@/pages/NewsDetailPage/NewsDetailPage';
import TeachingPage from '@/pages/TeachingPage/TeachingPage';
import InnovationPage from '@/pages/InnovationPage/InnovationPage';
import MoralPage from '@/pages/MoralPage/MoralPage';
import StudentPage from '@/pages/StudentPage/StudentPage';
import AdmissionPage from '@/pages/AdmissionPage/AdmissionPage';
import AlumniPage from '@/pages/AlumniPage/AlumniPage';
import TianjiabingPage from '@/pages/TianjiabingPage/TianjiabingPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

/** 渲染指定路由为 HTML 字符串（与 app.tsx 路由结构保持一致） */
export function render(url: string): string {
  return renderToString(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="news" element={<NewsListPage />} />
          <Route path="news/:id" element={<NewsDetailPage />} />
          <Route path="teaching" element={<TeachingPage />} />
          <Route path="innovation" element={<InnovationPage />} />
          <Route path="moral" element={<MoralPage />} />
          <Route path="student" element={<StudentPage />} />
          <Route path="admission" element={<AdmissionPage />} />
          <Route path="alumni" element={<AlumniPage />} />
          <Route path="tianjiabing" element={<TianjiabingPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  );
}
