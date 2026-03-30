import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Save, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import useLanguage from '../../hooks/useLanguage';
import useTranslations  from "../../hooks/useTranslations";


const SettingsPage = () => {
    const { language, setLanguage } = useLanguage();
    const { t } = useTranslations();

    const handleLanguageChange = (value) => {
        setLanguage(value);
        toast.success(
            value === 'en'
            ? 'Language changed to English'
            : 'Idioma cambiado a Español'
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('settingsPanel.title')}</h1>
                <p className="text-gray-500 mt-1">
                    {t('settingsPanel.subtitle')}
                </p>
            </div>

            {/* General Settings */}
            <Card
                className="bg-white border-gray-300"
            >
                <CardHeader>
                    <CardTitle
                        className="text-lg font-semibold text-gray-900"
                    >
                        {t('settingsPanel.generalSettings.label')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="language" className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            {t('settingsPanel.generalSettings.languages.label')}
                        </Label>
                        <Select value={language} onValueChange={handleLanguageChange}>
                            <SelectTrigger id="language">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-100">
                                <SelectItem value="en">{t('settingsPanel.generalSettings.languages.options.english')}</SelectItem>
                                <SelectItem value="es">{t('settingsPanel.generalSettings.languages.options.spanish')}</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-gray-500">
                            {t('settingsPanel.generalSettings.languages.description')}
                        </p>
                    </div>
                    <Separator 
                        className="border border-gray-300"
                    />
                    <div className="space-y-2">
                        <Label htmlFor="company-name">{t('settingsPanel.generalSettings.company.label')}</Label>
                        <Input 
                            id="company-name" 
                            defaultValue="Quality Management Corp." 
                            className="border-gray-100 bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company-email">{t('settingsPanel.generalSettings.company.email')}</Label>
                        <Input
                            id="company-email"
                            type="email"
                            defaultValue="contact@qms.company.com"
                            className="border-gray-100 bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timezone">{t('settingsPanel.generalSettings.company.timezone')}</Label>
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
                        {t('settingsPanel.nonConformitySettings.label')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>{t('settingsPanel.nonConformitySettings.autoAssign.label')}</Label>
                            <p className="text-sm text-gray-500">
                                {t('settingsPanel.nonConformitySettings.autoAssign.description')}
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator 
                        className="border border-gray-300"
                    />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>{t('settingsPanel.nonConformitySettings.deadlineReminders.label')}</Label>
                            <p className="text-sm text-gray-500">
                                {t('settingsPanel.nonConformitySettings.deadlineReminders.description')}
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator 
                        className="border border-gray-300"
                    />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                        <Label>{t('settingsPanel.nonConformitySettings.evidenceForClousure.label')}</Label>
                        <p className="text-sm text-gray-500">
                            {t('settingsPanel.nonConformitySettings.evidenceForClousure.description')}
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
                        {t('settingsPanel.documentSettings.label')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>{t('settingsPanel.documentSettings.versionControl.label')}</Label>
                            <p className="text-sm text-gray-500">
                                {t('settingsPanel.documentSettings.versionControl.description')}
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator 
                        className="border border-gray-300"
                    />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>{t('settingsPanel.documentSettings.approvalWorkflow.label')}</Label>
                            <p className="text-sm text-gray-500">
                                {t('settingsPanel.documentSettings.approvalWorkflow.description')}
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator 
                        className="border border-gray-300"
                    />
                    <div className="space-y-2">
                        <Label htmlFor="retention-period">{t('settingsPanel.documentSettings.retentionPeriod')}</Label>
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
                        {t('settingsPanel.notificationSettings.label')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>{t('settingsPanel.notificationSettings.emailNotifications.label')}</Label>
                            <p className="text-sm text-gray-500">
                                {t('settingsPanel.notificationSettings.emailNotifications.description')}
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator 
                        className="border border-gray-300"  
                    />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>{t('settingsPanel.notificationSettings.dailyDigest.label')}</Label>
                            <p className="text-sm text-gray-500">
                                {t('settingsPanel.notificationSettings.dailyDigest.description')}
                            </p>
                        </div>
                        <Switch />
                    </div>
                    <Separator 
                        className="border border-gray-300"
                    />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>{t('settingsPanel.notificationSettings.systemAlerts.label')}</Label>
                            <p className="text-sm text-gray-500">
                                {t('settingsPanel.notificationSettings.systemAlerts.description')}
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
                    {t('settingsPanel.saveButton')}
                </Button>
            </div>
        </div>
  );
};

export default SettingsPage;