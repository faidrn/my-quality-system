import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import * as Icons from 'lucide-react';

export function KPICard({ kpi }) {
  const Icon = Icons[kpi.icon];

  return (
    <Card className="bg-white border-gray-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {kpi.title}
        </CardTitle>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
        <div className="flex items-center gap-1 mt-1">
          {kpi.trend === 'up' && (
            <ArrowUpIcon className={cn('w-4 h-4', kpi.change > 0 ? 'text-red-500' : 'text-green-500')} />
          )}
          {kpi.trend === 'down' && (
            <ArrowDownIcon className={cn('w-4 h-4', kpi.change < 0 ? 'text-green-500' : 'text-red-500')} />
          )}
          {kpi.trend === 'neutral' && (
            <MinusIcon className="w-4 h-4 text-gray-500" />
          )}
          <span
            className={cn(
              'text-xs font-medium',
              kpi.trend === 'up' && kpi.change > 0 ? 'text-red-500' : '',
              kpi.trend === 'up' && kpi.change < 0 ? 'text-green-500' : '',
              kpi.trend === 'down' && kpi.change < 0 ? 'text-green-500' : '',
              kpi.trend === 'down' && kpi.change > 0 ? 'text-red-500' : '',
              kpi.trend === 'neutral' ? 'text-gray-500' : ''
            )}
          >
            {kpi.change > 0 ? '+' : ''}{kpi.change}%
          </span>
          <span className="text-xs text-gray-500 ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}