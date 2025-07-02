import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getOneArticle } from "../services/articlesAPI";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import Breadcrumbs from "../features/checkout/Breadcrumbs";
import UserList from "../features/checkout/UserList";

function ChooseUserForTicket() {
  const { articleId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getOneArticle(articleId!),
    enabled: !!articleId,
  });
  return (
    <div className="my-16 flex flex-col gap-20">
      <Header />
      {isPending ? <p>...</p> : <Breadcrumbs name={data.article.name.sl} />}
      {isPending ? <Spinner /> : <UserList />}
    </div>
  );
}

export default ChooseUserForTicket;
