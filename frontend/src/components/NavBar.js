import Link from "next/link";
import axios from "axios";
import { useCallback } from "react";

const Navbar = ({ from }) => {
  const links = {
    tasks: { text: "Logout", path: "/login" },
    login: { text: "Register", path: "/register" },
    default: { text: "Login", path: "/login" },
  };
  const { text: linkText, path: linkPath } = links[from] || links.default;

  const handleLogout = useCallback(async () => {
    if (linkText === "Logout") {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, {
        withCredentials: true,
      });
    }
  }, [linkText]);

  return (
    <div className="navbar">
      <h1>Todo App</h1>
      <div className="links">
        <Link href={linkPath} onClick={handleLogout}>
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
