import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';
import { PageTransition } from '../components/PageTransition';
import { useAuthStore } from '../store/useAuthStore';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  // Dummy data for sales chart
  const salesData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [30, 45, 60, 55, 75, 90],
        borderColor: 'rgb(var(--color-secondary))',
        backgroundColor: 'rgba(var(--color-secondary), 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Dummy data for reader engagement
  const readerData: ChartData<'bar'> = {
    labels: ['Story 1', 'Story 2', 'Story 3', 'Story 4', 'Story 5'],
    datasets: [
      {
        label: 'Readers',
        data: [120, 90, 150, 85, 200],
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
    <PageTransition>
      <div className="min-h-screen p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-serif mb-4">Welcome, {user?.username}</h1>
            <p className="text-[rgb(var(--color-text))]/70">Your creative journey continues here</p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[rgb(var(--color-card))] rounded-lg p-6">
              <h3 className="text-[rgb(var(--color-secondary))] mb-2">Published Works</h3>
              <p className="text-3xl font-serif">{user?.stats.published}</p>
            </div>
            <div className="bg-[rgb(var(--color-card))] rounded-lg p-6">
              <h3 className="text-[rgb(var(--color-secondary))] mb-2">Followers</h3>
              <p className="text-3xl font-serif">{user?.stats.followers}</p>
            </div>
            <div className="bg-[rgb(var(--color-card))] rounded-lg p-6">
              <h3 className="text-[rgb(var(--color-secondary))] mb-2">Revenue</h3>
              <p className="text-3xl font-serif">{user?.stats.revenue}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-[rgb(var(--color-card))] rounded-lg p-6">
              <h2 className="text-2xl font-serif mb-6">Monthly Sales</h2>
              <Line data={salesData} options={chartOptions} />
            </div>
            <div className="bg-[rgb(var(--color-card))] rounded-lg p-6">
              <h2 className="text-2xl font-serif mb-6">Reader Engagement</h2>
              <Bar data={readerData} options={chartOptions} />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[rgb(var(--color-card))] rounded-lg p-8">
            <h2 className="text-2xl font-serif mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[rgb(var(--color-border))]">
                <div>
                  <p className="font-medium">New Story Published</p>
                  <p className="text-sm text-[rgb(var(--color-text))]/70">The Crystal Scepter</p>
                </div>
                <span className="text-sm text-[rgb(var(--color-text))]/70">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[rgb(var(--color-border))]">
                <div>
                  <p className="font-medium">New Subscriber</p>
                  <p className="text-sm text-[rgb(var(--color-text))]/70">WordWeaver joined your circle</p>
                </div>
                <span className="text-sm text-[rgb(var(--color-text))]/70">5 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Story Milestone</p>
                  <p className="text-sm text-[rgb(var(--color-text))]/70">1000 reads achieved</p>
                </div>
                <span className="text-sm text-[rgb(var(--color-text))]/70">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};