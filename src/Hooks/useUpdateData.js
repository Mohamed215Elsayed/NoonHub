import baseURL from "../Api/baseURL";

export const updateData = async (url, data) => {
  const config = {
    headers: {
      "Content-Type":
        data instanceof FormData ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const res = await baseURL.put(url, data, config);
  return res.data;
};

