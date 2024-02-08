const URL = "http://localhost:5555/buildings";

export async function getBuildings() {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log((err as Error).message);
    throw new Error((err as Error).message);
  }
}

export async function deleteBuilding(id: string) {
  try {
    const res = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log((err as Error).message);
    throw new Error((err as Error).message);
  }
}
