import Login from "@/components/Login";
import Navbar from "@/components/NavBar";
import axios from "axios";

const LoginPage = () => {
  return (
    <>
      <Navbar from={"login"} />
      <Login />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { req } = context;
    const cookies = req.headers.cookie || "";

    const URL =
      process.env.NEXT_PUBLIC_ENV === "dev"
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.BACKEND_URL;

    if (cookies) {
      const { data } = await axios.get(`${URL}/user/me`, {
        headers: { Cookie: cookies },
        withCredentials: true,
      });

      return {
        redirect: {
          destination: "/tasks",
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      props: {},
    };
  }

  return {
    props: {},
  };
}

export default LoginPage;
