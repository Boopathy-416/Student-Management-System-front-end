import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Table from "../Admin/components/ui/Table";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

export default function ImportExport() {
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Fetch Students with pagination
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["students", page],
    queryFn: async () => {
      const res = await axios.get(
        `${API_URL}/students?page=${page}&limit=${pageSize}`,
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      return res.data; // Expect {students: [], totalPages: n}
    },
    keepPreviousData: true,
  });

  const students = data?.students || [];
  const totalPages = data?.totalPages || 1;

  // Handle Import
  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choose a file first!");
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`${API_URL}/excel/import`, formData, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Import Success ✅");
      refetch();
    } catch (err) {
      alert("Import Failed ❌");
      console.error(err.response?.data || err.message);
    }
  };

  // Handle Export
  const handleExport = async () => {
    try {
      const res = await axios.get(`${API_URL}/excel/export`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "students_export.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("Export Failed ❌");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Excel Import / Export</h2>

      {/* Upload */}
      <form onSubmit={handleImport} className="space-y-4">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="block border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Import Excel
        </button>
      </form>

      {/* Export */}
      <button
        onClick={handleExport}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Export Excel
      </button>

      {/* Students Table */}
      <h3 className="mt-6 text-lg font-semibold">Students List</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table
            data={students}
            columns={[
              { key: "name", header: "Name" },
              { key: "class", header: "Class" },
              { key: "gender", header: "Gender" },
              { key: "dob", header: "DOB" },
            ]}
          />

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
