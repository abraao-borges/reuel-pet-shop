const getBackendUrl = () =>
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://reuel-pet-shop.onrender.com";

const buildAuthHeader = (basicToken) => ({
  Authorization: `Basic ${basicToken}`,
  "Content-Type": "application/json",
});

const request = async (path, basicToken, options = {}) => {
  const response = await fetch(`${getBackendUrl()}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...buildAuthHeader(basicToken),
    },
  });

  if (response.status === 401 || response.status === 403) {
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const verifyOwnerCredentials = async (basicToken) =>
  request("/api/admin/products", basicToken, { method: "GET" });

export const fetchAdminProducts = async (basicToken) =>
  request("/api/admin/products", basicToken, { method: "GET" });

export const createAdminProduct = async (basicToken, payload) =>
  request("/api/admin/products", basicToken, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateAdminProduct = async (basicToken, productId, payload) =>
  request(`/api/admin/products/${productId}`, basicToken, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteAdminProduct = async (basicToken, productId) =>
  request(`/api/admin/products/${productId}`, basicToken, {
    method: "DELETE",
  });

export const reorderAdminProducts = async (basicToken, productIds) =>
  request("/api/admin/products/reorder", basicToken, {
    method: "PUT",
    body: JSON.stringify({ productIds }),
  });

export const fetchAdminOrders = async (basicToken) =>
  request("/api/admin/orders", basicToken, { method: "GET" });

export const updateAdminOrderStatus = async (basicToken, orderId, status) =>
  request(`/api/admin/orders/${orderId}/status`, basicToken, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
