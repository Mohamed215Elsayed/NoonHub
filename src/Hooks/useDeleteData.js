import baseURL from "../Api/baseURL";

export const deleteData = async (url) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const res = await baseURL.delete(url, config);
  return res.data;
};
