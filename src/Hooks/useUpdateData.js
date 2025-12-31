import baseURL from "../Api/baseURL";

export const useUpdateData = async (url, data) => {
  const config = {
    headers: {
      // التبديل التلقائي بين الصور (multipart) والبيانات العادية (json)
      "Content-Type":
        data instanceof FormData ? "multipart/form-data" : "application/json",
      // إضافة التوكن لضمان صلاحية التعديل
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const res = await baseURL.put(url, data, config);
  return res.data;
};
