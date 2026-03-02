import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 relative overflow-hidden transition-colors duration-300 dark:bg-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none"></div>

      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative text-center z-10 backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 p-8 md:p-14 rounded-3xl border border-white/80 dark:border-slate-700 shadow-2xl shadow-slate-200/50 dark:shadow-none max-w-lg w-full mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 mb-8 border border-white dark:border-slate-600 shadow-sm">
          <Compass className="w-10 h-10 text-emerald-600 dark:text-emerald-400 animate-pulse" strokeWidth={1.5} />
        </div>

        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400 dark:from-emerald-400 dark:to-teal-300 mb-4 tracking-tight drop-shadow-sm">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
          Page not found
        </h2>

        <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed text-sm md:text-base font-medium px-4">
          Oops! It seems you've ventured into uncharted territory.
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="group inline-flex items-center gap-2 px-8 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-500/25 dark:shadow-none active:scale-95 hover:-translate-y-1"
        >
          <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;