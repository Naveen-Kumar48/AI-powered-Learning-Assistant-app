import React, { useState, useEffect } from 'react'
import { useAuth } from "../../components/context/AuthContext"

import { Bell, User, Menu } from "lucide-react"
import Switch from '../common/NightModeButton'

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth()

  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
 



  return <header className="sticky top-0 z-40 w-full h-16 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
    <div className="flex items-center  justify-between h-full px-8">
      {/* Mobile Menu  Button */}
      <button onClick={toggleSidebar}
        className="md:hidden inline-flex items-center justify-center w-10 h-10 text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200"
        aria-label="Toggle sidebar">
        <Menu size={24} />
      </button>
      <div className='hidden md:block'></div>
    </div>

    <div className="flex items-center gap-3">
      <Switch isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <button className="inline-flex items-center justify-center w-10 h-10 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200 group">
        <div className="relative">
          <Bell size={20} strokeWidth={2} className='group-hover:scale-110 transition-transform duration-200' />
          <span className='absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white translate-x-0.5 -translate-y-0.5'></span>
        </div>
      </button>


      {/* userProfile */}
      <div className="flex items-center gap-3 pl-3 border-l border-slate-200/60">
        <div className="flex items-center  gap-3 px-3  py-1.5 rounded-xl hover:bg-slate-50 transition-colors duration-200 cursor-pointer group" >
          <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-200'>
            <User size={18} strokeWidth={2.5} className='group-hover:text-slate-900 transition-colors duration-200' />
          </div>
          <div className=''>
            <p className="text-sm font-semibold text-slate-900">{user?.username || 'User  '}</p>
            <p className='text-xs font-medium text-slate-500'>{user?.email || 'user@gmail.com'}</p>
          </div>
        </div>
      </div>
    </div>
  </header>
}

export default Header