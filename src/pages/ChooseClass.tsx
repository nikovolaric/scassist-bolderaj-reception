import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import { getOneArticle } from "../services/articlesAPI";
import { useParams } from "react-router";
import Breadcrumbs from "../features/chooseClass/Breadcrumbs";
import ClassList from "../features/chooseClass/ClassList";
import Spinner from "../components/Spinner";
import ActivityList from "../features/chooseClass/ActivityList";

function ChooseClass() {
  const { articleId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["classArticle", articleId],
    queryFn: () => getOneArticle(articleId!),
    enabled: !!articleId,
  });

  return (
    <div className="my-16 flex flex-col gap-20">
      <Header />
      {isPending ? <p>...</p> : <Breadcrumbs name={data.article.name.sl} />}
      {isPending ? (
        <Spinner />
      ) : (
        <>
          {data.article.label === "VV" && <ClassList />}
          {data.article.label === "A" && <ActivityList />}
        </>
      )}
    </div>
  );
}

export default ChooseClass;
