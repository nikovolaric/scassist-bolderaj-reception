export async function validateTicket(id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/tickets/use/${id}`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.status==="error") {
        throw new Error(
          "Nekaj je šlo narobe na strežniku! Poiskusite kasneje!",
        );
      }
      throw Error(data.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}
