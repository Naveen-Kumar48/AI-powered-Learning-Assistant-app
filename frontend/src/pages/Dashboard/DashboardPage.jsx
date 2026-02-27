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

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4">
            <TrendingUp className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600 text-sm">No dashboard data available.</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Documents",
      value: dashboardData.overview.totalDocuments,
      icon: FileText,
      gradient: "from-blue-400 to-cyan-500",
      shadowColor: "shadow-blue-500/25",
    },
    {
      label: "Total Flashcards",
      value: dashboardData.overview.totalFlashcards,
      icon: BookOpen,
      gradient: "from-purple-400 to-pink-500",
      shadowColor: "shadow-purple-500/25",
    },
    {
      label: "Total Quizzes",
      value: dashboardData.overview.totalQuizzes,
      icon: BrainCircuit,
      gradient: "from-green-400 to-emerald-500",
      shadowColor: "shadow-emerald-500/25",
    },
    {
      label: "Average Accuracy",
      value: dashboardData.overview.averageAccuracy,
      icon: TrendingUp,
      gradient: "from-orange-400 to-red-500",
      shadowColor: "shadow-orange-500/25",
    },
    {
      label: "Time Spent",
      value: dashboardData.overview.timeSpent,
      icon: Clock,
      gradient: "from-blue-400 to-cyan-500",
      shadowColor: "shadow-blue-500/25",
    },
  ];
  return;
  <div className="">
    <div className="">
      <div className="">
        {/* Header */}
        <div className="">
          <h1> Dashboard</h1>
          <p>Track your Learning</p>
        </div>
        {/* Starts Grid */}
        <div className="">
          {stats.map((stat, index) => {
            <div key={index} className="">
              <div></div>
              <span className="">{stat.label}</span>
            </div>;
            <div className={`w-11  h-11 rounded-xl bg-linear-to-br ${stat.gradient} shadow-lg ${stat.shadowColor} flex items-center- group-hover:scale-110 transtion-transform duration-300`}> 
            <stat.icon className="" strokeWidth={2}>
            </div>
            <div className="">
              {stat.value}
                 </div>
      </div>
    </div>
            </div>
          })}
     {/* Recent Activity section */}
     <div className="">
      <div className="">
        <div className="">
<Clock className="" strokeWidth={2}/>

        </div>
        <h3 className="">
          Recent Activity
        </h3>
      </div>
      {dashboardData.recentActivity&&(dashboardData.recentActivity.documents.length>0|| dashboardData.recentActivity.quizzess.length>0)?(
        <div className="">
          {
            [
              ...(dashboardData.recentActivity.documents|| []).map(doc=>(
                {
                  id:doc._id,
                  description:doc.title,
                  timestamp:doc.lastAccessed,
                  link:`/documents/${doc._id}`,
                  type:'document'
                   


                }
              )),
             ...(dashboardData.recentActivity.quizzess||[]).map(quiz=>({
               id:quiz._id,
               
             }))
            ]
          }
        </div>
      )}
     </div>
  </div>;

};

export default DashboardPage;
