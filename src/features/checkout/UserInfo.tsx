import { useQuery } from "@tanstack/react-query";
import { getOneUser } from "../../services/userAPI";
import { useParams } from "react-router";

function UserInfo() {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getOneUser(id!),
    enabled: !!id,
  });

  return (
    <div className="flex items-center justify-between">
      <p className="text-3xl font-semibold">Košarica</p>
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
    </div>
  );
}

export default UserInfo;
