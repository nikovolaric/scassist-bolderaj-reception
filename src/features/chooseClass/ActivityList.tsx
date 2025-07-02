import { useQueries, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getOneUser } from "../../services/userAPI";
import { getSingleDateClassesFuture } from "../../services/classAPI";
import Spinner from "../../components/Spinner";
import { useState, type Dispatch, type SetStateAction } from "react";
import ClassListCard from "./ClassListCard";
import { useAppDispatch } from "../../app/hooks";
import { addItem } from "../articles/slices/cartSlice";
import { getOneArticle } from "../../services/articlesAPI";

function ActivityList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { articleId, id } = useParams();
  const [choosenClasses, setChosenClasses] = useState<string[]>([]);

  const [{ data: userData, isPending: userPending }, { data: articleData }] =
    useQueries({
      queries: [
        {
          queryKey: ["user", id],
          queryFn: () => getOneUser(id!),
          enabled: !!id,
        },
        {
          queryKey: ["article", articleId],
          queryFn: () => getOneArticle(articleId!),
          enabled: !!articleId,
        },
      ],
    });

  const { data, isPending } = useQuery({
    queryKey: ["classData", articleId],
    queryFn: () =>
      getSingleDateClassesFuture(userData.data.ageGroup, articleId!),
    enabled: !userPending,
  });

  function handleClick() {
    const price =
      articleData.article.label === "VV"
        ? articleData.article.classPriceData.priceDDV
        : articleData.article.priceDDV;
    const newArticle = {
      articleId: articleId as string,
      quantity: 1,
      classId: choosenClasses,
      price,
    };

    dispatch(addItem(newArticle));

    navigate(`/dashboard/users/${id}/articles`);
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-10">
      <ClassDatesList
        day="ponedeljek"
        classes={data.classes}
        setChosenClasses={setChosenClasses}
        choosenClasses={choosenClasses}
      />
      <ClassDatesList
        day="torek"
        classes={data.classes}
        setChosenClasses={setChosenClasses}
        choosenClasses={choosenClasses}
      />
      <ClassDatesList
        day="sreda"
        classes={data.classes}
        setChosenClasses={setChosenClasses}
        choosenClasses={choosenClasses}
      />
      <ClassDatesList
        day="četrtek"
        classes={data.classes}
        setChosenClasses={setChosenClasses}
        choosenClasses={choosenClasses}
      />
      <ClassDatesList
        day="petek"
        classes={data.classes}
        setChosenClasses={setChosenClasses}
        choosenClasses={choosenClasses}
      />
      <ClassDatesList
        day="sobota"
        classes={data.classes}
        setChosenClasses={setChosenClasses}
        choosenClasses={choosenClasses}
      />
      {choosenClasses.length === 1 && (
        <div className="bg-neutral fixed bottom-0 left-1/2 flex h-20 w-7xl -translate-x-1/2 items-center justify-end">
          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary cursor-pointer rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300"
            onClick={handleClick}
          >
            Dodaj v košarico
          </button>
        </div>
      )}
    </div>
  );
}

function ClassDatesList({
  day,
  classes,
  choosenClasses,
  setChosenClasses,
}: {
  day: string;
  classes: {
    teacher: { fullName: string };
    dates: string[];
    className: { sl: string };
    hours: number[];
    _id: string;
    students: { student: string }[];
    maxStudents: number;
    full: boolean;
  }[];
  choosenClasses: string[];
  setChosenClasses: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <div>
      <p className="text-xl font-semibold capitalize">{day}</p>
      <div className="mt-6 flex flex-col gap-2">
        {classes.map((el, i) => {
          if (
            new Date(el.dates[0]).toLocaleDateString("sl-SI", {
              weekday: "long",
            }) === day
          ) {
            return (
              <ClassListCard
                key={el._id}
                classData={el}
                i={i}
                choosenClasses={choosenClasses}
                setChosenClasses={setChosenClasses}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default ActivityList;
