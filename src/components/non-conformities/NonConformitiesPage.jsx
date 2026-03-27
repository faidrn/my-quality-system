import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { mockNonConformities } from '../data/mockData';
import { Search, Plus, Eye, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { NonConformityDetails } from './NonConformityDetails';

export function NonConformitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [selectedNC, setSelectedNC] = useState(null);

  const filteredNCs = useMemo(() => {
    return mockNonConformities.filter((nc) => {
      const matchesSearch =
        nc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nc.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || nc.status === statusFilter;
      const matchesSeverity = severityFilter === 'all' || nc.severity === severityFilter;

      return matchesSearch && matchesStatus && matchesSeverity;
    });
  }, [searchQuery, statusFilter, severityFilter]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high':     return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium':   return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low':      return 'bg-blue-100 text-blue-700 border-blue-200';
      default:         return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':           return 'bg-blue-100 text-blue-700';
      case 'in-progress':    return 'bg-amber-100 text-amber-700';
      case 'pending-review': return 'bg-purple-100 text-purple-700';
      case 'closed':         return 'bg-green-100 text-green-700';
      default:               return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high':   return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low':    return 'bg-blue-100 text-blue-700';
      default:       return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Non-Conformities Management</h1>
          <p className="text-gray-500 mt-1">Track and manage quality non-conformities</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Register Non-Conformity
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockNonConformities.filter((nc) => nc.status === 'open').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-amber-600">
                  {mockNonConformities.filter((nc) => nc.status === 'in-progress').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Closed</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockNonConformities.filter((nc) => nc.status === 'closed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockNonConformities.filter((nc) => nc.severity === 'critical').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search non-conformities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending-review">Pending Review</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Non-Conformities Table */}
      <Card>
        <CardHeader>
          <CardTitle>Non-Conformities ({filteredNCs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID / Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNCs.map((nc) => (
                  <TableRow key={nc.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{nc.title}</p>
                        <p className="text-sm text-gray-500">{nc.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{nc.category}</TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(nc.severity)}>
                        {nc.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(nc.priority)}>
                        {nc.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(nc.status)}>
                        {nc.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{nc.assignedTo}</TableCell>
                    <TableCell className="text-sm">
                      {format(nc.deadline, 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedNC(nc.id)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <NonConformityDetails nc={nc} />
                        </DialogContent>
                      </Dialog>
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
}