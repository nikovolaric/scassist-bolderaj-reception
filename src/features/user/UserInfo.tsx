import { PlusIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../components/LinkBtn";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getOneUser } from "../../services/userAPI";
import { getUserUnpaidPreinvoices } from "../../services/preInvoicesAPI";

function UserInfo() {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getOneUser(id!),
    enabled: !!id,
  });
  const { data: preInvoiceData, isPending: isPendingPreInvoice } = useQuery({
    queryKey: ["preInvoices", id],
    queryFn: () => getUserUnpaidPreinvoices(id!),
    enabled: !!id,
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-end gap-5">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium text-black/75">
            Uporabniški profil
          </p>
          {isPending ? (
            <p>...</p>
          ) : (
            <div className="drop-shadow-input flex w-103 items-center justify-between rounded-lg bg-white px-5 py-2.5">
              <p className="text-lg font-semibold">{data.data.fullName}</p>
              <p className="text-black/50">
                {new Date(data.data.birthDate).toLocaleDateString("sl-SI", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          )}
        </div>
        {!isPendingPreInvoice && preInvoiceData.results > 0 && (
          <div className="drop-shadow-input flex w-103 items-center gap-5 rounded-lg border border-red-700 bg-white px-5 py-2.5">
            <p className="from-primary to-secondary drop-shdaow-btn flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-r">
              i
            </p>
            <p className="font-semibold text-red-700">
              Uporabnik ima neporavnane obveznosti.
            </p>
          </div>
        )}
      </div>
      <LinkBtn to={`/dashboard/users/${id}/articles`} type="primary">
        <p className="flex items-center gap-2">
          {" "}
          Prodaja artikla
          <PlusIcon className="h-4 stroke-3" />
        </p>
      </LinkBtn>
    </div>
  );
}

export default UserInfo;
