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

  return (
    <div className="min-h-screen">
      <div className=" absolute insert-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30 pointer-events-none">
        <div className=" relative max-w-7xl mx-auto">
          {/* Header */}
          <div className=" mb-16">
            <h1 className=" text-2xl font-medium text-slate-900 tracking-tight mb-2"> Dashboard</h1>
            <p className=" text-slate-500 text-sm">Track your Learning progress and Activity</p>
          </div>
          {/* Starts Grid */}
          <div className=" grid grid-cols-1 md:grid-cols-3  gap-6 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className=" group-relative bg-white/80 backdrop-blur-xl  border border-slate-200/60 shadow-xl shadow-slate-200/50 p-6 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-300 hover:-translate-y-1">

                <div className="flex items-center justify-between" >
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide ">{stat.label}</span>
                  <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${stat.gradient} shadow-lg ${stat.shadowColor} flex items-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <div className="text-3xl font-semibold text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Recent Activity section */}
        <div className="bg-white/80 backdrop-blur-xl  border border-slate-200/60 rounded-2xl shadow-xl shadow-slate-200/50 p-8 ">
          <div className="flex items-center gap-3 mb-6">
            <div className=" w-10 h-10 rounded-xl bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <Clock className="w-5 h-5 text-slate-600" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-medium text-slate-900 tracking-tight">
              Recent Activity
            </h3>
          </div>
          {dashboardData.recentActivity && (dashboardData.recentActivity.documents?.length > 0 || dashboardData.recentActivity.quizzess?.length > 0) ? (
            <div className=" space-y-3">
              {
                [
                  ...(dashboardData.recentActivity.documents || []).map(doc => ({
                    id: doc._id,
                    description: doc.title,
                    timestamp: doc.lastAccessed,
                    link: `/documents/${doc._id}`,
                    type: 'document'
                  })),
                  ...(dashboardData.recentActivity.quizzess || []).map(quiz => ({
                    id: quiz._id,
                    description: quiz.title,
                    timestamp: quiz.lastAccessed,
                    link: `/quizzes/${quiz._id}`,
                    type: 'quiz'
                  }))
                ]
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map((activity, index) => { 
                    const ActivityIcon = activity.type === 'document' ? FileText : BrainCircuit;
                    return (
                      <div key={activity.id || index} className="">
                        <div className=" group flex items-center gap-3 justify-between p-4 rounded-xl bg-slate-50/50 border border-slate-200/60 hover:bg-white/80 hover:border-slate-300/60 hover:shadow-md transition-all duration-200">
                          <div className={`w-2 h-2 rounded-full ${activity.type === 'document' ? 'bg-linear-to-r from-blue-400 to-cyan-500' : 'bg-linear-to-r from-emerald-400 to-teal-500'}`}>
                            <p className="">
                              {activity.type === 'document' ? 'Assessed Document' : 'Attempted Quiz'}
                              <span className="">{activity.description}</span>
                            </p>
                          </div>
                          <p className="">{new Date(activity.timestamp).toLocaleString()}</p>
                        </div>
                        {activity.link && (
                          <a href={activity.link} className="">
                            View
                          </a>
                        )}
                        <div className="">

                        </div>
                      </div>
                    );
                  })
              }
            </div>
          ) : (
            <div className="">
              <div className="">
                <Clock className="" strokeWidth={2} />
                <p className="">No recent activity</p>
                <p>start Learning to see your activity here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
