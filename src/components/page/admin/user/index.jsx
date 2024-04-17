import AdminLayout from "@/components/layout/AdminLayout";
import userServices from "@/services/auth/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminUserLayout({ data }) {
  const { users, fetchData } = data;
  const session = useSession();
  const [userData, setUserData] = useState(users); 

  const handleDelete = async (userId) => {
    try {
      const result = await userServices.deleteData(
        userId,
        session.data?.accessToken
      );

      setUserData(result.data); 
    } catch (error) {
      console.error(
        "Gagal menghapus pengguna:",
        error.response?.data?.message || "Unknown error occurred"
      );
    }
  };

  useEffect(() => {
fetchData(userData)
  }, [userData]);

  return (
    <AdminLayout>
      <h1>User Page</h1>

      <div className="overflow-x-auto">
        <div className="min-w-screen">
          <div className="mt-4">
            <table className="border-collapse w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-1 text-left">No</th>
                  <th className="px-4 py-2 text-left">Full Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Type Login</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => ( // Menggunakan userData di sini
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {user.fullname ? user.fullname : user.name}
                    </td>

                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      {user.type !== "google" ? "email" : "google"}
                    </td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
