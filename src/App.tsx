import { useState,useEffect } from "react";
import { type Todo } from "./types";
import TodoList from "./TodoList";
import CalendarView from "./CalendarView";
import DailyTodoList from "./DailyTodoList";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [color, setColor] = useState("red");
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoNameError, setNewTodoNameError] = useState("");
  const [newTodoColor, setNewTodoColor] = useState("red");

  const [initialized, setInitialized] = useState(false); // ◀◀ 追加
  const localStorageKey = "TodoApp"; // ◀◀ 追加

  // App コンポーネントの初回実行時のみLocalStorageからTodoデータを復元
  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      setTodos([]);
    }
    setInitialized(true);
  }, []);

  // 状態 todos または initialized に変更があったときTodoデータを保存
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  // const uncompletedCount = todos.filter(
  //   (todo: Todo) => !todo.isDone
  // ).length;


  // const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length;
  const COLOR_OPTIONS = [
    { value: "red", label: "赤（課題）" },
    { value: "lightgreen", label: "黄緑（仕事）" },
    { value: "skyblue", label: "水色（外出）" },
    { value: "orange", label: "橙（その他）" },
  ];

  const isValidTodoName = (name: string): string => {
    if (name.length < 2 || name.length > 32) {
      return "2文字以上、32文字以内で入力してください";
    } else {
      return "";
    }
  };

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNameError(isValidTodoName(e.target.value));
    setNewTodoName(e.target.value);
  };

  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value; // UIで日時が未設定のときは空文字列 "" が dt に格納される
    console.log(`UI操作で日時が "${dt}" (${typeof dt}型) に変更されました。`);
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };

  const updateIsDone = (id: string, value: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: value }; // スプレッド構文
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const addNewTodo = () => {
    const err = isValidTodoName(newTodoName);
    if (err !== "") {
      setNewTodoNameError(err);
      return;
    }
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
      color: newTodoColor,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setNewTodoName("");
    setNewTodoPriority(1);
    setNewTodoDeadline(null);
  };

  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  const remove = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="mx-4 max-w-2xl md:mx-auto">
      <h1 className="bg-gray-800 mb-4 text-2xl font-bold p-1 text-white">
        TodoCalender
      </h1>
      <div className="bg-gray-400 mt-5 mb-5 rounded-md p-1 text-white">
        CALENDER
      </div>
      <CalendarView todos={todos} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <div className="bg-gray-400 mt-5 mb-5 rounded-md p-1 text-white">
        DAILY TODOLIST
      </div>
      <DailyTodoList todos={todos} selectedDate={selectedDate} updateIsDone={updateIsDone} remove={remove} />

      <div className="bg-gray-400 mt-5 mb-5 rounded-md p-1 text-white">
        ALL TODOLIST
      </div>
      <TodoList todos={todos} updateIsDone={updateIsDone} remove={remove} />

      <div className="mt-5 space-y-2 rounded-md border p-3">
        <h2 className="text-lg font-bold">新しいタスクの追加</h2>
        <div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="newTodoName">
              名前
            </label>
            <input
              id="newTodoName"
              type="text"
              value={newTodoName}
              onChange={updateNewTodoName}
              className={twMerge(
                "grow rounded-md border p-2",
                newTodoNameError && "border-red-500 outline-red-500"
              )}
              placeholder="2文字以上、32文字以内で入力してください"
            />
          </div>
          {newTodoNameError && (
            <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="mr-0.5"
              />
              <div>{newTodoNameError}</div>
            </div>
          )}
        </div>

        <div className="flex gap-5">
          <div className="font-bold">優先度</div>
          {["高", "中", "低"].map((value, index) => (
            <label key={value} className="flex items-center space-x-1">
              <input
                id={`priority-${value}`}
                name="priorityGroup"
                type="radio"
                value={index + 1}
                checked={newTodoPriority === index + 1}
                onChange={updateNewTodoPriority}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>

        <div>
          <label className="font-bold">カテゴリー（色）</label>
          <select
            value={newTodoColor}
            onChange={(e) => setNewTodoColor(e.target.value)}
            className="rounded-md border p-2 ml-2"
          >
            {COLOR_OPTIONS.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-x-2">
          <label htmlFor="deadline" className="font-bold">
            期限
          </label>
          <input
            type="datetime-local"
            id="deadline"
            value={
              newTodoDeadline
                ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                : ""
            }
            onChange={updateDeadline}
            className="rounded-md border border-gray-400 px-2 py-0.5"
          />
        </div>

        <button
          type="button"
          onClick={addNewTodo}
          className={twMerge(
            "rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600",
            newTodoNameError && "cursor-not-allowed opacity-50"
          )}
        >
          追加
        </button>
      </div>
      <button
        type="button"
        onClick={removeCompletedTodos}
        className={
          "mt-5 mb-5 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
        }
      >
        完了済みのタスクを削除
      </button>
    </div>
  );
};

export default App;