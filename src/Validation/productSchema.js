import { z } from "zod";

/* =====================================================
   Base Product Schema (مشترك)
===================================================== */
const baseProductSchema = z.object({
  // اسم المنتج
  prodName: z
    .string()
    .trim()
    .min(3, "اسم المنتج يجب أن يكون 3 حروف على الأقل")
    .max(100, "اسم المنتج طويل جداً"),

  // الوصف
  prodDescription: z
    .string()
    .trim()
    .min(10, "الوصف يجب أن يكون تفصيلياً (10 حروف على الأقل)")
    .max(2000, "الوصف طويل جداً"),

  // السعر الأساسي
  priceBefore: z.coerce
    .number({ invalid_type_error: "يجب إدخال رقم صحيح للسعر" })
    .positive("السعر يجب أن يكون رقماً موجباً أكبر من 0")
    .min(1, "السعر لا يمكن أن يكون أقل من 1"),

  // سعر الخصم (اختياري)
  priceAfterDiscount: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce
      .number()
      .nonnegative("سعر الخصم لا يمكن أن يكون سالباً")
      .optional()
  ),

  // الكمية
  qty: z.coerce
    .number()
    .int("الكمية يجب أن تكون رقماً صحيحاً")
    .nonnegative("الكمية لا يمكن أن تكون أقل من الصفر"),

  // التصنيف الرئيسي
  catID: z
    .string()
    .refine((val) => val !== "0" && val !== "", "من فضلك اختر تصنيف رئيسي"),

  // البراند (اختياري)
  brandID: z
    .string()
    .optional()
    .refine((val) => !val || val !== "0", "من فضلك اختر براند صحيح"),

  // الألوان (Hex)
  colors: z
    .array(
      z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "لون غير صالح")
    )
    .default([]),

  // التصنيفات الفرعية (react-select)
  selectedSubID: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .default([]),
});

/* =====================================================
   Add Product Schema
===================================================== */
export const addProductSchema = baseProductSchema.refine(
  (data) => {
    if (
      data.priceAfterDiscount &&
      Number(data.priceAfterDiscount) >= Number(data.priceBefore)
    ) {
      return false;
    }
    return true;
  },
  {
    message: "سعر الخصم يجب أن يكون أقل من السعر الأصلي",
    path: ["priceAfterDiscount"],
  }
);

/* =====================================================
   Edit Product Schema
   (كل الحقول اختيارية ما عدا المنطق)
===================================================== */
export const editProductSchema = baseProductSchema
  .partial()
  .refine(
    (data) => {
      if (
        data.priceAfterDiscount &&
        data.priceBefore &&
        Number(data.priceAfterDiscount) >= Number(data.priceBefore)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "سعر الخصم يجب أن يكون أقل من السعر الأصلي",
      path: ["priceAfterDiscount"],
    }
  );

