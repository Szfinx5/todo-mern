import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const Tasks = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/task`,
          { withCredentials: true }
        );
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        router.push("/login");
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
    </div>
  );
};
export default Tasks;
