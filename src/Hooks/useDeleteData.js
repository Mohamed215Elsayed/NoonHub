import baseURL from "../Api/baseURL";

export const useDeleteData = async (url) => {
  const config = {
    headers: {
      // إضافة التوكن لضمان صلاحية الحذف من قبل الآدمن
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const res = await baseURL.delete(url, config);
  return res.data;
};
