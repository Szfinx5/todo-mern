import Navbar from "@/components/NavBar";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="not-found">
      <Navbar from={"not-found"} />
      <p>The page can not be found</p>
      <Link href="login">Login</Link>
    </div>
  );
};

export default NotFound;
