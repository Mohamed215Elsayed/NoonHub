import baseURL from "../Api/baseURL";

export const updateData = async (url, data) => {
  const isFormData = data instanceof FormData;
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ...(isFormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
  };

  const res = await baseURL.put(url, data, config);
  return res.data;
};
