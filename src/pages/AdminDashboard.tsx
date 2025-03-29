import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import {
  Users,
  BookOpen,
  DollarSign,
  UserPlus,
  Settings,
  Shield,
  Key,
  Mail,
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { AdminStats, User } from '../types';
import { toast } from 'react-hot-toast';

const mockAdminStats: AdminStats = {
  totalUsers: 1250,
  totalContent: 450,
  totalRevenue: 25000,
  activeUsers: 890,
  newSignups: [45, 52, 38, 65, 42, 58],
  contentCreated: [25, 32, 28, 35, 22, 38],
  revenueHistory: [2500, 3200, 2800, 3500, 2200, 3800],
};

const mockUsers: User[] = [
  {
    id: '1',
    username: 'JohnDoe',
    role: 'author',
    stats: { published: 5, followers: '1.2k', revenue: '$500' }
  },
  {
    id: '2',
    username: 'JaneSmith',
    role: 'reader',
    stats: { published: 0, followers: '0', revenue: '$0' }
  },
];

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'settings'>('overview');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handlePasswordReset = (email: string) => {
    // In production, this would call an API endpoint
    toast.success(`Password reset link sent to ${email}`);
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    // In production, this would call an API endpoint
    toast.success(`User role updated to ${newRole}`);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: 'rgb(var(--color-text))' },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(var(--color-text), 0.1)' },
        ticks: { color: 'rgb(var(--color-text))' },
      },
      y: {
        grid: { color: 'rgba(var(--color-text), 0.1)' },
        ticks: { color: 'rgb(var(--color-text))' },
      },
    },
  };

  const signupsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'New Signups',
      data: mockAdminStats.newSignups,
      borderColor: 'rgb(var(--color-secondary))',
      backgroundColor: 'rgba(var(--color-secondary), 0.1)',
    }],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue ($)',
      data: mockAdminStats.revenueHistory,
      borderColor: 'rgb(var(--color-secondary))',
      backgroundColor: 'rgba(var(--color-secondary), 0.1)',
    }],
  };

  return (
    <PageTransition>
      <div className="min-h-screen p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-serif mb-4">Admin Dashboard</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'overview' ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]' : ''
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'users' ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]' : ''
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'content' ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]' : ''
                }`}
              >
                Content
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'settings' ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]' : ''
                }`}
              >
                Settings
              </button>
            </div>
          </header>

          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Users className="text-[rgb(var(--color-secondary))]" size={24} />
                    <div>
                      <h3 className="text-sm opacity-70">Total Users</h3>
                      <p className="text-2xl font-serif">{mockAdminStats.totalUsers}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
                  <div className="flex items-center gap-4">
                    <BookOpen className="text-[rgb(var(--color-secondary))]" size={24} />
                    <div>
                      <h3 className="text-sm opacity-70">Total Content</h3>
                      <p className="text-2xl font-serif">{mockAdminStats.totalContent}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
                  <div className="flex items-center gap-4">
                    <DollarSign className="text-[rgb(var(--color-secondary))]" size={24} />
                    <div>
                      <h3 className="text-sm opacity-70">Total Revenue</h3>
                      <p className="text-2xl font-serif">${mockAdminStats.totalRevenue}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
                  <div className="flex items-center gap-4">
                    <UserPlus className="text-[rgb(var(--color-secondary))]" size={24} />
                    <div>
                      <h3 className="text-sm opacity-70">Active Users</h3>
                      <p className="text-2xl font-serif">{mockAdminStats.activeUsers}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
                  <h2 className="text-xl font-serif mb-4">New Signups</h2>
                  <Line data={signupsData} options={chartOptions} />
                </div>
                <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
                  <h2 className="text-xl font-serif mb-4">Revenue</h2>
                  <Line data={revenueData} options={chartOptions} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[rgb(var(--color-border))]">
                      <th className="text-left py-4">Username</th>
                      <th className="text-left py-4">Role</th>
                      <th className="text-left py-4">Published</th>
                      <th className="text-left py-4">Followers</th>
                      <th className="text-left py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="border-b border-[rgb(var(--color-border))]">
                        <td className="py-4">{user.username}</td>
                        <td className="py-4">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="bg-[rgb(var(--color-background))] rounded px-2 py-1"
                          >
                            <option value="reader">Reader</option>
                            <option value="author">Author</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="py-4">{user.stats.published}</td>
                        <td className="py-4">{user.stats.followers}</td>
                        <td className="py-4">
                          <button
                            onClick={() => handlePasswordReset('user@example.com')}
                            className="text-[rgb(var(--color-secondary))] hover:underline"
                          >
                            Reset Password
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
              <h2 className="text-xl font-serif mb-4">Content Management</h2>
              {/* Content management features would go here */}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
              <h2 className="text-xl font-serif mb-4">Platform Settings</h2>
              {/* Platform settings would go here */}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};