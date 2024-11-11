import { useState, useEffect } from 'react';
import { 
  CpuChipIcon, 
  CircleStackIcon, 
  ClockIcon 
} from '@heroicons/react/24/solid';

interface SystemInfo {
  cpuUsage: number;
  memoryUsage: number;
  uptime: number;
}

export default function SystemStats() {
  const [stats, setStats] = useState<SystemInfo>({
    cpuUsage: 0,
    memoryUsage: 0,
    uptime: 0
  });

  useEffect(() => {
    const updateStats = () => {
      // Simulate system stats for demo
      setStats({
        cpuUsage: Math.random() * 100,
        memoryUsage: Math.random() * 100,
        uptime: Math.floor(Date.now() / 1000)
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <h2 className="text-xl font-semibold mb-6">System Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<CpuChipIcon className="h-6 w-6" />}
          title="CPU Usage"
          value={`${Math.round(stats.cpuUsage)}%`}
          color="text-blue-400"
        />
        <StatCard
          icon={<CircleStackIcon className="h-6 w-6" />}
          title="Memory Usage"
          value={`${Math.round(stats.memoryUsage)}%`}
          color="text-green-400"
        />
        <StatCard
          icon={<ClockIcon className="h-6 w-6" />}
          title="Uptime"
          value={`${Math.floor(stats.uptime / 3600)}h`}
          color="text-purple-400"
        />
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <span className={color}>{icon}</span>
        <span className="text-sm text-gray-300">{title}</span>
      </div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}