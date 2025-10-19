import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getOneClass } from "../services/classAPI";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import ClassUserList from "../features/classes/ClassUserList";

function ClassUsers() {
  const { classId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["class", classId],
    queryFn: () => getOneClass(classId!),
    enabled: !!classId,
  });

  if (isPending) return <Spinner />;

  return (
    <div className="my-16 flex flex-col gap-20">
      <Header />
      <ClassInfo classData={data.class} />
      <ClassUserList classData={data.class} />
    </div>
  );
}

function ClassInfo({
  classData,
}: {
  classData: {
    className: { sl: string };
    dates: string[];
    hours: string[];
    teacher: { fullName: string };
  };
}) {
  const { className, dates, hours, teacher } = classData;
  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-black/75">
          Dan in ura izvajanja
        </p>
        <div className="drop-shadow-input flex items-center justify-around rounded-lg bg-white py-5 text-black/75">
          <p className="font-semibold uppercase">
            {dates.length > 1
              ? new Date(dates[0]).toLocaleDateString("sl-SI", {
                  weekday: "long",
                })
              : new Date(dates[0]).toLocaleDateString("sl-SI", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
          </p>
          <p>
            {hours[0]}-{hours[1]}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-black/75">Ime skupine</p>
        <div className="drop-shadow-input flex items-center justify-around rounded-lg bg-white py-5 text-black/75">
          <p className="font-semibold">{className.sl}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-black/75">Izvajalec</p>
        <div className="drop-shadow-input flex items-center justify-center rounded-lg bg-white py-5 text-black/75">
          <div>
            {!Array.isArray(teacher) ? (
              <p className="font-semibold">{teacher.fullName}</p>
            ) : (
              <div className="flex items-center gap-1">
                {teacher.map((el, i) => (
                  <p className="font-semibold" key={el.fullName}>
                    {i !== 0 ? " | " : ""}
                    {el.fullName}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassUsers;
