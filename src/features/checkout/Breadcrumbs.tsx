import { ChevronRightIcon } from "@heroicons/react/24/outline";

function Breadcrumbs({ name }: { name: string }) {
  return (
    <p className="flex items-center gap-4 text-3xl font-semibold">
      <span>{name}</span>
      <ChevronRightIcon className="h-6 stroke-3" />
      <span>Izberi uporabnika</span>
    </p>
  );
}

export default Breadcrumbs;
