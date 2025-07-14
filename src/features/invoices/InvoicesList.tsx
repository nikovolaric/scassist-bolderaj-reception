import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type Dispatch, type SetStateAction } from "react";
import {
  getMyIssuedInvoices,
  openInvoice,
  stornoInvoice,
} from "../../services/invoicesAPI";
import Spinner from "../../components/Spinner";

function InvoicesList() {
  const [buyerName, setBuyerName] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["issuedInvoices", buyerName],
    queryFn: () => getMyIssuedInvoices(buyerName),
  });

  return (
    <div className="flex flex-col gap-5 rounded-xl bg-white p-8">
      <div className="drop-shadow-input border-gray/75 flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
        <MagnifyingGlassIcon className="h-4 stroke-3" />
        <input
          placeholder="Išči po uporabniku"
          className="w-full outline-none"
          onChange={(e) => setBuyerName(e.target.value)}
        />
      </div>
      <div>
        <NameBar />
        {isPending ? (
          <Spinner />
        ) : (
          <div>
            {data.invoices.map(
              (
                invoice: {
                  invoiceData: {
                    businessPremises: string;
                    deviceNo: string;
                    year: number;
                    invoiceNo: number;
                  };
                  invoiceDate: string;
                  buyer: { firstName: string; lastName: string };
                  paymentMethod: string;
                  _id: string;
                },
                i: number,
              ) => (
                <InvoiceListCard key={invoice._id} invoice={invoice} i={i} />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function NameBar() {
  return (
    <div className="bg-primary grid grid-cols-[1fr_1fr_1fr_1fr_2fr] items-center justify-items-start rounded-xl p-3 font-semibold">
      <p className="text-black/75">Št. računa</p>
      <p className="text-black/75">Datum in čas izdaje</p>
      <p className="text-black/75">Ime in priimek</p>
      <p className="text-black/75">Način plačila</p>
    </div>
  );
}

function InvoiceListCard({
  invoice,
  i,
}: {
  invoice: {
    invoiceData: {
      businessPremises: string;
      deviceNo: string;
      year: number;
      invoiceNo: number;
    };
    invoiceDate: string;
    buyer: { firstName: string; lastName: string };
    paymentMethod: string;
    _id: string;
  };
  i: number;
}) {
  const { invoiceData, invoiceDate, buyer, paymentMethod, _id } = invoice;
  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  async function openInvoiceClick() {
    try {
      setIsLoadingOpen(true);

      await openInvoice(_id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingOpen(false);
    }
  }

  return (
    <div
      className={`border-gray/75 relative grid grid-cols-[1fr_1fr_1fr_1fr_2fr] items-center justify-items-start border-b px-3 py-4 ${i % 2 === 0 ? "" : "bg-primary/10"}`}
    >
      <p className="justify-self-start font-medium">{`${invoiceData.businessPremises}-${invoiceData.deviceNo}-${invoiceData.invoiceNo}-${invoiceData.year}`}</p>
      <p className="text-black/50">
        {new Date(invoiceDate).toLocaleDateString("sl-SI", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p className="text-black/50">{`${buyer?.firstName ?? ""} ${buyer?.lastName ?? ""}`}</p>
      <p className="text-black/50">
        {paymentMethod === "gotovina" ? "Gotovina" : "Kartica"}
      </p>
      <div className="grid grid-cols-2 items-center gap-8 justify-self-center">
        <button
          className="w-35 cursor-pointer rounded-lg border-2 border-black py-3 text-center font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:border-0 disabled:bg-gray-400"
          disabled={isLoadingOpen}
          onClick={openInvoiceClick}
        >
          {isLoadingOpen ? "..." : "Odpri PDF"}
        </button>
        {i === 0 ? (
          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary cursor-pointer rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300"
            onClick={() => setIsOpenConfirm(true)}
          >
            Storniraj račun
          </button>
        ) : (
          <div />
        )}
        {isOpenConfirm && (
          <ConfirmStornoInvoice
            setIsOpenConfirm={setIsOpenConfirm}
            invoiceNo={`${invoiceData.businessPremises}-${invoiceData.deviceNo}-${invoiceData.invoiceNo}-${invoiceData.year}`}
            id={_id}
          />
        )}
      </div>
    </div>
  );
}

function ConfirmStornoInvoice({
  invoiceNo,
  setIsOpenConfirm,
  id,
}: {
  invoiceNo: string;
  setIsOpenConfirm: Dispatch<SetStateAction<boolean>>;
  id: string;
}) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  async function stornoLastInvoice() {
    try {
      setIsLoading(true);

      await stornoInvoice(id);

      setIsOpenConfirm(false);

      queryClient.invalidateQueries({ queryKey: ["issuedInvoices"] });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`bg-neutral/95 border-gray/80 absolute top-0 right-0 z-50 flex w-93 flex-col gap-15 rounded-xl border px-6 pt-16 pb-5.5`}
    >
      <p className="font-medium">
        Ali ste prepričani, da želite stornirati račun <br />
        <span className="font-semibold">{invoiceNo}</span>?
      </p>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpenConfirm(false)}
          className="flex cursor-pointer items-center gap-4 rounded-xl border border-black px-4 py-3 font-semibold"
        >
          <ChevronLeftIcon className="h-4 stroke-3" /> Prekliči
        </button>
        <button
          onClick={stornoLastInvoice}
          className="from-primary to-secondary drop-shadow-btn hover:to-primary flex cursor-pointer items-center gap-4 rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
          disabled={isLoading}
        >
          Storniraj račun <ChevronRightIcon className="h-4 stroke-3" />
        </button>
      </div>
    </div>
  );
}

export default InvoicesList;
