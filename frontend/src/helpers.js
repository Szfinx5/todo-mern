import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const useVerifyUser = (setIsLoading) => {
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
          { withCredentials: true }
        );
        router.push("/tasks");
      } catch (err) {
        router.push("/login");
      }
    };

    fetchUser();
  }, []);
};
