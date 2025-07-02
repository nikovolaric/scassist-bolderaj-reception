export async function getMultipleDateClasses(
  ageGroup: string,
  name?: string,
  article?: string,
) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/classes/multipledates?ageGroup=${ageGroup}${name ? `&className=${name}` : ""}${article ? `&article=${article}` : ""}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.status === "error") {
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

export async function getSingleDateClasses(ageGroup: string, article?: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/classes/singledatesreception?ageGroup=${ageGroup}${article ? `&article=${article}` : ""}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      if (data.status === "error") {
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

export async function getSingleDateClassesFuture(
  ageGroup: string,
  article?: string,
) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/classes/singledates?ageGroup=${ageGroup}${article ? `&article=${article}` : ""}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      if (data.status === "error") {
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

export async function getOneClass(id: string) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/classes/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.status === "error") {
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

export async function checkAttendance(
  students: { id: string; dates: string[] }[],
  id: string,
) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/classes/checkattendance/${id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ students }),
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.status === "error") {
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
