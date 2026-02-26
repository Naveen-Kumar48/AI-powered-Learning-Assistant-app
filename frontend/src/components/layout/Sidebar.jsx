import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from "../../components/context/AuthContext"
import { LayoutDashboard, FileText, User, BrainCircuit, BookOpen, X, LogOut } from 'lucide-react'

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navLinks = [
    {
      to: "/dashboard",
      icon: LayoutDashboard,
      text: "Dashboard"
    },
    {
      to: "/documents",
      icon: FileText,
      text: "Documents"
    },
    {
      to: "/flashcards",
      icon: BookOpen,
      text: "Flashcards"
    },
    {
      to: "/profile",
      icon: User,
      text: "Profile"
    }
  ]

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
        aria-hidden="true"
      ></div>

      <aside className={`fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-lg border-r border-slate-200/60 z-50 md:relative md:w-64 md:shrink-0 md:flex md:flex-col md:translate-x-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo and Close Button for Mobile */}
        <div className='flex items-center justify-between h-16 px-5 border-b border-slate-200/60'>
          <div className='flex items-center gap-2'>
            <BrainCircuit size={24} strokeWidth={2.5} className='text-emerald-600' />
            <h1 className='text-sm font-bold text-slate-800 tracking-tight'>AI Learning Assistant</h1>
          </div>
          <button onClick={toggleSidebar} className='md:hidden inline-flex items-center justify-center w-10 h-10 text-slate-500 hover:bg-slate-100 rounded-xl transition-all duration-200'>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex flex-col gap-2 mt-6 px-4 flex-1'>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={toggleSidebar}
                className={({ isActive }) => `group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={`transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`}
                    />
                    {link.text}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto p-4 border-t border-slate-200/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut size={18} strokeWidth={2} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar