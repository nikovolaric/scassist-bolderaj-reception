export async function getAllGifts(
  giftCode: string,
  label: string,
  page: number,
  limit: number,
  used: boolean,
  expired: boolean,
) {
  try {
    const params = new URLSearchParams();
    params.append("giftCode", giftCode);
    params.append("label", label);
    params.append("limit", limit.toString());
    params.append("page", page.toString());
    params.append("used", used.toString());
    if (expired) {
      params.append("expired", expired.toString());
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/gifts?${params.toString()}`,
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

export async function getOneGift(id: string) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/gifts/${id}`, {
      method: "GET",
      credentials: "include",
    });

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

export async function confirmGift(id: string, userId: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/gifts/${id}/usegift`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ userId }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      if (data.status === "error") {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw Error(data.message);
    }

    return data;
  } catch (error) {
    return error as Error;
  }
}
