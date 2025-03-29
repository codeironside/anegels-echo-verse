import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { BookOpen, Users, TrendingUp } from 'lucide-react';

interface AuthorStatsProps {
  contentId: string;
}

export const AuthorStats: React.FC<AuthorStatsProps> = ({ contentId }) => {
  // Mock data for demonstration
  const readerData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Readers',
        data: [120, 150, 180, 250, 300, 450],
        borderColor: 'rgb(var(--color-secondary))',
        backgroundColor: 'rgba(var(--color-secondary), 0.1)',
        tension: 0.4,
      },
    ],
  };

  const engagementData = {
    labels: ['Comments', 'Likes', 'Shares', 'Bookmarks', 'Time Spent'],
    datasets: [
      {
        label: 'Engagement Metrics',
        data: [85, 120, 45, 60, 200],
        backgroundColor: 'rgba(var(--color-secondary), 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(var(--color-text))',
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(var(--color-text), 0.1)',
        },
        ticks: {
          color: 'rgb(var(--color-text))',
        },
      },
      y: {
        grid: {
          color: 'rgba(var(--color-text), 0.1)',
        },
        ticks: {
          color: 'rgb(var(--color-text))',
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <BookOpen className="text-[rgb(var(--color-secondary))]" size={24} />
            <div>
              <h3 className="text-sm opacity-70">Total Reads</h3>
              <p className="text-2xl font-serif">1,245</p>
            </div>
          </div>
        </div>
        <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <Users className="text-[rgb(var(--color-secondary))]" size={24} />
            <div>
              <h3 className="text-sm opacity-70">Unique Readers</h3>
              <p className="text-2xl font-serif">892</p>
            </div>
          </div>
        </div>
        <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <TrendingUp className="text-[rgb(var(--color-secondary))]" size={24} />
            <div>
              <h3 className="text-sm opacity-70">Avg. Time Spent</h3>
              <p className="text-2xl font-serif">12m 30s</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
          <h2 className="text-xl font-serif mb-4">Reader Growth</h2>
          <Line data={readerData} options={chartOptions} />
        </div>
        <div className="bg-[rgb(var(--color-card))] p-6 rounded-lg">
          <h2 className="text-xl font-serif mb-4">Engagement Metrics</h2>
          <Bar data={engagementData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};