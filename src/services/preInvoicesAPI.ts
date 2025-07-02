export async function getUserUnpaidPreinvoices(id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/preinvoices/user/${id}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.status === "error") {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw Error(data.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}

export async function openPreInvoice(id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/preinvoices/downloadreception/${id}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.status === "error") {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw Error(data.message);
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  } catch (error) {
    return error as Error;
  }
}

export async function createInvoiceFromPreInvoice({
  id,
  paymentMethod,
}: {
  id: string;
  paymentMethod: string;
}) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/preinvoices/createinvoicereception/${id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ paymentMethod }),
      },
    );

    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      if (data.status === "error") {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw Error(data.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}
