import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useParams } from "react-router";
import { getOneUser, getUserChildren } from "../../services/userAPI";
import Spinner from "../../components/Spinner";
import { getArticles } from "../../services/articlesAPI";
import TicketCard from "./TicketCard";
import ClassCard from "./ClassCard";
import GiftCard from "./GiftCard";

function SearchAndFilterArticles() {
  const [label, setLabel] = useState("V");
  const [name, setName] = useState("");
  const [ageGroup, setAgeGroup] = useState("adult");
  const [isChild, setIsChild] = useState(false);
  const { id } = useParams();

  const { data: userData, isPending: userPending } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getOneUser(id!),
    enabled: !!id,
  });

  const group = label === "" ? ageGroup : "";

  const [
    { data, isPending },
    { data: childrenData, isPending: childrenPending },
  ] = useQueries({
    queries: [
      {
        queryKey: ["articles", name, label, group, isChild],
        queryFn: () =>
          getArticles(
            name,
            label === "" ? ageGroup : !isChild ? userData.data.ageGroup[0] : "",
            label,
          ),
        enabled: !userPending,
      },
      {
        queryKey: ["userChildren", id],
        queryFn: () => getUserChildren(id!),
        enabled: !!id && isChild,
      },
    ],
  });

  return (
    <>
      <div className="drop-shadow-input border-gray/75 flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
        <MagnifyingGlassIcon className="h-4 stroke-3" />
        <input
          placeholder="Išči po artiklih"
          className="w-full outline-none"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {isPending ? (
        <p>...</p>
      ) : (
        <Filter
          label={label}
          setLabel={setLabel}
          parentOf={userData.data.parentOf}
          isChild={isChild}
          setIsChild={setIsChild}
        />
      )}
      {label === "" && (
        <AgeGroup ageGroup={ageGroup} setAgeGroup={setAgeGroup} />
      )}
      {isPending ? (
        <Spinner />
      ) : (
        <>
          {label === "V" && !isChild && (
            <>
              <div>
                <p className="text-sm font-medium">Dnevne vstopnice</p>
                <div className="flex flex-col gap-3">
                  {data.articles
                    .filter(
                      (ticket: { type: string }) => ticket.type === "dnevna",
                    )
                    .map(
                      (ticket: {
                        name: { sl: string };
                        priceDDV: number;
                        _id: string;
                      }) => (
                        <TicketCard key={ticket._id} ticket={ticket} />
                      ),
                    )}
                </div>
              </div>{" "}
              <div>
                <p className="text-sm font-medium">
                  Vstopnice za daljše obdobje
                </p>
                <div className="flex flex-col gap-3">
                  {data.articles
                    .filter(
                      (ticket: { type: string }) => ticket.type === "terminska",
                    )
                    .map(
                      (ticket: {
                        name: { sl: string };
                        priceDDV: number;
                        _id: string;
                      }) => (
                        <TicketCard key={ticket._id} ticket={ticket} />
                      ),
                    )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Paketi vstopnic</p>
                <div className="flex flex-col gap-3">
                  {data.articles
                    .filter(
                      (ticket: { type: string }) => ticket.type === "paket",
                    )
                    .map(
                      (ticket: {
                        name: { sl: string };
                        priceDDV: number;
                        _id: string;
                      }) => (
                        <TicketCard key={ticket._id} ticket={ticket} />
                      ),
                    )}
                </div>
              </div>
            </>
          )}
          {label === "V" && isChild && (
            <>
              {childrenPending ? (
                <p>...</p>
              ) : (
                childrenData.children.map(
                  (childData: {
                    child: {
                      fullName: string;
                      ageGroup: string[];
                      age: number;
                      _id: string;
                    };
                  }) => (
                    <div key={childData.child._id}>
                      <p className="text-sm font-medium">
                        {childData.child.fullName} ({childData.child.age} let)
                      </p>
                      <div className="flex flex-col gap-3">
                        {data.articles
                          .filter((ticket: { ageGroup: string }) =>
                            ticket.ageGroup.includes(
                              childData.child.ageGroup[0],
                            ),
                          )
                          .map(
                            (ticket: {
                              name: { sl: string };
                              priceDDV: number;
                              _id: string;
                            }) => (
                              <TicketCard
                                key={ticket._id}
                                ticket={ticket}
                                childId={childData.child._id}
                              />
                            ),
                          )}
                      </div>
                    </div>
                  ),
                )
              )}
            </>
          )}
          {label === "VV" && (
            <div>
              <p className="text-sm font-medium">Vodene vadbe</p>
              <div className="flex flex-col gap-3">
                {data.articles.map(
                  (classArticle: {
                    name: { sl: string };
                    classPriceData: { priceDDV: number };
                    _id: string;
                    label: string;
                    priceDDV: number;
                  }) => (
                    <ClassCard
                      key={classArticle._id}
                      classArticle={classArticle}
                    />
                  ),
                )}
              </div>
            </div>
          )}{" "}
          {label === "A" && (
            <div>
              <p className="text-sm font-medium">Aktivnosti</p>
              <div className="flex flex-col gap-3">
                {data.articles.map(
                  (classArticle: {
                    name: { sl: string };
                    classPriceData: { priceDDV: number };
                    _id: string;
                    label: string;
                    priceDDV: number;
                  }) => (
                    <ClassCard
                      key={classArticle._id}
                      classArticle={classArticle}
                    />
                  ),
                )}
              </div>
            </div>
          )}
          {label === "" && (
            <div>
              <p className="text-sm font-medium">Darilni boni</p>
              <div className="flex flex-col gap-3">
                {data.articles.map(
                  (article: {
                    name: { sl: string };
                    priceDDV: number;
                    _id: string;
                  }) => (
                    <GiftCard key={article._id} article={article} />
                  ),
                )}
              </div>
            </div>
          )}
          {label === "O" && (
            <div>
              <p className="text-sm font-medium">Ostali artikli</p>
              <div className="flex flex-col gap-3">
                {data.articles.map(
                  (article: {
                    name: { sl: string };
                    priceDDV: number;
                    _id: string;
                  }) => (
                    <TicketCard key={article._id} ticket={article} />
                  ),
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

const categories = [
  { name: "Vstopnice", label: "V" },
  { name: "Vodene vadbe", label: "VV" },
  { name: "Aktivnosti", label: "A" },
  { name: "Darilni boni", label: "" },
  { name: "Ostalo", label: "O" },
];

function Filter({
  label,
  setLabel,
  parentOf,
  isChild,
  setIsChild,
}: {
  label: string;
  setLabel: Dispatch<SetStateAction<string>>;
  parentOf?: string[];
  isChild: boolean;
  setIsChild: Dispatch<SetStateAction<boolean>>;
}) {
  function handleClick(label: string) {
    setLabel(label);

    if (label !== "V") {
      setIsChild(false);
    }
  }

  return (
    <div className="grid grid-cols-6 gap-x-5">
      {categories.map((category, i) => (
        <button
          key={(i + 1) * 10}
          onClick={() => handleClick(category.label)}
          className={`drop-shadow-input h-11 cursor-pointer rounded-lg bg-white px-4 font-semibold ${label === category.label ? "border-secondary border-2 shadow-[inset_1px_2px_4px_rgba(0,0,0,0.25)]" : ""}`}
        >
          {category.name}
        </button>
      ))}
      {parentOf && parentOf.length > 0 && label === "V" && (
        <button
          onClick={() => setIsChild((isChild) => !isChild)}
          className={`drop-shadow-input bg-gray/80 h-11 cursor-pointer rounded-lg px-4 font-semibold ${isChild ? "border-secondary border-2 shadow-[inset_1px_2px_4px_rgba(0,0,0,0.25)]" : ""}`}
        >
          Družinski člani
        </button>
      )}
    </div>
  );
}

function AgeGroup({
  ageGroup,
  setAgeGroup,
}: {
  ageGroup: string;
  setAgeGroup: Dispatch<SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(ageGroup: string) {
    setAgeGroup(ageGroup);

    setIsOpen(false);
  }

  return (
    <div
      className={`drop-shadow-input relative z-20 flex items-center gap-2 self-start bg-white px-5 py-2.5 ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}
    >
      <p className="font-semibod flex items-center gap-4.5 font-semibold text-black/75">
        Starostna skupina:{" "}
        <span className="drop-shadow-input border-secondary cursor-pointer rounded-lg border-2 bg-white px-4 shadow-[inset_1px_2px_4px_rgba(0,0,0,0.25)]">
          {ageGroup === "adult"
            ? "Odrasli"
            : ageGroup === "student"
              ? "15 - 25 let"
              : ageGroup === "school"
                ? "6 - 14 let"
                : "3 - 5 let"}
        </span>
        <ChevronDownIcon
          className={`h-5 cursor-pointer stroke-3 ${isOpen ? "rotate-180" : ""}`}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        />
      </p>
      {isOpen && (
        <div className="drop-shadow-input absolute top-full left-0 z-20 flex w-full flex-col gap-4 rounded-b-lg bg-white px-5 py-2.5 text-right font-medium">
          <p
            className="drop-shadow-input border-secondary cursor-pointer self-end rounded-lg border-2 bg-white px-4 shadow-[inset_1px_2px_4px_rgba(0,0,0,0.25)]"
            onClick={() => handleClick("adult")}
          >
            Odrasli
          </p>
          <p
            className="drop-shadow-input border-secondary cursor-pointer self-end rounded-lg border-2 bg-white px-4 shadow-[inset_1px_2px_4px_rgba(0,0,0,0.25)]"
            onClick={() => handleClick("student")}
          >
            15 - 25 let
          </p>
          <p
            className="drop-shadow-input border-secondary cursor-pointer self-end rounded-lg border-2 bg-white px-4 shadow-[inset_1px_2px_4px_rgba(0,0,0,0.25)]"
            onClick={() => handleClick("school")}
          >
            6 - 14 let
          </p>
          <p
            className="drop-shadow-input border-secondary cursor-pointer self-end rounded-lg border-2 bg-white px-4 shadow-[inset_1px_2px_4px_rgba(0,0,0,0.25)]"
            onClick={() => handleClick("preschool")}
          >
            3 - 5 let
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchAndFilterArticles;
