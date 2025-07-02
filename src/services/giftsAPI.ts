export async function getAllGifts(
  giftCode: string,
  label: string,
  page: number,
  limit: number,
  used: boolean,
  expired: boolean,
) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/gifts?giftCode=${giftCode}&label=${label}&page=${page}&limit=${limit}&used=${used}${expired ? `&expired=true` : ""}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.error.statusCode === 500) {
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
      if (data.error.statusCode === 500) {
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

    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      if (data.error.statusCode === 500) {
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
