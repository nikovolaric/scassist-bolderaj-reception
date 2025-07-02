export async function getMyIssuedInvoices(name: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/invoices/myissuedtoday?name=${name}`,
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

export async function openInvoice(id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/invoices/download/${id}`,
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
