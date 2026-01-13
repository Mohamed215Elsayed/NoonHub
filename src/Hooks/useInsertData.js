import baseURL from "../Api/baseURL";
export const insertData = async (url, data) => {
  const config = {
    headers: {
      "Content-Type":
        data instanceof FormData ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const res = await baseURL.post(url, data, config);
  return res.data;
};
/************** */
// export const insertDataWithImage = async (url, data) => {
//     const config = {
//         headers: { "Content-Type": "multipart/form-data" }
//     };
//     const res = await baseURL.post(url, data, config);
//     return res.data;
// };

// export const insertData = async (url, data) => {
//     const res = await baseURL.post(url, data);
//     return res.data;
// };
/***** method 2*/
// export const insertData = async (url, data, isImage = false) => {
//     const config = isImage ? {
//         headers: { "Content-Type": "multipart/form-data" }
//     } : {};

//     const res = await baseURL.post(url, data, config);
//     return res.data;
// };

// export const insertDataWithImage = (url, data) => insertData(url, data, true);
/****method 3**** */
// export const insertData = async (url, data) => {
//   const config =
//     data instanceof FormData
//       ? {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       : {};

//   const res = await baseURL.post(url, data, config);
//   return res.data;
// };

// export const updateData = async (url, data) => {
//   const config =
//     data instanceof FormData
//       ? {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       : {};

//   const res = await baseURL.put(url, data, config);
//   return res.data;
// };
