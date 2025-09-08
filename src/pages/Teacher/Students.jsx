import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchStudents } from "../../services/studentApi.js";

export default function Students() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  if (isLoading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Students</h2>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by class"
          className="border rounded p-2"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <button
          onClick={() => setPage(1)}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Apply
        </button>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">DOB</th>
          </tr>
        </thead>
        <tbody>
          {data?.students?.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.class}</td>
              <td className="border p-2">{s.gender}</td>
              <td className="border p-2">{s.dob?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {data?.currentPage} / {data?.totalPages}
        </span>
        <button
          disabled={page === data?.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
