import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import { Toaster } from './components/ui/sonner'
import Header from './components/layout/Header'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
        <main>
        </main>

        {/* Toast Notifications */}
        <Toaster position="top-right" />
      </div>
    </div>
  )
}

export default App
