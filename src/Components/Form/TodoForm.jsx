import useTodo from "../../../Context/TodoContext";
import Button from "../UI/Button";
import useUIContext from "../../../Context/UIContext";

const TodoForm = () => {
  const { todo, setTodo, handleAddTodo } = useTodo();

  const { loginUserData } = useUIContext();

  return (
    <div className="flex flex-col gap-4 w-full grow">
      <div className="text-center">
        <h1 className="font-semibold text-4xl">Add Todo</h1>
      </div>
      <div className="flex justify-between items-center border ps-3 bg-gray-200 rounded-full">
        <input
          type="text"
          className="placeholder:text-black font-medium text-base grow outline-none pe-1"
          placeholder="Enter a todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        {loginUserData?.email ? (
          <div className="w-[90px]" onClick={() => handleAddTodo()}>
            <Button isRounded={true} btnText={"Add Todo"} />
          </div>
        ) : (
          <div className="w-[90px]">
            <button className="w-full py-2 font-medium text-base text-gray-500 border border-black rounded-full">
              Add Todo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoForm;
