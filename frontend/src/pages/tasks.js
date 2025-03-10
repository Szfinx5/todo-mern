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

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
      {
        headers: { Cookie: cookies },
        withCredentials: true,
      }
    );

    const taskResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/task`,
      {
        headers: { Cookie: cookies },
        withCredentials: true,
      }
    );

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
