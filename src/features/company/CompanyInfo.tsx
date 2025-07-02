import UserList from "./UserList";
import Visits from "./Visits";

function CompanyInfo({
  company,
}: {
  company: {
    companyName: string;
    companySeat: string;
    unusedTickets: string[];
    users: {
      fullName: string;
      birthDate: string;
      _id: string;
      email: string;
    }[];
  };
}) {
  const { companyName, companySeat, users, unusedTickets } = company;

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-x-5">
      <div className="flex flex-col gap-10">
        <CompanyBasicInfo companyName={companyName} companySeat={companySeat} />
        <UserList users={users} />
      </div>
      <div className="flex flex-col gap-10">
        <Visits visitsLeft={unusedTickets.length} />
        <div>
          <p className="text-sm font-medium text-black/75">
            Število aktivnih uporabnikov
          </p>
          <p className="rounded-lg bg-white px-5 py-3 text-3xl font-semibold">
            {users.length}
          </p>
        </div>
      </div>
    </div>
  );
}

function CompanyBasicInfo({
  companyName,
  companySeat,
}: {
  companyName: string;
  companySeat: string;
}) {
  return (
    <div className="grid grid-cols-[3fr_5fr] gap-x-5">
      <div>
        <p className="text-sm font-medium text-black/75">Ime podjetja</p>
        <p className="rounded-lg bg-white px-5 py-3 font-semibold">
          {companyName}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-black/75">Sedež podjetja</p>
        <p className="rounded-lg bg-white px-5 py-3 font-semibold">
          {companySeat}
        </p>
      </div>
    </div>
  );
}

export default CompanyInfo;
