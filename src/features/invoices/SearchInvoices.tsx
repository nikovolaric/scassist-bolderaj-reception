import InvoicesList from "./InvoicesList";

function SearchInvoices() {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-3xl font-semibold">Pregled izdanih računov</p>
      <InvoicesList />
    </div>
  );
}

export default SearchInvoices;
