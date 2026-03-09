import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { mockNonConformities } from '../data/mockData';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export function RecentNonConformities({ onViewAll }) {
  const recentNCs = mockNonConformities.slice(0, 5);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high':     return 'default';
      case 'medium':   return 'secondary';
      case 'low':      return 'outline';
      default:         return 'outline';
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">Recent Non-Conformities</CardTitle>
        <Button variant="ghost" size="sm" onClick={onViewAll}>
          View All
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentNCs.map((nc) => (
            <div
              key={nc.id}
              className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{nc.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{nc.id}</p>
                  </div>
                  <Badge variant={getSeverityColor(nc.severity)} className="shrink-0">
                    {nc.severity}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className={getStatusColor(nc.status)}>
                    {nc.status.replace('-', ' ')}
                  </Badge>
                  <span className="text-xs text-gray-500">Assigned to: {nc.assignedTo}</span>
                  <span className="text-xs text-gray-500">Due: {format(nc.deadline, 'MMM dd, yyyy')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}