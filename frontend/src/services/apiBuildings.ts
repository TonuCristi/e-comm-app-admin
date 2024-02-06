export async function getBuildings() {
  try {
    const res = await fetch("http://localhost:5555/buildings");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log((err as Error).message);
    throw new Error((err as Error).message);
  }
}
