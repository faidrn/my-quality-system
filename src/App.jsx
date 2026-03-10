import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import { Toaster } from './components/ui/sonner'
import Header from './components/layout/Header'
import DashboardHome from './components/dashboard/DashboardHome'
import DocumentsPage from './components/documents/DocumentsPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome onNavigate={setCurrentPage} />;
      case 'documents':
        return <DocumentsPage />;
      case 'non-conformities':
        return <NonConformitiesPage />;
      case 'users':
        return <UserManagementPage />;
      case 'audit-logs':
        return <AuditLogsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardHome onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:w-screen">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isMobileOpen={isMobileMenuOpen}
        onMobileToggle={toggleMobileMenu}
      />

      {/* Main Content */}
      <div
        className='lg:pl-64'
      >
        {/* Header */}
        <Header onMobileMenuToggle={toggleMobileMenu} />

        {/* Page Content */}
        <main className='p-4 lg:p-6'>
          {renderPage()}
        </main>

        {/* Toast Notifications */}
        <Toaster position="top-right" />
      </div>
    </div>
  )
}

export default App
