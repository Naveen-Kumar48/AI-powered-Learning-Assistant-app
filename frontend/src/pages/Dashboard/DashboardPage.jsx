import React,{useState,useEffect} from "react"
import Spinner from "../../components/common/Spinner"
import progressService from '../../Services/progressService.js'
import toast from 'react-hot-toast'
import {fileText ,BookOpen  ,BrainCircuit,TrendingUp,Clock} from 'lucide-react'

const DashboardPage = () => {
  const [dashboardData,setDashboardData]=useState(null)
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
const fetchDashboardData=async()=>{
  try {
    const data=await progressService.getDashboardData()
    console.log("Data__getDashboard",data)
    setDashboardData(data.data)
  } catch (error) {
    toast.error("Failed to fetch Dashboard data")
    console.error(error)
    
  }finally
}
  },[])
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage