import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(storedUser);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className=" flex font-satoshi mt-20 items-center justify-center ">
      <div className="  rounded-lg w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h2>
        <p>
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <div className="pt-36">
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
