import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

/*  This hook is not used anymore.
    The API calls are made from getServerSideProps functions */
export const useVerifyUser = () => {
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
  }, [router]);
};
