import React from 'react'
import { useAuth } from "../../components/context/AuthContext"
import { useNavigate } from 'react-router-dom'
import { Bell, User, Menu } from "lucide-react"

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  return <header className="sticky top-0 z-40 w-full h-16 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
    <div className="flex items-center  justify-between h-full px-8">
      {/* Mobile Menu  Button */}
      <button onClick={toggleSidebar}
        className="md:hidden inline-flex items-center justify-center w-10 h-10 text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200">
        <Menu size={24} />
      </button>
      <div className='hidden md:block'>
        <h1 className="text-xl font-bold text-neutral-900">Dashboard</h1>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button className="reletive inline-flex items-center justify-center w-10 h-10 text-slate-600 hover:bg-slate-900 hover-bg-slate-100 rounded-xl transition-all duration-200">
        <Bell size={20} strokeWidth={2} className='group-hover:scale-110 transition-transform duration-200' />
        <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white'></span>
      </button>

      {/* userProfile */}
      <div className="flex items-center gap-3 pl-3 border-l border-slate-200/60">
        <div className="flex items-center  gap-3 px-3  py-1.5 rounded-xl hover:bg-slate-50 transition-colors duration-200 cursor-pointer group" >
          <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover'>
            <User size={18} strokeWidth={2.5} className='group-hover:text-slate-900 transition-colors duration-200' />
          </div>
          <p className="text-neutral-700">{user?.email || 'user@example.com'}</p>
        </div>
      </div>
    </div>
  </header>
}

export default Header