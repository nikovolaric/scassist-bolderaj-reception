export async function getCRR() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/cashregister/get`,
      {
        method: "GET",
        credentials: "include",
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

export async function startCashRegisterRecord(startCashBalance: string) {
  try {
    const bodyData = {
      startCashBalance,
      startCreditCardBalance: 0,
    };

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/cashregister/start`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(bodyData),
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

export async function endCashRegisterRecord(
  endCashBalance: string,
  endCreditCardBalance: string,
) {
  try {
    const bodyData = {
      endCashBalance,
      endCreditCardBalance,
    };

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/cashregister/end`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(bodyData),
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
