import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, type FormEvent } from "react";
import {
  endCashRegisterRecord,
  getCRR,
  startCashRegisterRecord,
} from "../../services/cashregisterAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import LinkBtn from "../../components/LinkBtn";
import { logout } from "../../services/authAPI";
import { useNavigate } from "react-router";

const links = [
  {
    title: "AKTIVNOSTI IN VADBE",
    link: "/dashboard/classes",
    btn: "Pregled tečajev in vadb",
  },
  {
    title: "PODJETJA IN KLUBI",
    link: "/dashboard/companies",
    btn: "Pregled podjetij in klubov",
  },
  {
    title: "DARILNI BONI",
    link: "/dashboard/gifts",
    btn: "Pregled in vnovčitev",
  },
  {
    title: "RAČUNI",
    link: "/dashboard/invoices",
    btn: "Pregled izdanih računov",
  },
];

function WelcomeSection() {
  const navigate = useNavigate();
  const { data, isPending } = useQuery({ queryKey: ["CRR"], queryFn: getCRR });
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [startCahsBalance, setStartCahsBalance] = useState("");
  const [endCahsBalance, setEndCahsBalance] = useState("");
  const [endCardBalance, setEndCardBalance] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);

      await startCashRegisterRecord(startCahsBalance);

      queryClient.invalidateQueries({ queryKey: ["CRR"] });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEndSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);

      await endCashRegisterRecord(endCahsBalance, endCardBalance);

      await logout();

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isPending) return <Spinner />;

  return (
    <div className="flex flex-col gap-14">
      <p className="text-3xl font-semibold">Dobrodošli v Bolderaj!</p>
      <div className="grid grid-cols-[2fr_1fr] gap-x-5">
        <div className="relative grid grid-cols-2 gap-x-5 gap-y-6">
          {data.status === "success" ? (
            <>
              {links.map((link, i) => (
                <div
                  className="drop-shadow-input flex flex-col gap-16 rounded-2xl bg-white px-6 py-10"
                  key={(i + 1) * 10}
                >
                  <p className="font-quicksand text-xl font-bold">
                    {link.title}
                  </p>
                  <div className="self-end">
                    <LinkBtn type="primary" to={link.link}>
                      <p className="flex items-center gap-4">
                        {link.btn}
                        <ChevronRightIcon className="h-4 stroke-3" />
                      </p>
                    </LinkBtn>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="absolute top-0 left-0 z-50 h-full w-full cursor-not-allowed" />
              {links.map((link, i) => (
                <div
                  className="drop-shadow-input flex flex-col gap-16 rounded-2xl bg-white px-6 py-10 opacity-30"
                  key={(i + 1) * 10}
                >
                  <p className="font-quicksand text-xl font-bold">
                    {link.title}
                  </p>
                  <div className="self-end">
                    <LinkBtn type="primary" to={link.link}>
                      <p className="flex items-center gap-4">
                        {link.btn}
                        <ChevronRightIcon className="h-4 stroke-3" />
                      </p>
                    </LinkBtn>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="drop-shadow-input flex flex-col gap-16 rounded-2xl bg-white px-6 py-10">
          <p className="font-quicksand text-xl font-bold">BLAGAJNA</p>
          {data.status !== "success" ? (
            <form
              className="flex h-full flex-col justify-between"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-1.5">
                <label>Začetno stanje gotovine (€)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  autoComplete="off"
                  placeholder="Vnos začetnega stanja gotovine (€)"
                  className="bg-neutral rounded-2xl p-5 shadow-[1px_1px_4px_rgba(0,0,0,0.25)] outline-none"
                  onChange={(e) => setStartCahsBalance(e.target.value)}
                />
              </div>
              <button
                className="from-primary to-secondary drop-shadow-btn hover:to-primary flex cursor-pointer items-center gap-4 self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray-400"
                disabled={isLoading}
              >
                {isLoading ? (
                  "..."
                ) : (
                  <>
                    Potrdi vnos <ChevronRightIcon className="h-4 stroke-3" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form
              className="flex h-full flex-col justify-between"
              onSubmit={handleEndSubmit}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label>Končno stanje gotovine (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    autoComplete="off"
                    placeholder="Vnos končnega stanja gotovine (€)"
                    className="bg-neutral rounded-2xl p-5 shadow-[1px_1px_4px_rgba(0,0,0,0.25)] outline-none"
                    onChange={(e) => setEndCahsBalance(e.target.value)}
                  />
                </div>{" "}
                <div className="flex flex-col gap-1.5">
                  <label>Končno stanje kartic (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    autoComplete="off"
                    placeholder="Vnos končnega stanja kartic (€)"
                    className="bg-neutral rounded-2xl p-5 shadow-[1px_1px_4px_rgba(0,0,0,0.25)] outline-none"
                    onChange={(e) => setEndCardBalance(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="from-primary to-secondary drop-shadow-btn hover:to-primary flex cursor-pointer items-center gap-4 self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray-400"
                disabled={isLoading}
              >
                {isLoading ? (
                  "..."
                ) : (
                  <>
                    Potrdi vnos in se odjavi{" "}
                    <ChevronRightIcon className="h-4 stroke-3" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
