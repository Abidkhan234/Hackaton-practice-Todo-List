import TodoItem from "./TodoItem";

const TodoList = () => {
  return (
    <div className="flex flex-col gap-3.5 h-full overflow-y-auto overflow-x-hidden">
      <TodoItem />
    </div>
  );
};

export default TodoList;
