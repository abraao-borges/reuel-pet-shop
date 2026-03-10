const getBackendUrl = () =>
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://reuel-pet-shop.onrender.com";

export const fetchOrders = async () => {
  const response = await fetch(`${getBackendUrl()}/api/orders`);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return response.json();
};
