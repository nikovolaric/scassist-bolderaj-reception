import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

function UserListCard({
  user,
  i,
}: {
  user: {
    fullName: string;
    birthDate: string;
    email: string;
    _id: string;
    confirmMailToken: string;
    unusedTickets: string[];
  };
  i: number;
}) {
  return (
    <Link
      to={`/dashboard/users/${user._id}`}
      className={`border-gray/75 grid grid-cols-[3fr_3fr_2fr_2fr] items-center justify-items-start border-b px-3 py-4 ${i % 2 === 0 ? "bg-primary/10" : ""}`}
    >
      <div className="flex items-center gap-3">
        <UserCircleIcon className="w-10 flex-none text-black/50" />
        <div>
          <p className="font-medium">{user.fullName}</p>
          <p className="text-black/50">
            {new Date(user.birthDate).toLocaleDateString("sl-SI", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
        {user.unusedTickets.length > 0 && (
          <div className="bg-primary h-2 w-2 rounded-full" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <p className="text-black/50">{user.email}</p>
        {user.email && !user.confirmMailToken && (
          <div className="h-2 w-2 rounded-full bg-green-600"></div>
        )}
        {user.email && user.confirmMailToken && (
          <div className="h-2 w-2 rounded-full bg-red-600"></div>
        )}
      </div>
    </Link>
  );
}

export default UserListCard;
