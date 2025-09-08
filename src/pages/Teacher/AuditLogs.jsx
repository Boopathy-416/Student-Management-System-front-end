import { useQuery } from "@tanstack/react-query";
import { fetchAuditLogs } from "../../services/studentApi";

export default function AuditLogs() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["auditLogs"],
    queryFn: fetchAuditLogs,
  });

  if (isLoading) return <p>Loading logs...</p>;
  if (error) return <p>Error loading logs: {error.message}</p>;

  
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Audit Logs</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border p-2">User</th>
            <th className="border p-2">Action</th>
            <th className="border p-2">Target</th>
            <th className="border p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((log) => (
            <tr key={log._id}>
              <td className="border p-2">{log.user}</td>
              <td className="border p-2">{log.action}</td>
              <td className="border p-2">{log.target}</td>
              <td className="border p-2">
                {new Date(log.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
