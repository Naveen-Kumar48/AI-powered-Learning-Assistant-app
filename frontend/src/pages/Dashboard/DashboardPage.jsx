import React, { useState, useEffect } from "react";
import Spinner from "../../components/common/Spinner";
import progressService from "../../Services/progressService.js";
import toast from "react-hot-toast";
import {
  FileText,
  BookOpen,
  BrainCircuit,
  TrendingUp,
  Clock,
} from "lucide-react";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await progressService.getDashboardData();
        console.log("Data__getDashboard", data);
        setDashboardData(data.data);
      } catch (error) {
        toast.error("Failed to fetch Dashboard data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if(loading){
      return <Spinner/>
    }
    }
    if(!dashboardData || !dashboardData.overview) {
      return (
        <div classname="">
          <div classname="">
            <div classname="">
              <TrendingUp className="" />
              <p className=""> No dashboard data available.</p>
            </div>
          </div>
        </div>
      );
    }
    const stats=[{
      label:'Total Documents',
      value:dashboardData.overview.totalDocuments,
      icon:FileText,
      gradient:'from-blue-400 to-cyan-500',
  shadowColor:'shadow-blue-500/20',
      }]
  }, []);
  return <div>DashboardPage</div>;
};

export default DashboardPage;
