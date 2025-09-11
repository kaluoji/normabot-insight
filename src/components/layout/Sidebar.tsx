import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  GitCompare,
  Scale,
  Bell,
  Settings,
  Users,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Shield,
  Building2,
} from 'lucide-react';
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    title: 'Principal',
    items: [
      {
        title: 'Dashboard',
        url: '/',
        icon: LayoutDashboard,
        badge: null,
        roles: undefined,
      },
      {
        title: 'Chat RAG',
        url: '/chat',
        icon: MessageSquare,
        badge: 'Nuevo',
        roles: undefined,
      },
    ],
  },
  {
    title: 'Análisis Normativo',
    items: [
      {
        title: 'Reportes',
        url: '/reports',
        icon: FileText,
        badge: null,
        roles: undefined,
      },
      {
        title: 'Análisis GAP',
        url: '/gap-analysis',
        icon: GitCompare,
        badge: null,
        roles: undefined,
      },
      {
        title: 'Comparativas',
        url: '/comparatives',
        icon: Scale,
        badge: null,
        roles: undefined,
      },
    ],
  },
  {
    title: 'Monitoreo',
    items: [
      {
        title: 'Novedades',
        url: '/updates',
        icon: TrendingUp,
        badge: '12',
        roles: undefined,
      },
      {
        title: 'Alertas',
        url: '/alerts',
        icon: Bell,
        badge: '3',
        roles: undefined,
      },
    ],
  },
  {
    title: 'Administración',
    items: [
      {
        title: 'Usuarios',
        url: '/admin/users',
        icon: Users,
        badge: null,
        roles: ['admin'],
      },
      {
        title: 'Integraciones',
        url: '/admin/integrations',
        icon: Building2,
        badge: null,
        roles: ['admin', 'compliance_expert'],
      },
      {
        title: 'Configuración',
        url: '/settings',
        icon: Settings,
        badge: null,
        roles: undefined,
      },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuthStore();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'Principal': true,
    'Análisis Normativo': true,
    'Monitoreo': true,
    'Administración': false,
  });

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  };

  const hasAccess = (roles?: string[]) => {
    if (!roles) return true;
    return roles.includes(user?.role || 'viewer');
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarPrimitive className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent>
        {/* Logo/Brand */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">RegulAI</h2>
              <p className="text-xs text-sidebar-foreground/60">Banking Compliance</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {navigationItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel
              className="flex items-center justify-between cursor-pointer hover:text-sidebar-primary transition-colors"
              onClick={() => toggleGroup(group.title)}
            >
              <span>{group.title}</span>
              {openGroups[group.title] ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </SidebarGroupLabel>
            
            {openGroups[group.title] && (
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items
                    .filter(item => hasAccess(item.roles))
                    .map((item) => (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                              isActive(item.url)
                                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="flex-1">{item.title}</span>
                            {item.badge && (
                              <Badge 
                                variant={item.badge === 'Nuevo' ? 'default' : 'secondary'}
                                className="h-5 text-xs"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>
    </SidebarPrimitive>
  );
}