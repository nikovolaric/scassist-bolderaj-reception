import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addUseNow,
  getCart,
  removeOtherId,
  removeUseNow,
} from "../articles/slices/cartSlice";
import { getOneArticle } from "../../services/articlesAPI";
import { Link, useLocation, useParams } from "react-router";
import { getOneUser } from "../../services/userAPI";

function CartItems() {
  const cart = useAppSelector(getCart);

  return (
    <div className="flex flex-col gap-10">
      {cart.items.map((cartItem, i) => (
        <CartItemCard key={`${cartItem.articleId}${i}`} cartItem={cartItem} />
      ))}
      <div className="grid grid-cols-[9fr_3fr] gap-x-5">
        <div className="border-secondary flex items-center justify-between rounded-xl border-2 bg-white px-8 py-6.5">
          <p className="text-xl font-medium">Skupaj za plačilo:</p>
          <p className="bg-primary/35 rounded-lg px-9 py-2 text-xl font-semibold">
            {cart.items
              .reduce((c, a) => c + a.price * a.quantity, 0)
              .toFixed(2)
              .replace(".", ",")}{" "}
            €
          </p>
        </div>
      </div>
    </div>
  );
}

function CartItemCard({
  cartItem,
}: {
  cartItem: {
    articleId: string;
    quantity: number;
    gift?: boolean;
    useNow?: boolean;
    otherId?: string;
  };
}) {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { articleId, quantity, gift, useNow, otherId } = cartItem;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const user = queryClient.getQueryData<{ data: { ageGroup: string } }>([
    "user",
    id,
  ]);
  const [{ data, isPending }, { data: userData, isPending: pendingUser }] =
    useQueries({
      queries: [
        {
          queryKey: [articleId],
          queryFn: () => getOneArticle(articleId),
        },
        {
          queryKey: ["otherUser", otherId],
          queryFn: () => getOneUser(otherId!),
          enabled: !!otherId,
        },
      ],
    });

  function handleChange() {
    if (!cartItem.useNow) {
      dispatch(addUseNow(articleId));
    } else {
      const price =
        data.article.label === "VV"
          ? data.article.classPriceData.priceDDV
          : data.article.priceDDV;

      dispatch(removeUseNow({ articleId, price }));
    }
  }

  function handleChangeOtherId() {
    const price =
      data.article.label === "VV"
        ? data.article.classPriceData.priceDDV
        : data.article.priceDDV;
    if (otherId) {
      dispatch(removeOtherId({ articleId, otherId, price }));
    }
  }

  if (isPending) {
    return <span>...</span>;
  }

  return (
    <>
      {Array.from({ length: quantity }).map((_, i) => (
        <div className="grid grid-cols-[9fr_3fr] items-start gap-x-5" key={i}>
          <div className="grid grid-cols-[3fr_5fr_1fr] items-center rounded-xl bg-white px-8 py-6.5">
            <>
              <p className="text-lg font-medium">
                {data.article.label === "V"
                  ? "Vstopnice"
                  : data.article.label === "VV"
                    ? "Vodene vadbe"
                    : data.article.label === "A"
                      ? "Aktivnosti"
                      : "Ostalo"}
              </p>
              <p className="font-quicksand text-lg font-bold uppercase">
                {data.article.name.sl} {gift && " - darilni bon"}
              </p>
              <p className="text-lg font-semibold">
                {data.article.label === "VV"
                  ? data.article.classPriceData.priceDDV
                      .toFixed(2)
                      .replace(".", ",")
                  : data.article.priceDDV.toFixed(2).replace(".", ",")}
                €
              </p>
            </>
          </div>
          {data.article.label === "V" && !gift && (
            <div className="flex h-full flex-col items-start justify-between">
              <div className="flex items-center gap-3">
                {!otherId && (
                  <>
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer hidden"
                        defaultChecked={useNow}
                        onChange={handleChange}
                      />
                      <div className="border-gray flex h-6 w-6 items-center justify-center rounded-lg border bg-white transition-all duration-75">
                        <span
                          className={` ${useNow ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
                        />
                      </div>
                    </label>
                    <p className="font-medium">Vnovči zdaj</p>
                  </>
                )}
              </div>
              {otherId && (
                <div className="flex items-center gap-3">
                  {user && user.data.ageGroup === userData.data.ageGroup && (
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer hidden"
                        defaultChecked={!!otherId}
                        onChange={handleChangeOtherId}
                      />
                      <div className="border-gray flex h-6 w-6 items-center justify-center rounded-lg border bg-white transition-all duration-75">
                        <span
                          className={` ${otherId ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
                        />
                      </div>
                    </label>
                  )}
                  <div>
                    {pendingUser ? (
                      "..."
                    ) : (
                      <>
                        <p className="font-medium">{userData.data.fullName}</p>
                        <p>
                          {new Date(userData.data.birthDate).toLocaleDateString(
                            "sl-SI",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
              {!otherId && !useNow && (
                <Link
                  to={`${pathname}/${articleId}`}
                  className="bg-gray/35 cursor-pointer rounded-lg px-4 py-1 shadow-[1px_1px_4px_rgba(0,0,0,0.25)]"
                >
                  Vnovči drugemu uporabniku
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default CartItems;
