import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { User, Mail, Lock, CheckCircle2, Save } from 'lucide-react';
import { useAuth } from '../../components/context/AuthContext';
import authService from '../../Services/authService';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';

const ProfilePage = () => {
  const { user, updateUser, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        // Assuming the backend returns { success: true, data: { name, email, ... } }
        const data = response.data || user;
        if (data) {
          setProfileData({
            name: data.username || data.name || '',
            email: data.email || '',
          });
        }
      } catch (error) {
        toast.error('Failed to load profile details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      // Adjusted property name mapping to match expected backend requirements
      const updatedData = await authService.updateProfile({
        username: profileData.name,
        email: profileData.email
      });
      toast.success('Profile updated successfully');
      if (updatedData && updatedData.data) {
        updateUser(updatedData.data);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    setSavingPassword(true);
    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      toast.success('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading || authLoading) {
    return <div className="min-h-[60vh] flex items-center justify-center"><Spinner /></div>;
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title="Account Settings" />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Details Section */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-900"
                    placeholder="Your Name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-900"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={savingProfile}
                className="w-full !bg-blue-600 hover:!bg-blue-700 h-12 rounded-xl text-white font-semibold transition-colors flex justify-center mt-2 shadow-lg shadow-blue-500/20"
              >
                {savingProfile ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Password Update Section */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Security</h2>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none text-slate-900"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none text-slate-900"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none text-slate-900"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                disabled={savingPassword}
                className="w-full !bg-purple-600 hover:!bg-purple-700 h-12 rounded-xl text-white font-semibold transition-colors flex justify-center mt-2 shadow-lg shadow-purple-500/20"
              >
                {savingPassword ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Update Password
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;