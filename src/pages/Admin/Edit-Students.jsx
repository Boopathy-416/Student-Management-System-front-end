import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export default function EditStudents() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
   const { token } = useAuth();  // ✅ now available

  // ✅ Fetch students with pagination
  const { data, isLoading, isError } = useQuery({
    queryKey: ["students", page],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/students?page=${page}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; // {students, total, totalPages, currentPage}
    },
     enabled: !!token, // ✅ wait until token is ready
  });

  const students = data?.students || [];

  // ✅ Mutations (Add, Edit, Delete)
  const addMutation = useMutation({
    mutationFn: (newStudent) =>
      axios.post(`${API_URL}/students`, newStudent, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => queryClient.invalidateQueries(["students"]),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }) =>
      axios.put(`${API_URL}/students/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => queryClient.invalidateQueries(["students"]),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`${API_URL}/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => queryClient.invalidateQueries(["students"]),
  });

  // ✅ Handlers
  const handleAdd = () => {
    const name = prompt("Enter student name:");
    const className = prompt("Enter class:");
    const gender = prompt("Enter gender (male/female):");
    addMutation.mutate({ name, class: className, gender });
  };

  const handleEdit = (student) => {
    const name = prompt("Update name:", student.name);
    const className = prompt("Update class:", student.class);
    const gender = prompt("Update gender:", student.gender);
    updateMutation.mutate({ id: student._id, updates: { name, class: className, gender } });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching students</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Students</h2>

      <button
        onClick={handleAdd}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        ➕ Add Student
      </button>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Roll No</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Class</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">DOB</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="border px-4 py-2">{s.rollNumber || "-"}</td>
              <td className="border px-4 py-2">{s.name}</td>
              <td className="border px-4 py-2">{s.class}</td>
              <td className="border px-4 py-2">{s.gender}</td>
              <td className="border px-4 py-2">
                {s.dob ? new Date(s.dob).toLocaleDateString() : "-"}
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(s)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          ⬅ Prev
        </button>
        <span>
          Page {data.currentPage} of {data.totalPages}
        </span>
        <button
          disabled={page === data.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
