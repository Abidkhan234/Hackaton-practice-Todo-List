import { motion, AnimatePresence } from "framer-motion";
import useTodo from "../../../Context/TodoContext";
import useUIContext from "../../../Context/UIContext";
import Button from "./Button";

const TodoItem = () => {
  const { loginUserData } = useUIContext();

  const {
    todoList,
    handleDelete,
    todoModal,
    setUpdateTodo,
    setTodoModal,
    handleToggle,
    id,
  } = useTodo();

  return (
    <>
      {loginUserData?.email ? (
        <AnimatePresence>
          {todoList?.map((v, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                x: v.isCompleted ? -200 : 200,
                opacity: 0,
                backgroundColor: v.isCompleted
                  ? "rgb(144, 238, 144)" // lightgreen
                  : "rgb(255, 182, 193)", // lightred/pink
                transition: { duration: 0.4 },
              }}
              className="bg-gray-300 rounded-md font-medium text-base flex justify-between items-center ps-2 cursor-pointer"
              key={v.id}
            >
              <span
                className={`${
                  v.isCompleted ? "text-gray-400 line-through" : "text-black"
                } grow cursor-pointer`}
                onClick={() => handleToggle(v.id)}
              >
                {v.todo}
              </span>
              <div className="flex items-center gap-3.5">
                <button
                  onClick={() => handleDelete(v.id)}
                  className="py-2 px-2.5 bg-red-500 cursor-pointer rounded-md text-white"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setUpdateTodo(v.todo);
                    setTodoModal(true);
                    id.current = v.id;
                  }}
                  className="py-2 px-2.5 bg-blue-500 cursor-pointer rounded-md text-white"
                >
                  Edit
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        <div className="w-full bg-gray-200 flex justify-center items-center">
          <h1 className="font-bold text-3xl text-gray-500">Login First</h1>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {todoModal && <UpdateTodoModal todoId={id.current} />}
      </AnimatePresence>
    </>
  );
};

const UpdateTodoModal = ({ todoId }) => {
  const { handleEdit, updateTodo, setUpdateTodo, setTodoModal } = useTodo();

  return (
    <motion.div
      initial={{ y: "100%", scale: 0.8, opacity: 0 }}
      animate={{ y: "-50%", scale: 1, opacity: 1 }}
      exit={{ y: "100%", scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-[50%] left-[50%] translate-x-[-50%] w-full max-w-[500px] bg-neutral-900/85  rounded-md z-50 h-full max-h-[250px]"
    >
      <div className="flex justify-end items-center">
        <button
          className="text-lg bg-red-500 rounded-bl-sm rounded-tl-sm py-1 px-3 text-white cursor-pointer"
          onClick={() => {
            setUpdateTodo("");
            setTodoModal(false);
          }}
        >
          X
        </button>
      </div>
      <div className="flex justify-center items-center grow w-full h-full">
        <div className="flex w-full justify-between items-center border ps-3 bg-gray-200 rounded-full">
          <input
            type="text"
            className="placeholder:text-black font-medium text-base grow outline-none pe-1"
            placeholder="Enter a todo"
            value={updateTodo}
            onChange={(e) => setUpdateTodo(e.target.value)}
          />
          <div className="w-[110px]" onClick={() => handleEdit(todoId)}>
            <Button isRounded={true} btnText={"Update Todo"} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoItem;
