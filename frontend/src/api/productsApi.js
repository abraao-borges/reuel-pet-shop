const getBackendUrl = () =>
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://reuel-pet-shop.onrender.com";

export const fetchProducts = async ({ query, petSpecies } = {}) => {
  const params = new URLSearchParams();

  if (query && query.trim().length > 0) {
    params.append("query", query.trim());
  }

  if (petSpecies && petSpecies !== "ALL") {
    params.append("petSpecies", petSpecies);
  }

  const endpoint = `${getBackendUrl()}/api/products${params.toString() ? `?${params}` : ""}`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};
