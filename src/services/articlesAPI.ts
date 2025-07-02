export async function getArticles(
  name: string,
  ageGroup?: string,
  label?: string,
) {
  try {
    const params = new URLSearchParams();
    params.append("name", name);
    params.append("sort", "name");

    if (ageGroup) params.append("ageGroup", ageGroup);
    if (label) params.append("label", label);
    if (!label) params.append("gift", "true");

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/articles/getvisiblereception?${params.toString()}`,
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
    return error;
  }
}

export async function getOneArticle(id: string) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/articles/${id}`, {
      method: "GET",
      credentials: "include",
    });

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
    return error;
  }
}

export async function sellArticles(id: string, bodyData: unknown) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/articles/sellinperson/${id}`,
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
    return error;
  }
}
