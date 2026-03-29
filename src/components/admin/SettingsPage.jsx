import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Save } from 'lucide-react';


const SettingsPage = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
                <p className="text-gray-500 mt-1">Configure system preferences and options</p>
            </div>

            {/* General Settings */}
            <Card
                className="bg-white border-gray-300"
            >
                <CardHeader>
                    <CardTitle
                        className="text-lg font-semibold text-gray-900"
                    >
                        General Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input 
                            id="company-name" 
                            defaultValue="Quality Management Corp." 
                            className="border-gray-100 bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company-email">Company Email</Label>
                        <Input
                            id="company-email"
                            type="email"
                            defaultValue="contact@qms.company.com"
                            className="border-gray-100 bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input 
                            id="timezone" 
                            defaultValue="UTC-05:00 (Eastern Time)" 
                            className="border-gray-100 bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Non-Conformity Settings */}
            <Card
                className="bg-white border-gray-300"
            >
                <CardHeader>
                    <CardTitle
                        className="text-lg font-semibold text-gray-900"
                    >
                        Non-Conformity Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Auto-assign non-conformities</Label>
                            <p className="text-sm text-gray-500">
                                Automatically assign based on category and department
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator 
                        className="border border-gray-300"
                    />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Send deadline reminders</Label>
                            <p className="text-sm text-gray-500">
                                Email reminders 3 days before deadline
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator 
                        className="border border-gray-300"
                    />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                        <Label>Require evidence for closure</Label>
                        <p className="text-sm text-gray-500">
                            Mandate evidence upload before closing NC
                        </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            {/* Document Settings */}
            <Card
                className="bg-white border-gray-300"
            >
                <CardHeader>
                    <CardTitle
                        className="text-lg font-semibold text-gray-900"
                    >
                        Document Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Enable version control</Label>
                            <p className="text-sm text-gray-500">
                                Track document versions and changes
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator 
                        className="border border-gray-300"
                    />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Require approval workflow</Label>
                            <p className="text-sm text-gray-500">
                                Documents must be approved before publication
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator 
                        className="border border-gray-300"
                    />
                    <div className="space-y-2">
                        <Label htmlFor="retention-period">Document Retention Period (years)</Label>
                        <Input 
                            id="retention-period" 
                            type="number" 
                            defaultValue="7" 
                            className="border-gray-100 bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card
                className="bg-white border-gray-300"
            >
                <CardHeader>
                    <CardTitle
                        className="text-lg font-semibold text-gray-900"
                    >
                        Notification Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Email notifications</Label>
                            <p className="text-sm text-gray-500">
                                Send email for important updates
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator 
                        className="border border-gray-300"  
                    />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Daily digest</Label>
                            <p className="text-sm text-gray-500">
                                Receive daily summary of activities
                            </p>
                        </div>
                        <Switch />
                    </div>
                    <Separator 
                        className="border border-gray-300"
                    />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>System alerts</Label>
                            <p className="text-sm text-gray-500">
                                Critical system notifications
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                </Button>
            </div>
        </div>
  );
};

export default SettingsPage;