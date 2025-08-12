import TodoForm from "../Components/Form/TodoForm";
import TodoList from "../Components/UI/TodoList";

const HomePage = () => {
  return (
    <div className="w-full max-w-[500px] h-full">
      <div className="flex flex-col gap-5 h-full max-h-[500px]">
        <div className="basis-[50%] flex justify-center items-end">
          <TodoForm />
        </div>
        <div className="basis-[50%] overflow-y-auto">
        <TodoList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
