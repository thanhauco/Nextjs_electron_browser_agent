import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#fff'
      }
    }
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#fff'
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#fff'
      }
    }
  }
};

export default function UsageChart() {
  const [data, setData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'CPU Usage',
        data: [] as number[],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Memory Usage',
        data: [] as number[],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const updateChart = () => {
      const now = new Date();
      const timeLabel = now.toLocaleTimeString();

      setData(prev => {
        const newLabels = [...prev.labels, timeLabel].slice(-10);
        const newCpuData = [...prev.datasets[0].data, Math.random() * 100].slice(-10);
        const newMemData = [...prev.datasets[1].data, Math.random() * 100].slice(-10);

        return {
          labels: newLabels,
          datasets: [
            {
              ...prev.datasets[0],
              data: newCpuData,
            },
            {
              ...prev.datasets[1],
              data: newMemData,
            },
          ],
        };
      });
    };

    const interval = setInterval(updateChart, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Usage History</h2>
      <div className="h-[300px]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}