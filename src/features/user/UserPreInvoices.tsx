import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import {
  createInvoiceFromPreInvoice,
  getUserUnpaidPreinvoices,
  openPreInvoice,
} from "../../services/preInvoicesAPI";
import Spinner from "../../components/Spinner";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type SetStateAction,
} from "react";
import type { Dispatch } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function UserPreInvoices() {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["preInvoices", id],
    queryFn: () => getUserUnpaidPreinvoices(id!),
    enabled: !!id,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (data.results > 0) {
    return (
      <div>
        <p className="text-sm font-medium">Predračuni</p>
        <div className="rounded-xl bg-white px-9 py-9.5">
          <Namebar />
          {data.preInvoices.map(
            (preInvoice: {
              date: string;
              preInvoiceNumber: number;
              _id: string;
            }) => (
              <UserPreinvoicesCard
                key={preInvoice._id}
                preInvoice={preInvoice}
              />
            ),
          )}
        </div>
      </div>
    );
  }
}

function Namebar() {
  return (
    <div className="bg-primary/50 grid grid-cols-[4fr_3fr_4fr] rounded-xl p-3">
      <p className="font-semibold text-black/50">Številka predračuna</p>
      <p className="font-semibold text-black/50">Datum in ura izdaje</p>
      <p className="font-semibold text-black/50" />
    </div>
  );
}

function UserPreinvoicesCard({
  preInvoice,
}: {
  preInvoice: { date: string; preInvoiceNumber: number; _id: string };
}) {
  const { date, preInvoiceNumber, _id } = preInvoice;

  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  // const [isDeleting, setIsDeleting] = useState(false);

  async function handleOpenPreInvoice() {
    try {
      setIsLoadingOpen(true);

      await openPreInvoice(_id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingOpen(false);
    }
  }

  async function handlePay() {
    setIsOpenConfirm(true);
  }

  return (
    <div className="border-gray grid grid-cols-[4fr_3fr_4fr] rounded-xl border-b p-3">
      <p className="font-medium">
        {preInvoiceNumber}-{new Date(date).getFullYear()}
      </p>
      <p className="text-black/75 capitalize">
        {new Date(date).toLocaleDateString("sl-SI", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <div className="relative flex items-center gap-4">
        <button
          className="from-primary to-secondary drop-shadow-btn hover:to-primary cursor-pointer rounded-lg bg-gradient-to-r px-8 py-1 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
          onClick={handleOpenPreInvoice}
          disabled={isLoadingOpen}
        >
          {isLoadingOpen ? "..." : "Odpri datoteko"}
        </button>{" "}
        <button
          className="border-gray flex cursor-pointer items-center gap-4 rounded-lg border px-8 py-1 font-semibold text-black/50 shadow-[1px_1px_2px_rgba(0,0,0,0.05)] transition-colors duration-300 hover:bg-black/5 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={handlePay}
        >
          Plačaj predračun
        </button>
        {isOpenConfirm && (
          <ConfirmUseTicket setIsOpenConfirm={setIsOpenConfirm} id={_id} />
        )}
      </div>
    </div>
  );
}

function ConfirmUseTicket({
  setIsOpenConfirm,
  id,
}: {
  setIsOpenConfirm: Dispatch<SetStateAction<boolean>>;
  id?: string;
}) {
  const queryClient = useQueryClient();
  const { id: userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (id) {
        await createInvoiceFromPreInvoice({ id, paymentMethod: checked });
      }

      queryClient.invalidateQueries({ queryKey: ["preInvoices", userId] });
      setIsOpenConfirm(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.value);
  }

  return (
    <div className="bg-neutral/95 border-gray/80 absolute -top-20 left-0 z-50 flex w-full flex-col gap-15 rounded-xl border px-6 pt-16 pb-5.5">
      <p className="font-medium">Predračun želim poravnati:</p>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex items-center justify-around">
          <label className="flex cursor-pointer items-center gap-4">
            <input
              type="checkbox"
              className="peer hidden"
              checked={checked === "card"}
              value="card"
              onChange={handleChange}
            />
            <div className="border-gray flex h-6 w-6 items-center justify-center rounded-lg border transition-all duration-75">
              <span
                className={`${checked === "card" ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
              />
            </div>
            <p className="font-medium">s kartico</p>
          </label>{" "}
          <label className="flex cursor-pointer items-center gap-4">
            <input
              type="checkbox"
              className="peer hidden"
              checked={checked === "gotovina"}
              value="gotovina"
              onChange={handleChange}
            />
            <div className="border-gray flex h-6 w-6 items-center justify-center rounded-lg border transition-all duration-75">
              <span
                className={`${checked === "gotovina" ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
              />
            </div>
            <p className="font-medium">z gotovino</p>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpenConfirm(false);
            }}
            className="flex cursor-pointer items-center gap-4 rounded-xl border border-black px-4 py-3 font-semibold"
          >
            <ChevronLeftIcon className="h-4 stroke-3" /> Prekliči
          </button>
          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary flex cursor-pointer items-center gap-4 rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
            disabled={isLoading}
          >
            Poravnaj znesek <ChevronRightIcon className="h-4 stroke-3" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserPreInvoices;
