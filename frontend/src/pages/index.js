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

    const { data } = await axios.get(`${process.env.BACKEND_URL}/user/me`, {
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
