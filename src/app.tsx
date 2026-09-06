import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import HomePage from "@/pages/HomePage/HomePage";

// 懒加载非首页组件，减少首次加载体积
const AboutPage = lazy(() => import("@/pages/AboutPage/AboutPage"));
const NewsListPage = lazy(() => import("@/pages/NewsListPage/NewsListPage"));
const NewsDetailPage = lazy(() => import("@/pages/NewsDetailPage/NewsDetailPage"));
const TeachingPage = lazy(() => import("@/pages/TeachingPage/TeachingPage"));
const InnovationPage = lazy(() => import("@/pages/InnovationPage/InnovationPage"));
const MoralPage = lazy(() => import("@/pages/MoralPage/MoralPage"));
const StudentPage = lazy(() => import("@/pages/StudentPage/StudentPage"));
const AdmissionPage = lazy(() => import("@/pages/AdmissionPage/AdmissionPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage/NotFoundPage"));

function PageLoading() {
  return (
    <div className="min-h-screen w-full animate-pulse">
      {/* 顶部 Hero 骨架 */}
      <div className="w-full h-[50vh] bg-muted/50" />
      {/* 内容区骨架 */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 space-y-8">
        <div className="h-8 w-48 bg-muted/60 rounded" />
        <div className="h-4 w-96 bg-muted/40 rounded max-w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="h-48 bg-muted/30 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoading />}>
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
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
