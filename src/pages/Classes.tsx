import Header from "../components/Header";
import SearchClasses from "../features/classes/SearchClasses";

function Classes() {
  return (
    <div className="my-16 flex flex-col gap-20">
      <Header />
      <div className="flex flex-col gap-16">
        <p className="text-3xl font-semibold">Aktivnosti in vodene vadbe</p>
        <SearchClasses />
      </div>
    </div>
  );
}

export default Classes;
