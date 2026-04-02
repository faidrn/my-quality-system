import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { mockDocuments } from '../data/mockData';
import { Search, Download, Eye, FileText, Plus } from 'lucide-react';
import { format } from 'date-fns';
import useTranslations  from "../../hooks/useTranslations";


const DocumentsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const { t, loading } = useTranslations();
    

    const filteredDocuments = useMemo(() => {
        return mockDocuments.filter((doc) => {
        const matchesSearch =
            doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [searchQuery, categoryFilter, statusFilter]);

    const getCategoryColor = (category) => {
        switch (category) {
        case 'process':   return 'bg-blue-100 text-blue-700';
        case 'procedure': return 'bg-purple-100 text-purple-700';
        case 'manual':    return 'bg-green-100 text-green-700';
        case 'format':    return 'bg-amber-100 text-amber-700';
        default:          return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
        case 'approved': return 'bg-green-100 text-green-700';
        case 'draft':    return 'bg-amber-100 text-amber-700';
        case 'archived': return 'bg-gray-100 text-gray-700';
        default:         return 'bg-gray-100 text-gray-700';
        }
    };

    // Previene error si el JSON aún no se ha cargado
    if (loading) return <p>Loading...</p>;

    return (
        <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    {t("documentsPanel.title")}
                </h1>
                <p className="text-gray-500 mt-1">
                    {t("documentsPanel.description")}
                </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 md:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                {t("documentsPanel.uploadButton")}
            </Button>
        </div>

        {/* Filters */}
        <Card className="bg-white border-gray-300">
            <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder={t("documentsPanel.filters.searchInput")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-gray-100 border-0"
                        />
                    </div>
                    <Select 
                        value={categoryFilter} 
                        onValueChange={setCategoryFilter}
                    >
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent
                            className="bg-white border-gray-100"
                        >
                            {t("documentsPanel.filters.categories.selectItem").map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.text}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent
                            className="bg-white border-gray-100"
                        >
                            {t("documentsPanel.filters.status.selectItem").map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.text}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>

        {/* Documents Table */}
        <Card
            className="bg-white border-gray-300"
        >
            <CardHeader>
                <CardTitle
                    className="text-lg font-semibold text-gray-900"
                >
                    {t("documentsPanel.documentTable.title")} ({filteredDocuments.length})
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow
                                className="border-b border-gray-300"
                            >
                                <TableHead>{t("documentsPanel.documentTable.columns.document")}</TableHead>
                                <TableHead>{t("documentsPanel.documentTable.columns.category")}</TableHead>
                                <TableHead>{t("documentsPanel.documentTable.columns.version")}</TableHead>
                                <TableHead>{t("documentsPanel.documentTable.columns.status")}</TableHead>
                                <TableHead>{t("documentsPanel.documentTable.columns.uploadedBy")}</TableHead>
                                <TableHead>{t("documentsPanel.documentTable.columns.date")}</TableHead>
                                <TableHead>{t("documentsPanel.documentTable.columns.size")}</TableHead>
                                <TableHead className="text-right">{t("documentsPanel.documentTable.columns.actions")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            className="border-gray-300"
                        >
                            {filteredDocuments.map((doc) => (
                            <TableRow 
                                key={doc.id}
                                className="border-b border-gray-300"
                            >
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{doc.name}</p>
                                            <p className="text-sm text-gray-500">{doc.id}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge className={getCategoryColor(doc.category)}>
                                        {doc.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-mono text-sm">
                                    v{doc.version}
                                </TableCell>
                                <TableCell>
                                    <Badge className={getStatusColor(doc.status)}>
                                        {doc.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm">{doc.uploadedBy}</TableCell>
                                <TableCell className="text-sm">
                                    {format(doc.updatedAt, 'MMM dd, yyyy')}
                                </TableCell>
                                <TableCell className="text-sm">{doc.size}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="sm">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </div>
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

export default DocumentsPage;