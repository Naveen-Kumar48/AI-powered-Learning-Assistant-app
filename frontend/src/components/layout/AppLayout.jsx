import React,{useState} from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const AppLayout = ({children}) => {
  const [isSidebarOpen,setIsSidebarOpen]=useState(false)
  const toggleSidebar =()=>{
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (  
    <div className="flex h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar}/>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout