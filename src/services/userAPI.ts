export async function getMe() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/getme`, {
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

    return data.me;
  } catch (error) {
    return error as Error;
  }
}

export async function getAllUsers(
  page: number,
  limit: number,
  lastName?: string,
) {
  try {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (lastName) params.append("lastName", lastName.toString());

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users?${params.toString()}`,
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

export async function getOneUser(id: string) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
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

export async function getUserTickets(id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${id}/tickets`,
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

export async function getUserClasses(id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${id}/classes`,
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

export async function getUserActivities(id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${id}/classessingle`,
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

export async function getUserCompanies(id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${id}/companies`,
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

export async function getUserChildren(id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${id}/children`,
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
