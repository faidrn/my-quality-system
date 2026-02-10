import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { Menu, Search, Bell, User } from 'lucide-react';
import { Badge } from "../ui/badge";

const Header = ({ onMobileMenuToggle }) => {
    return (
        <header
            className="h-16 border-b border-gray-200 bg-white sticky top-0 z-30"
        >
            <div
                className="h-full flex items-center justify-between px-4 lg:px-6"
            >
                {/* Left Section */}
                <div
                    className="flex items-center gap-4"
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        className="lg:hidden"
                        onClick={onMobileMenuToggle}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    <div
                        className="hidden md:flex items-center gap-2 max-w-md w-full"
                    >
                        <div
                            className="relative flex-1"
                        >
                            <Search 
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                            />
                            <Input 
                                placeholder="Search documents, non-conformities..."
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div
                    className="flex items-center gap-2"
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        className="relative"
                    >
                        <Bell className="h-5 w-5" />
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                        >
                            3
                        </Badge>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="gap-2"
                            >
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-blue-700" />
                                </div>
                                <span className="hidden md:inline text-sm font-medium">
                                    My User Name
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                            align="end" 
                            className="w-56"
                        >
                            <DropdownMenuLabel>
                                <div className="flex flex-col">
                                    <span>My User Name</span>
                                    <span className="text-xs text-gray-500 font-normal">
                                        emailuser@company.com
                                    </span>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default Header;