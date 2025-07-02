import { useParams } from "react-router";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getOneCompany } from "../services/companiesAPI";
import Spinner from "../components/Spinner";
import CompanyInfo from "../features/company/CompanyInfo";

function Company() {
  const { id } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["company", id],
    queryFn: () => getOneCompany(id!),
    enabled: !!id,
  });

  return (
    <div className="my-16 flex flex-col gap-20">
      <Header />
      {isPending ? <Spinner /> : <CompanyInfo company={data.data} />}
    </div>
  );
}

export default Company;
