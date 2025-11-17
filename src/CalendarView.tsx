import dayjs from "dayjs";
import Calendar from "react-calendar";
import type { Todo } from "./types";
import "react-calendar/dist/Calendar.css";
import { format, isSameDay } from "date-fns";

type Props = {
  todos: Todo[];
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
};

const CalendarView = ({ todos, selectedDate, setSelectedDate }: Props) => {
  const getColorsForDate = (date: Date) => {
    const dayStr = dayjs(date).format("YYYY-MM-DD");

    const colors = todos
      .filter((t) =>
        t.deadline && dayjs(t.deadline).format("YYYY-MM-DD") === dayStr
      )
      .map((t) => t.color);

    return [...new Set(colors)];
  };

  return (
    <Calendar
      value={selectedDate}
      onChange={(d) => setSelectedDate(d as Date)}
      tileContent={({ date }) => {
        const colors = getColorsForDate(date);

        return (
          <div className="flex justify-center mt-1 space-x-1">
            {colors.map((c) => (
              <span
                key={c}
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: c }}
              ></span>
            ))}
          </div>
        );
      }}
    />
  );
};

export default CalendarView;
