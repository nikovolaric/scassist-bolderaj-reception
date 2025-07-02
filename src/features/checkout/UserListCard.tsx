import {
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { assignOtherId } from "../articles/slices/cartSlice";

function UserListCard({
  user,
  i,
}: {
  user: { fullName: string; birthDate: string; email: string; _id: string };
  i: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border-gray/75 relative grid grid-cols-[3fr_3fr_2fr_2fr] items-center justify-items-start border-b px-3 py-4 ${i % 2 === 0 ? "bg-primary/10" : ""}`}
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
      </div>
      <p className="text-black/50">{user.email}</p>
      <button
        className="from-primary to-secondary drop-shadow-btn hover:to-primary cursor-pointer rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300"
        onClick={() => setIsOpen(true)}
      >
        Vnovči temu uporabniku
      </button>
      {isOpen && <ConfirmUser _id={user._id} setIsOpen={setIsOpen} />}
    </div>
  );
}

function ConfirmUser({
  _id,
  setIsOpen,
}: {
  _id: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const article = queryClient.getQueryData<{
    article: { name: { sl: string } };
  }>(["article", articleId])?.article;

  function handleClick() {
    if (articleId) {
      dispatch(assignOtherId({ articleId, otherId: _id }));
    }

    navigate(pathname.split("/").slice(0, -1).join("/"));
  }

  return (
    <div className="bg-neutral/95 border-gray/80 absolute top-0 right-1/5 z-50 flex w-93 flex-col gap-15 rounded-xl border px-6 pt-16 pb-5.5">
      <p className="font-medium">
        Ali ste prepričani, da želite vnovčiti <br />{" "}
        <span className="font-semibold">{article && article.name.sl}</span> temu
        uporabniku?
      </p>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(false)}
          className="flex cursor-pointer items-center gap-4 rounded-xl border border-black px-4 py-3 font-semibold"
        >
          <ChevronLeftIcon className="h-4 stroke-3" /> Prekliči
        </button>
        <button
          onClick={handleClick}
          className="from-primary to-secondary drop-shadow-btn hover:to-primary flex cursor-pointer items-center gap-4 rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
        >
          Prijava obiska <ChevronRightIcon className="h-4 stroke-3" />
        </button>
      </div>
    </div>
  );
}

export default UserListCard;
