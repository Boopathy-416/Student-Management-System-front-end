import { useQuery } from "@tanstack/react-query";
import { fetchStudentStats } from "../../services/studentApi";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

export default function DashboardHome() {
    const { data, isLoading, isError } = useQuery({
    queryKey: ["student-stats"],
    queryFn: fetchStudentStats,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No stats available</p>;

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Total Students */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-bold">Total Students</h2>
        <p className="text-3xl mt-2">{data.total}</p>
      </div>

      {/* Students per class */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-bold">Students Per Class</h2>
        <BarChart width={300} height={200} data={data.perClass}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* Gender Ratio */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-bold">Gender Ratio</h2>
        <PieChart width={300} height={200}>
          <Pie
            data={data.genderRatio}
            dataKey="count"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.genderRatio.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
