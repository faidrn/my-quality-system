import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { mockAuditLogs } from '../data/mockData';
import { Activity } from 'lucide-react';
import { format } from 'date-fns';

export function RecentActivity() {
  const recentLogs = mockAuditLogs.slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentLogs.map((log) => (
            <div key={log.id} className="flex gap-4">
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{log.action}</p>
                <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{log.userName}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {format(log.timestamp, 'MMM dd, yyyy HH:mm')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}