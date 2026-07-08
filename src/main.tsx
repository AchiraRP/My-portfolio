
  import React from 'react';
  import { createRoot } from "react-dom/client";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import App from "./App.tsx";
  import ResumePreview from "./pages/ResumePreview.tsx";
  import "./styles/index.css";
  import { ThemeProvider } from "next-themes";

  class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
    constructor(props: {children: React.ReactNode}) {
      super(props);
      this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }
    render() {
      if (this.state.hasError) {
        return <div style={{padding: '2rem', color: 'red'}}><h1>Something went wrong.</h1><pre>{this.state.error?.toString()}</pre></div>;
      }
      return this.props.children;
    }
  }

  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <BrowserRouter>
          <Routes>
            <Route path="/resume" element={<ResumePreview />} />
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );