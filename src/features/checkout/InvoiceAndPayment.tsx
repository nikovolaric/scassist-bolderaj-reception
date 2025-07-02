import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearCart, getCart } from "../articles/slices/cartSlice";
import {
  addCompanyAddress,
  addCompanyCity,
  addCompanyName,
  addCompanyPostalCode,
  addCompanyTaxNumber,
  getCompanyData,
  resetCompanyData,
} from "./slices/companyDataSlice";
import { useNavigate, useParams } from "react-router";
import { sellArticles } from "../../services/articlesAPI";

function InvoiceAndPayment() {
  return (
    <>
      <CompanyInvoice />
      <Payment />
    </>
  );
}

function CompanyInvoice() {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);

  function handleChange() {
    if (isChecked) {
      setIsChecked(false);
      dispatch(resetCompanyData());
    } else {
      setIsChecked(true);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <label className="cursor-pointer">
          <input
            type="checkbox"
            className="peer hidden"
            checked={isChecked}
            onChange={handleChange}
          />
          <div className="border-gray flex h-6 w-6 items-center justify-center rounded-lg border bg-white transition-all duration-75">
            <span
              className={`${isChecked ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
            />
          </div>
        </label>
        <p className="text-lg font-medium">Račun na podjetje.</p>
      </div>
      {isChecked && (
        <form className="mt-6 ml-12 grid w-185 grid-cols-2 gap-x-14 gap-y-8 rounded-xl bg-white px-6 py-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Ime podjetja</label>
            <input
              className="rounded-lg border border-black/35 px-3.5 py-2.5 shadow-xs outline-none"
              onChange={(e) => dispatch(addCompanyName(e.target.value))}
              placeholder="Bolderaj, d.o.o."
            />
          </div>{" "}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              Ulica in hišna številka
            </label>
            <input
              className="rounded-lg border border-black/35 px-3.5 py-2.5 shadow-xs outline-none"
              onChange={(e) => dispatch(addCompanyAddress(e.target.value))}
              placeholder="Ob progi 3"
            />
          </div>{" "}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Kraj</label>
            <input
              className="rounded-lg border border-black/35 px-3.5 py-2.5 shadow-xs outline-none"
              onChange={(e) => dispatch(addCompanyCity(e.target.value))}
              placeholder="Rogaška Slatina"
            />
          </div>{" "}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Poštna številka</label>
            <input
              className="rounded-lg border border-black/35 px-3.5 py-2.5 shadow-xs outline-none"
              onChange={(e) => dispatch(addCompanyPostalCode(e.target.value))}
              placeholder="3250"
            />
          </div>{" "}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Davčna številka</label>
            <input
              className="rounded-lg border border-black/35 px-3.5 py-2.5 shadow-xs outline-none"
              onChange={(e) => dispatch(addCompanyTaxNumber(e.target.value))}
              placeholder="SI12345678"
            />
          </div>
        </form>
      )}
    </div>
  );
}

function Payment() {
  const { id } = useParams();
  const cart = useAppSelector(getCart);
  const companyData = useAppSelector(getCompanyData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === paymentMethod) {
      setPaymentMethod("");
    } else {
      setPaymentMethod(e.target.value);
    }
  }

  async function handleClick() {
    try {
      setIsLoading(true);
      const body = {
        articles: cart.items,
        paymentMethod,
        company: companyData.name ? companyData : undefined,
      };

      if (id) {
        await sellArticles(id, body);

        dispatch(resetCompanyData());
        dispatch(clearCart());

        setIsSuccess(true);
        setTimeout(function () {
          navigate("/dashboard/users");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-[9fr_3fr] gap-x-5 gap-y-8">
      <p className="text-2xl font-semibold">Način plačila</p>
      <div className="row-start-2 flex items-center justify-between">
        <div className="flex items-center gap-25">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                value="gotovina"
                checked={paymentMethod === "gotovina"}
                onChange={handleChange}
              />
              <div className="border-gray flex h-6 w-6 items-center justify-center rounded-lg border bg-white transition-all duration-75">
                <span
                  className={` ${paymentMethod === "gotovina" ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
                />
              </div>
            </label>
            <p className="text-lg font-medium">Gotovina</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                value="card"
                checked={paymentMethod === "card"}
                onChange={handleChange}
              />
              <div className="border-gray flex h-6 w-6 items-center justify-center rounded-lg border bg-white transition-all duration-75">
                <span
                  className={` ${paymentMethod === "card" ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
                />
              </div>
            </label>
            <p className="text-lg font-medium">Kartica</p>
          </div>
        </div>
        {isSuccess ? (
          <p className="text-lg font-semibold">Račun je bil uspešno poslan.</p>
        ) : (
          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary flex cursor-pointer items-center gap-10 rounded-lg bg-gradient-to-r px-4 py-3 text-lg font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
            onClick={handleClick}
            disabled={isLoading || !paymentMethod}
          >
            Zaključi in pošlji račun{" "}
            <ChevronRightIcon className="h-6 stroke-3" />
          </button>
        )}
      </div>
    </div>
  );
}

export default InvoiceAndPayment;
