import type { Todo } from "./types";
import TodoList from "./TodoList";
import dayjs from "dayjs";

type Props = {
  todos: Todo[];
  selectedDate: Date;
  updateIsDone: (id: string, v: boolean) => void;
  remove: (id: string) => void;
};

const DailyTodoList = ({ todos, selectedDate, updateIsDone, remove }: Props) => {
  const target = dayjs(selectedDate).format("YYYY-MM-DD");

  const daily = todos.filter((t) => {
    if (!t.deadline) return false;
    return dayjs(t.deadline).format("YYYY-MM-DD") === target;
  }).sort((a, b) => a.priority - b.priority);

  return (
    <div>
      <h2 className="font-bold mb-2">{target}</h2>
      {daily.length === 0 ? (
        <div className="text-gray-500">この日に予定はありません。</div>
      ) : (
        <TodoList
          todos={daily}
          updateIsDone={updateIsDone}
          remove={remove}
        />
      )}
    </div>
  );
};

export default DailyTodoList;
