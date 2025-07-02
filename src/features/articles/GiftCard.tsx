import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../app/hooks";
import { addItem, removeItem } from "./slices/cartSlice";
import { useState } from "react";

function GiftCard({
  article,
}: {
  article: { name: { sl: string }; priceDDV: number; _id: string };
}) {
  const { name, priceDDV, _id } = article;
  const [quantity, setQuantity] = useState(0);
  const dispatch = useAppDispatch();

  function handleMinus() {
    if (quantity > 0) setQuantity((quantity) => quantity - 1);
  }

  function handlePlus() {
    if (quantity < 50) setQuantity((quantity) => quantity + 1);
  }

  function handleClick() {
    const newArticle = {
      articleId: _id,
      quantity,
      gift: true,
      price: priceDDV,
    };

    if (quantity) {
      dispatch(addItem(newArticle));
    } else {
      dispatch(removeItem({ articleId: _id, gift: true }));
    }
  }

  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-xs">
      <p className="font-quicksand w-1/2 flex-none text-lg font-bold uppercase">
        {name.sl}
      </p>
      <div className="border-gray flex w-fit items-center rounded-lg border-[1.5px] shadow-xs">
        <button className="cursor-pointer p-3" onClick={handleMinus}>
          <MinusIcon className="w-4 stroke-3" />
        </button>
        <p className="border-gray border-s-[1.5px] border-e-[1.5px] p-3">
          {quantity}
        </p>
        <button className="cursor-pointer p-3" onClick={handlePlus}>
          <PlusIcon className="w-4 stroke-3" />
        </button>
      </div>
      <p className="bg-primary/35 rounded-lg px-11 py-3 font-semibold">
        {priceDDV.toFixed(2).replace(".", ",")} €
      </p>
      <button
        className="from-primary to-secondary drop-shadow-btn hover:to-primary flex cursor-pointer items-center gap-4 rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300"
        onClick={handleClick}
      >
        Dodaj v košarico <PlusIcon className="h-4 stroke-3" />
      </button>
    </div>
  );
}

export default GiftCard;
