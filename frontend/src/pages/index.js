import axios from "axios";

const Home = () => {};

export async function getServerSideProps(context) {
  try {
    const { req } = context;
    const cookies = req.headers.cookie;

    if (!cookies) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const URL =
      process.env.NEXT_PUBLIC_ENV === "dev"
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.BACKEND_URL;

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
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export default Home;
