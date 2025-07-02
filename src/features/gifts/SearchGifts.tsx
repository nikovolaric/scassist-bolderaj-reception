import { useQuery } from "@tanstack/react-query";
import { getAllGifts } from "../../services/giftsAPI";
import { useState, type Dispatch, type SetStateAction } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Spinner from "../../components/Spinner";
import GiftCard from "./GiftCard";

function SearchGifts() {
  const [giftCode, setGiftCode] = useState("");
  const [used, setUsed] = useState(true);
  const [expired, setExpired] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isPending } = useQuery({
    queryKey: ["gifts", giftCode, used, expired, page],
    queryFn: () => getAllGifts(giftCode, "V", page, 30, used, expired),
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <p className="text-3xl font-semibold">Darilni boni</p>
        <Filter
          setUsed={setUsed}
          setExpired={setExpired}
          expired={expired}
          used={used}
        />
      </div>
      <div className="drop-shadow-input border-gray/75 flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
        <MagnifyingGlassIcon className="h-4 stroke-3" />
        <input
          placeholder="Išči po darilnih bonih"
          className="w-full outline-none"
          onChange={(e) => setGiftCode(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        {isPending ? (
          <Spinner />
        ) : (
          data.gifts.map(
            (
              gift: {
                giftCode: string;
                expires: string;
                article: { name: { sl: string }; ageGroup: string };
                _id: string;
                used: boolean;
              },
              i: number,
            ) => <GiftCard key={gift._id} gift={gift} i={i} />,
          )
        )}
      </div>
      <div className="flex items-center justify-between">
        {page === 1 ? (
          <div />
        ) : (
          <button
            className="flex cursor-pointer items-center gap-4 rounded-xl border border-black px-4 py-2 font-semibold"
            onClick={() => setPage((page) => page - 1)}
          >
            <ChevronLeftIcon className="h-4 stroke-3" /> Prejšna stran
          </button>
        )}
        {!isPending && data.results === 30 ? (
          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary flex cursor-pointer items-center gap-4 rounded-lg bg-gradient-to-r px-4 py-2 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
            onClick={() => setPage((page) => page + 1)}
          >
            Naslednja stran <ChevronRightIcon className="h-4 stroke-3" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

function Filter({
  expired,
  used,
  setUsed,
  setExpired,
}: {
  expired: boolean;
  used: boolean;
  setUsed: Dispatch<SetStateAction<boolean>>;
  setExpired: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-5">
      <button
        className={`w-49 cursor-pointer rounded-lg bg-white py-2.5 text-center ${!used ? "border-secondary border-2 shadow-[inset_1px_2px_4px_rgba(0,0,0,0.25)]" : "shadow-xs"}`}
        onClick={() => {
          setUsed((used) => !used);
          setExpired(() => false);
        }}
      >
        Vnovčeni boni
      </button>
      <button
        className={`w-49 cursor-pointer rounded-lg bg-white py-2.5 text-center ${expired ? "border-secondary border-2 shadow-[inset_1px_2px_4px_rgba(0,0,0,0.25)]" : "shadow-xs"}`}
        onClick={() => {
          setExpired((expired) => !expired);
          setUsed(() => true);
        }}
      >
        Pretečeni boni
      </button>
    </div>
  );
}

export default SearchGifts;
