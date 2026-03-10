import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { KPICard } from './KPICard';
import { mockKPIs } from '../data/mockData';
import { RecentNonConformities } from './RecentNonConformities';
import { RecentActivity } from './RecentActivity';


const monthlyData = [
  { month: 'Jan', nonConformities: 4, documents: 12 },
  { month: 'Feb', nonConformities: 3, documents: 8 },
  { month: 'Mar', nonConformities: 5, documents: 15 },
  { month: 'Apr', nonConformities: 2, documents: 10 },
  { month: 'May', nonConformities: 3, documents: 14 },
  { month: 'Jun', nonConformities: 2, documents: 11 },
];

const severityData = [
  { name: 'Critical', value: 1, color: '#ef4444' },
  { name: 'High', value: 1, color: '#f97316' },
  { name: 'Medium', value: 0, color: '#f59e0b' },
  { name: 'Low', value: 1, color: '#3b82f6' },
];

const DashboardHome = ({ onNavigate }) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Quality Management Dashboard</h1>
                <p className="text-gray-500 mt-1">
                    Overview of quality metrics and system activity
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockKPIs.map((kpi, index) => (
                <KPICard key={index} kpi={kpi} />
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Trends */}
                <Card className="bg-white border-gray-300">
                    <CardHeader>
                        <CardTitle>Monthly Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                            type="monotone"
                            dataKey="nonConformities"
                            stroke="#ef4444"
                            strokeWidth={2}
                            name="Non-Conformities"
                            />
                            <Line
                            type="monotone"
                            dataKey="documents"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            name="Documents"
                            />
                        </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Non-Conformities by Severity */}
                <Card className="bg-white border-gray-300">
                    <CardHeader>
                        <CardTitle>Non-Conformities by Severity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                            data={severityData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            >
                            {severityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Non-Conformities and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentNonConformities 
                    onViewAll={() => onNavigate('non-conformities')} 
                />
                <RecentActivity />
            </div>
        </div>
    );
};

export default DashboardHome;