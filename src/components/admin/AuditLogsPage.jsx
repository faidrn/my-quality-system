import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { mockAuditLogs } from '../data/mockData';
import { Search, Activity } from 'lucide-react';
import { format } from 'date-fns';
import useTranslations  from "../../hooks/useTranslations";


const AuditLogsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [moduleFilter, setModuleFilter] = useState('all');
    const { t, loading } = useTranslations();

    const filteredLogs = mockAuditLogs.filter((log) => {
        const matchesSearch =
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.userName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;

        return matchesSearch && matchesModule;
    });

    const getModuleBadge = (module) => {
        switch (module) {
        case 'documents':
            return 'bg-blue-100 text-blue-700';
        case 'non-conformities':
            return 'bg-red-100 text-red-700';
        case 'users':
            return 'bg-purple-100 text-purple-700';
        case 'system':
            return 'bg-gray-100 text-gray-700';
        default:
            return 'bg-gray-100 text-gray-700';
        }
    };

    // Previene error si el JSON aún no se ha cargado
    if (loading) return <p>Loading...</p>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{t("auditLogsPanel.title")}</h1>
                <p className="text-gray-500 mt-1">
                    {t("auditLogsPanel.description")}
                </p>
            </div>

            {/* Filters */}
            <Card
                className="bg-white border-gray-300"
            >
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder={t("auditLogsPanel.filters.searchInput")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 border-gray-100 bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                            />
                        </div>
                        <Select 
                            value={moduleFilter} 
                            onValueChange={setModuleFilter}
                            className="border-gray-100 bg-gray-100"
                        >
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Module" />
                        </SelectTrigger>
                        <SelectContent
                            className="bg-white"
                        >
                            {t("auditLogsPanel.filters.type.selectItem").map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.text}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Audit Logs Table */}
            <Card
                className="bg-white border-gray-300"
            >
                <CardHeader>
                    <CardTitle
                        className="text-lg font-semibold text-gray-900"
                    >
                        {t("auditLogsPanel.auditLogsTable.title")} ({filteredLogs.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow
                                    className="border-b-gray-300 hover:bg-gray-50"
                                >
                                    <TableHead>{t("auditLogsPanel.auditLogsTable.columns.user")}</TableHead>
                                    <TableHead>{t("auditLogsPanel.auditLogsTable.columns.action")}</TableHead>
                                    <TableHead>{t("auditLogsPanel.auditLogsTable.columns.module")}</TableHead>
                                    <TableHead>{t("auditLogsPanel.auditLogsTable.columns.details")}</TableHead>
                                    <TableHead>{t("auditLogsPanel.auditLogsTable.columns.timestamp")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLogs.map((log) => (
                                <TableRow 
                                    key={log.id}
                                    className="border-b-gray-300 hover:bg-gray-50"
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                            <Activity className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <span className="font-medium text-gray-900">
                                            {log.userName}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-900">
                                        {log.action}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getModuleBadge(log.module)}>
                                            {log.module}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        {log.details}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        {format(log.timestamp, 'MMM dd, yyyy HH:mm:ss')}
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuditLogsPage;