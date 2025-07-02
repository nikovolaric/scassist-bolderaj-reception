import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllUsers } from "../../services/userAPI";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Spinner from "../../components/Spinner";
import UserListCard from "./UserListCard";

function UserList() {
  const [lastName, setLastName] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["users", lastName],
    queryFn: () => getAllUsers(lastName),
  });

  return (
    <div className="flex flex-col gap-5 rounded-xl bg-white p-8">
      <div className="drop-shadow-input border-gray/75 flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
        <MagnifyingGlassIcon className="h-4 stroke-3" />
        <input
          placeholder="Išči po uporabnikih"
          className="w-full outline-none"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <NameBar />
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {data.users.map(
              (
                user: {
                  _id: string;
                  fullName: string;
                  birthDate: string;
                  email: string;
                },
                i: number,
              ) => (
                <UserListCard key={user._id} user={user} i={i} />
              ),
            )}
          </>
        )}
      </div>
    </div>
  );
}

function NameBar() {
  return (
    <div className="bg-primary grid grid-cols-[3fr_3fr_2fr_2fr] items-center justify-items-start rounded-xl p-3 font-semibold">
      <p className="justify-self-start text-black/75">Uporabniški profil</p>
      <p className="justify-self-start text-black/75">Elektronski naslov</p>
      <p className="justify-self-start text-black/75">Izberi uporabnika</p>
    </div>
  );
}

export default UserList;
