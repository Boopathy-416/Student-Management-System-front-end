import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { UserRound, Users } from "lucide-react";

export default function RoleSelection() {
  const containerRef = useRef(null);
  const adminRef = useRef(null);
  const employeeRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && adminRef.current && employeeRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 });
      gsap.fromTo(adminRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, delay: 0.3 });
      gsap.fromTo(employeeRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, delay: 0.5 });
    }
  }, []);

  return (
    <div className="flex flex-col h-screen  p-6" ref={containerRef}>
       {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dpm3bum4n/image/upload/v1746289278/fin1_3_febk7z.png')",
        }}
      ></div>
      <div className="flex-1 ring-black/50 backdrop-blur-sm rounded-2xl md:ring-1   md:m-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-center mb-3">Choose Your <mark>Role</mark></h1>
        <p className="text-sm text-center text-gray-600 mb-10 max-w-[300px]">
          Select your role to access the appropriate features and permissions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
          <Link
            to="/auth/admin/signin"
            ref={adminRef}
            className="border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer block"
          >
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <UserRound className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="text-lg font-semibold text-center mb-2">Admin</h2>
            <p className="text-sm text-center text-gray-500">
              Full access to manage users, view reports, and configure system settings
            </p>
          </Link>

          <Link
            to="/auth/teacher/signin"
            ref={employeeRef}
            className="border border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-md transition-all cursor-pointer block"
          >
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-lg font-semibold text-center mb-2">Teacher</h2>
            <p className="text-sm text-center text-gray-500">
              Access to View Dashboard provides statistics and lists collections, and view your performance
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
