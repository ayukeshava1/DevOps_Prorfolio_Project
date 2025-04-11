// CrashLogMonitor.jsx
import React from 'react';

const CrashLogMonitor = () => {
  const dummyData = [
    { ip: '10.1.1.1', region: 'South', status: 'Crash Detected', time: '2025-04-05 11:42' },
    { ip: '10.1.1.2', region: 'North', status: 'No Crash', time: '2025-04-05 11:45' },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Crash Log Monitor</h2>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th>Node IP</th>
            <th>Region</th>
            <th>Status</th>
            <th>Last Checked</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((node, idx) => (
            <tr key={idx}>
              <td>{node.ip}</td>
              <td>{node.region}</td>
              <td className={node.status === 'Crash Detected' ? 'text-red-600' : 'text-green-600'}>
                {node.status}
              </td>
              <td>{node.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrashLogMonitor;
