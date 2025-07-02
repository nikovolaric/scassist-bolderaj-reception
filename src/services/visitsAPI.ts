export async function getUserVisits(id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/visits/user/${id}`,
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

export async function getDailyVisits() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/visits/dailyvisits`,
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
