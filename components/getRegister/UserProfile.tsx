import UserData from "@/lib/user";
import React, { useEffect, useState } from "react";

// // Define the UserData type
// interface UserData {
//   user: {
//     photoUrl: string;
//     name: string;
//     usn: string;
//     type: string;
//   };
// }

// Fetch and display user data
export function UserProfile({ usn }: { usn: string }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/getregister/${usn}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: UserData = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Render the component
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!user) {
    return <p>No user data available</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-6">
        <img
          src={user.photoUrl}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">USN: {user.usn}</p>
          {user.events && user.events.length > 0 && (
            <p className="text-blue-600 font-semibold">
              Events: {user.events.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
