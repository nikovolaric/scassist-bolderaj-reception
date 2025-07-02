import { useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCart, removeItem } from "./slices/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { getOneArticle } from "../../services/articlesAPI";
import { TrashIcon } from "@heroicons/react/24/outline";

function CartMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<
    | {
        articleId: string;
        quantity: number;
      }[]
    | null
  >(null);
  const cartSlice = useAppSelector(getCart);

  useEffect(
    function () {
      const articlesData = localStorage.getItem("articles");
      if (articlesData) {
        setCart(JSON.parse(articlesData));
      }
    },
    [cartSlice],
  );

  return (
    <>
      <div className="from-primary to-secondary drop-shadow-btn hover:to-primary relative z-50 h-12 w-12 rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300">
        <div
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          className="absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center rounded-lg"
        >
          <CartIcon />
        </div>
        {cart && cart.length > 0 && (
          <p className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-sm font-medium text-white">
            {cart.length}
          </p>
        )}
        {isOpen && (
          <div className="absolute top-full -right-6/2 mt-4 flex w-80 flex-col gap-4 rounded-xl bg-white px-4.5 py-4">
            {cart?.length === 0 ? (
              <p>Košarica je prazna...</p>
            ) : (
              <>
                {cartSlice.items.map(
                  (
                    cartItem: {
                      articleId: string;
                      quantity: number;
                      gift?: boolean;
                      useNow?: boolean;
                    },
                    i: number,
                  ) => (
                    <CartDataCard
                      key={`${cartItem.articleId}${i}`}
                      cartItem={cartItem}
                    />
                  ),
                )}
              </>
            )}
          </div>
        )}
      </div>
      {/* {isOpen && (
        
      )} */}
    </>
  );
}

function CartDataCard({
  cartItem,
}: {
  cartItem: {
    articleId: string;
    quantity: number;
    gift?: boolean;
    useNow?: boolean;
  };
}) {
  const { articleId, quantity, gift, useNow } = cartItem;

  const dispatch = useAppDispatch();
  const { data, isPending } = useQuery({
    queryKey: [articleId],
    queryFn: () => getOneArticle(articleId),
  });

  function handleClick() {
    dispatch(removeItem({ articleId, gift, useNow }));
  }

  if (isPending) return <p>...</p>;

  return (
    <div className="bg-gray/50 flex items-center justify-between rounded-lg px-2 py-2.5">
      <p className="font-normal">
        <span className="font-semibold">{quantity}x</span>{" "}
        {data.article.name.sl}
        {gift && " - bon"}
      </p>
      <TrashIcon
        className="text-secondary w-5 flex-none cursor-pointer stroke-3"
        onClick={handleClick}
      />
    </div>
  );
}

export default CartMenu;
