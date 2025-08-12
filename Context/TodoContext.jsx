import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  updateAndSaveToLocalStorage,
} from "../src/Utils/localStorageHelper.js";
import toast from "react-hot-toast";
import useUIContext from "./UIContext.jsx";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { validateUserLogin } = useUIContext();

  // States
  const [todoList, setTodoList] = useState(
    getFromLocalStorage("todoList") || []
  );
  const [todo, setTodo] = useState("");
  const [updateTodo, setUpdateTodo] = useState("");
  const [todoModal, setTodoModal] = useState(false);
  const id = useRef(null);
  // States

  const handleAddTodo = useCallback(() => {
    validateUserLogin();

    if (!todo) {
      toast.error("Enter a todo");
      return;
    }

    const updatedTodoList = [
      {
        id: todoList.length + 1,
        todo,
        isCompleted: false,
      },
      ...todoList,
    ];

    setTodoList(updatedTodoList);

    saveToLocalStorage("todoList", updatedTodoList);

    setTodo("");
  }, [todo, todoList]);

  const handleDelete = useCallback(
    (todoId) => {
      const updatedtodo = todoList.filter((v) => v.id != todoId);

      setTodoList(updatedtodo);

      updateAndSaveToLocalStorage("todoList", updatedtodo);
    },
    [todoList]
  );

  const handleEdit = useCallback(
    (todoId) => {
      if (!updateTodo) {
        toast.error("Enter a todo");
        return;
      }

      const updatedtodoArr = todoList.map((v) =>
        v.id == todoId ? { ...v, todo: updateTodo } : v
      );

      setTodoList(updatedtodoArr);

      setUpdateTodo("");

      setTodoModal(false);

      updateAndSaveToLocalStorage("todoList", updatedtodoArr);
    },
    [updateTodo, todoModal, todoList]
  );

  const handleToggle = useCallback(
    (todoId) => {
      const updatedTodoCompleted = todoList.map((v) =>
        v.id == todoId ? { ...v, isCompleted: !v.isCompleted } : v
      );

      setTodoList(updatedTodoCompleted);

      updateAndSaveToLocalStorage("todoList", updatedTodoCompleted);
    },
    [todoList]
  );

  const memorizedTodoContext = useMemo(
    () => ({
      todo,
      setTodo,
      id,
      todoList,
      todoModal,
      setTodoModal,
      updateTodo,
      setUpdateTodo,
      handleAddTodo,
      handleDelete,
      handleEdit,
      handleToggle,
    }),
    [
      todo,
      todoList,
      id,
      updateTodo,
      todoModal,
      handleAddTodo,
      handleEdit,
      handleToggle,
      handleDelete,
    ]
  );

  return (
    <TodoContext.Provider value={memorizedTodoContext}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => useContext(TodoContext);

export default useTodo;
