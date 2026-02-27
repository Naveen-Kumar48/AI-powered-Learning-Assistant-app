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
      <div className=" absolute insert-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16 px_16px] opacity-30 pointer-events-none">
        <div className="">
          {/* Header */}
          <div className="">
            <h1> Dashboard</h1>
            <p>Track your Learning</p>
          </div>
          {/* Starts Grid */}
          <div className="">
            {stats.map((stat, index) => (
              <div key={index} className="">
                <div></div>
                <span className="">{stat.label}</span>
                <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${stat.gradient} shadow-lg ${stat.shadowColor} flex items-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="" strokeWidth={2} />
                </div>
                <div className="">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Recent Activity section */}
        <div className="">
          <div className="">
            <div className="">
              <Clock className="" strokeWidth={2} />
            </div>
            <h3 className="">
              Recent Activity
            </h3>
          </div>
          {dashboardData.recentActivity && (dashboardData.recentActivity.documents?.length > 0 || dashboardData.recentActivity.quizzess?.length > 0) ? (
            <div className="">
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
                        <div className="">
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
