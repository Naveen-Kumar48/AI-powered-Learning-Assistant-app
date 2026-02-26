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
      <div className={`fixed inset-0  bg-black/30 z-40 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}
        aria-hidden="true"></div>

      <aside className={`fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-lg border-r border-slate-200/60 z-50 md:relative md:relative md:w-64 md:shrink-0 md:flex md:flex-col md:translate-x-0  transition-transform duration-300 ease-in-out  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logoot and Close Button  for Mobile*/}
        <div className=' flex item-center justify-between h-16  px-5'>
          <div>
            <div className='flex items-center gap-2'>
              <BrainCircuit size={20} strokeWidth={2.5} className='text-slate-900' />
            </div>
            <h1 className='text-sm font-bold text-slate-500'>AI Learning Assistant</h1>
            <button onClick={toggleSidebar} className='md:hidden inline-flex items-center justify-center w-10 h-10 text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200'>
              <X size={24} />
            </button>
          </div>
          {/* Navigation */}
          <nav className='flex flex-col gap-2 mt-8'>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={toggleSidebar}
                className={({ isActive }) => `group flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive ? 'bg-linear-to-r from-emerald-500 to-teal-700 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                {({ isActive }) => (
                  <>
                    <link.icon
                      size={18}
                      strokeWidth={2.5}
                      className={`transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110 '}`}
                    />
                   {link.text}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="mt-auto pt-8">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut size={18} strokeWidth={2.5} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar