import React from "react";
import { cn } from "../lib/utils";
import { LayoutDashboard, FileText, AlertCircle, Users, Settings, Activity, Menu, X } from 'lucide-react';
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { is } from "date-fns/locale";

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'non-conformities', label: 'Non-Conformities', icon: AlertCircle },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'audit-logs', label: 'Audit Logs', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ currentPage, onPageChange, isMobileOpen, onMobileToggle }) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
                    onClick={onMobileToggle} 
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 w-64',
                    'lg:translate-x-0',
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                
            </aside>
        </>
    );
};

export default Sidebar;