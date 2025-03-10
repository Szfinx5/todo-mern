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

    if (cookies) {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
        {
          headers: { Cookie: cookies },
          withCredentials: true,
        }
      );

      console.log("User is authenticated:", data);

      return {
        redirect: {
          destination: "/tasks",
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.log("User not authenticated:", error.message);
  }

  return {
    props: {},
  };
}

export default LoginPage;
