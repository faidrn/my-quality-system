import React from "react";
import { cn } from "../lib/utils";
import { LayoutDashboard, FileText, AlertCircle, Users, Settings, Activity, Menu, X } from 'lucide-react';
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

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
                {/* Header */}
                <div
                    className="h-16 border-b border-gray-200 flex items-center justify-between px-6"
                >
                    <div
                        className="flex items-center gap-2"
                    >
                        <div
                            className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
                        >
                            <span
                                className="text-white font-bold text-sm"
                            >
                                QMS
                            </span>
                        </div>
                        <span
                            className="font-semibold text-gray-900"
                        >
                            Quality System
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="lg:hidden"
                        onClick={onMobileToggle}
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>
                
                {/* Navigation */}
                <ScrollArea className="h-[calc(100vh-4rem)] py-6">
                    <nav className="px-3 space-y-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        onPageChange(item.id);
                                        if (isMobileOpen) onMobileToggle();
                                    }}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                        currentPage === item.id
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </ScrollArea>
            </aside>
        </>
    );
};

export default Sidebar;