import Navbar from "@/components/NavBar";
import Tasks from "@/components/Tasks";

const TasksPage = () => {
  return (
    <>
      <Navbar from={"tasks"} />
      <Tasks />
    </>
  );
};

export default TasksPage;
