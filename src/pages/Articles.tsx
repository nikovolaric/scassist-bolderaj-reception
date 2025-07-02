import Header from "../components/Header";
import SearchAndFilterArticles from "../features/articles/SearchAndFilterArticles";
import SellArticleAndCart from "../features/articles/SellArticleAndCart";

function Articles() {
  return (
    <div className="my-16 flex flex-col gap-20">
      <Header />
      <div className="flex flex-col gap-10">
        <SellArticleAndCart />
        <SearchAndFilterArticles />
      </div>
    </div>
  );
}

export default Articles;
