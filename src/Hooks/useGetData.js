import baseURL from "../Api/baseURL";

// دالة جلب البيانات (GET)
export const getData = async (url, params = {}) => {
  const res = await baseURL.get(url, { params });
  return res.data;
};

export const getDataWithToken = async (url, params = {}) => {
  const res = await baseURL.get(url, {
    params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
