import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getOneUser } from "../../services/userAPI";
import LinkBtn from "../../components/LinkBtn";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import CartMenu from "./CartMenu";

function SellArticleAndCart() {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getOneUser(id!),
    enabled: !!id,
  });

  return (
    <div className="flex items-center justify-between">
      <p className="text-3xl font-semibold">Prodaja artikla</p>
      <div className="flex items-center gap-5">
        <div className="flex w-103 flex-none items-center justify-between rounded-lg bg-white px-5 py-3 shadow-xs">
          {isPending ? (
            <p>...</p>
          ) : (
            <>
              <p className="font-semibold">{data.data.fullName}</p>
              <p className="text-sm text-black/50">
                {new Date(data.data.birthDate).toLocaleDateString("sl-SI", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </>
          )}
        </div>
        <CartMenu />
        <LinkBtn to={`/dashboard/users/${id}/articles/checkout`} type="primary">
          <p className="flex items-center gap-4">
            Zaključi <ChevronRightIcon className="w-4 stroke-3" />
          </p>
        </LinkBtn>
      </div>
    </div>
  );
}

export default SellArticleAndCart;
