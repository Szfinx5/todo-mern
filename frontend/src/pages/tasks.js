import Navbar from "@/components/NavBar";
import Tasks from "@/components/Tasks";
import axios from "axios";

const TasksPage = ({ tasks }) => {
  return (
    <>
      <Navbar from={"tasks"} />
      <Tasks tasks={tasks} />
    </>
  );
};

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

    const taskResponse = await axios.get(`${URL}/task`, {
      headers: { Cookie: cookies },
      withCredentials: true,
    });

    return {
      props: {
        tasks: taskResponse.data.message || [],
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

export default TasksPage;
