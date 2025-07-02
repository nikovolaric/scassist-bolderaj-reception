import { PlusIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../components/LinkBtn";
import { useParams } from "react-router";

function ClassCard({
  classArticle,
}: {
  classArticle: {
    name: { sl: string };
    _id: string;
    classPriceData: { priceDDV: number };
    priceDDV: number;
    label: string;
  };
}) {
  const { id } = useParams();
  const { name, _id, classPriceData, label, priceDDV } = classArticle;

  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-xs">
      <p className="font-quicksand w-3/5 flex-none text-lg font-bold uppercase">
        {name.sl}
      </p>
      <p className="bg-primary/35 rounded-lg px-11 py-3 font-semibold">
        {label === "VV"
          ? classPriceData.priceDDV.toFixed(2).replace(".", ",")
          : priceDDV.toFixed(2).replace(".", ",")}{" "}
        €
      </p>
      <LinkBtn to={`/dashboard/users/${id}/articles/${_id}`} type="primary">
        <p className="flex items-center gap-4">
          Izberi termin <PlusIcon className="h-4 stroke-3" />
        </p>
      </LinkBtn>
    </div>
  );
}

export default ClassCard;
