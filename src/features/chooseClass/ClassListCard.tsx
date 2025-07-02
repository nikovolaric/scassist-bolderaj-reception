import type { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router";

function ClassListCard({
  classData,
  i,
  choosenClasses,
  setChosenClasses,
  noClasses,
}: {
  classData: {
    teacher: { fullName: string };
    dates: string[];
    className: { sl: string };
    hours: number[];
    _id: string;
    students: { student: string }[];
    maxStudents: number;
    full: boolean;
  };
  i: number;
  choosenClasses: string[];
  setChosenClasses: Dispatch<SetStateAction<string[]>>;
  noClasses?: number;
}) {
  const { id } = useParams();
  const { teacher, dates, className, hours, students, maxStudents, full, _id } =
    classData;

  function handleChange() {
    if (choosenClasses.includes(_id)) {
      setChosenClasses((choosenClasses) =>
        choosenClasses.filter((id) => id !== _id),
      );
    }

    if (
      !choosenClasses.includes(_id) &&
      choosenClasses.length < (noClasses || 1)
    ) {
      setChosenClasses((choosenClasses) => [...choosenClasses, _id]);
    }
  }

  return (
    <div
      className={`${i % 2 === 0 ? "bg-white" : "bg-primary/25"} ${full || students.filter((el) => el.student === id).length > 0 ? "cursor-not-allowed opacity-50" : ""} drop-shadow-input grid grid-cols-[1fr_3fr_4fr_3fr_3fr] items-center rounded-lg px-4 py-5`}
    >
      {students.filter((el) => el.student === id).length > 0 ? (
        <p className="font-semibold text-red-600">Prijavljen</p>
      ) : (
        <label className="cursor-pointer">
          <input
            type="checkbox"
            className="peer hidden"
            checked={choosenClasses.includes(_id)}
            onChange={handleChange}
          />
          <div className="border-gray flex h-6 w-6 items-center justify-center rounded-lg border transition-all duration-75">
            <span
              className={`${choosenClasses.includes(_id) ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
            />
          </div>
        </label>
      )}
      <p className="text-black/75">
        {dates.length > 1
          ? `${hours[0]}-${hours[1]}`
          : new Date(dates[0])
              .toLocaleDateString("sl-SI", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .toUpperCase()}
        , {hours[0]}-{hours[1]}
      </p>
      <p className="font-semibold">{className.sl}</p>
      <p className="text-black/75">{teacher.fullName}</p>
      <div>
        <p className="text-sm">
          {students.length} zasedenih mest od {maxStudents} mest
        </p>
        <progress value={students.length} max={maxStudents} />
      </div>
    </div>
  );
}

export default ClassListCard;
