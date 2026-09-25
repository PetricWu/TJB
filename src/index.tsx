import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import App from "./app";
import "./index.css";

// Simple replacements for AppContainer and ErrorRender
// The original AppContainer from @lark-apaas/client-toolkit-lite renders
// a "doubao-watermark" floating widget (position:fixed; right:12; bottom:12)
// which is the 妙搭悬浮窗. We replace it with a simple Fragment wrapper.
// ErrorRender sends postMessage to the 妙搭 platform parent frame,
// which is not needed on Netlify.
const AppContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

const ErrorRender: React.FC<{ error: unknown; resetErrorBoundary: () => void }> = ({ error }) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>页面出错了</h2>
    <p style={{ color: '#999' }}>{error instanceof Error ? error.message : '请刷新页面重试'}</p>
  </div>
);

const rootEl = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter basename={process.env.CLIENT_BASE_PATH || "/"}>
      <AppContainer>
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorRender error={error} resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <App />
        </ErrorBoundary>
      </AppContainer>
    </BrowserRouter>
  </StrictMode>
);

// 预渲染产物已含正文时用 hydrate（避免闪），否则 createRoot（开发/未预渲染）
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
