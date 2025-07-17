import Header from "../components/Header";
import CompanyAndGits from "../features/user/CompanyAndGits";
import TicketsAndClasses from "../features/user/TicketsAndClasses";
import UserInfo from "../features/user/UserInfo";
import UserParent from "../features/user/UserParent";
import UserPreInvoices from "../features/user/UserPreInvoices";
import VisitsAndUserInfo from "../features/user/VisitsAndUserInfo";

function User() {
  return (
    <div className="my-16 flex flex-col gap-20">
      <Header />
      <UserInfo />
      <TicketsAndClasses />
      <CompanyAndGits />
      <VisitsAndUserInfo />
      <UserParent />
      <UserPreInvoices />
    </div>
  );
}

export default User;
