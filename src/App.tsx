import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster as HotToaster } from 'react-hot-toast';

// Components and Pages
import { MainLayout } from "./components/layout/MainLayout";
import { useAuthStore, useThemeStore } from "./lib/store";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Theme Provider Component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);
  
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HotToaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="chat" element={<Chat />} />
              <Route path="reports" element={<div className="p-6">Reportes - En desarrollo</div>} />
              <Route path="gap-analysis" element={<div className="p-6">Análisis GAP - En desarrollo</div>} />
              <Route path="comparatives" element={<div className="p-6">Comparativas - En desarrollo</div>} />
              <Route path="updates" element={<div className="p-6">Novedades - En desarrollo</div>} />
              <Route path="alerts" element={<div className="p-6">Alertas - En desarrollo</div>} />
              <Route path="admin/users" element={<div className="p-6">Gestión de Usuarios - En desarrollo</div>} />
              <Route path="admin/integrations" element={<div className="p-6">Integraciones - En desarrollo</div>} />
              <Route path="settings" element={<div className="p-6">Configuración - En desarrollo</div>} />
            </Route>
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
