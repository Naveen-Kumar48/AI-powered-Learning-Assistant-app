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
    <div className="min-h-screen bg-[#fafbfc] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8 pl-1">
          <h1 className="text-[28px] font-semibold text-slate-800 tracking-tight mb-1">Dashboard</h1>
          <p className="text-[#64748b] text-[15px]">Track your learning progress and activity</p>
        </div>

        {/* Starts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.slice(0, 3).map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.02)] p-6 hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">{stat.label}</h3>
                  <div className="text-[32px] font-semibold text-slate-800 leading-none">
                    {stat.value}
                  </div>
                </div>
                <div className={`w-[46px] h-[46px] rounded-[14px] bg-gradient-to-br ${stat.gradient} ${stat.shadowColor} shadow-md flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.02)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-[42px] h-[42px] rounded-xl bg-[#f1f5f9] flex items-center justify-center">
              <Clock className="w-5 h-5 text-slate-600" strokeWidth={2} />
            </div>
            <h3 className="text-[19px] font-semibold text-slate-800 tracking-tight">
              Recent Activity
            </h3>
          </div>

          {dashboardData.recentActivity && (dashboardData.recentActivity.documents?.length > 0 || dashboardData.recentActivity.quizzess?.length > 0) ? (
            <div className="space-y-4">
              {[
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
                  return (
                    <div key={activity.id || index} className="flex items-center justify-between p-5 border border-gray-100/80 rounded-2xl hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className={`mt-2 w-2 h-2 rounded-full flex-shrink-0 ${activity.type === 'document' ? 'bg-[#0ea5e9]' : 'bg-[#10b981]'}`}></div>
                        <div>
                          <p className="text-[15px] text-slate-800 mb-1 font-medium">
                            {activity.type === 'document' ? 'Accessed Document: ' : 'Attempted Quiz: '}
                            <span className="font-normal text-slate-600">{activity.description}</span>
                          </p>
                          <p className="text-[13px] text-slate-400">
                            {activity.timestamp ? new Date(activity.timestamp).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Invalid Date'}
                          </p>
                        </div>
                      </div>
                      {activity.link && (
                        <a href={activity.link} className="px-4 py-2 text-sm font-semibold text-[#10b981] hover:text-[#059669] transition-colors rounded-lg hover:bg-[#ecfdf5]">
                          View
                        </a>
                      )}
                    </div>
                  );
                })
              }
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-[42px] h-[42px] rounded-xl bg-slate-100 mb-4">
                <Clock className="w-5 h-5 text-slate-400" strokeWidth={2} />
              </div>
              <p className="text-slate-600 font-medium text-[15px]">No recent activity</p>
              <p className="text-[13px] text-slate-500 mt-1">Start learning to see your activity here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
