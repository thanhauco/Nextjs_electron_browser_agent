import { useEffect, useState } from 'react';

interface Process {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
}

const MOCK_PROCESSES = [
  'chrome.exe',
  'firefox.exe',
  'node.exe',
  'vscode.exe',
  'spotify.exe',
  'discord.exe',
  'slack.exe',
];

export default function ProcessList() {
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    const updateProcesses = () => {
      const mockProcesses = MOCK_PROCESSES.map((name, index) => ({
        pid: Math.floor(Math.random() * 10000),
        name,
        cpu: Math.random() * 20,
        memory: Math.floor(Math.random() * 500),
      }));

      setProcesses(mockProcesses.sort((a, b) => b.cpu - a.cpu));
    };

    updateProcesses();
    const interval = setInterval(updateProcesses, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Active Processes</h2>
      <div className="space-y-3">
        <div className="grid grid-cols-4 text-sm text-gray-400 pb-2">
          <span>Process</span>
          <span>PID</span>
          <span>CPU</span>
          <span>Memory</span>
        </div>
        {processes.map((process) => (
          <div
            key={process.pid}
            className="grid grid-cols-4 bg-gray-700 p-3 rounded text-sm"
          >
            <span className="truncate">{process.name}</span>
            <span className="text-gray-400">{process.pid}</span>
            <span className="text-blue-400">{process.cpu.toFixed(1)}%</span>
            <span className="text-green-400">{process.memory} MB</span>
          </div>
        ))}
      </div>
    </div>
  );
}