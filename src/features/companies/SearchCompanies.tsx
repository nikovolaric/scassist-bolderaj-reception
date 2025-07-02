import CompaniesList from "./CompaniesList";

function SearchCompanies() {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-3xl font-semibold">Podjetja in klubi</p>
      <CompaniesList />
    </div>
  );
}

export default SearchCompanies;
