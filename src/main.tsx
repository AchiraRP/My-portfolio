
  import React from 'react';
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import Resume from "./pages/Resume.tsx";
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

  const path = window.location.pathname;

  if (path.startsWith('/resume')) {
    createRoot(document.getElementById("root")!).render(
      <ErrorBoundary>
        <Resume />
      </ErrorBoundary>
    );
  } else {
    createRoot(document.getElementById("root")!).render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} themes={['light', 'dark', 'monochrome']}>
        <App />
      </ThemeProvider>
    );
  }