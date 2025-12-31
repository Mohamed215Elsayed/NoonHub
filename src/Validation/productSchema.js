import { z } from "zod";

export const productSchema = z
  .object({
    // اسم المنتج: منع الفراغات الزائدة والتأكد من الطول
    prodName: z
      .string()
      .trim()
      .min(3, "اسم المنتج يجب أن يكون 3 حروف على الأقل")
      .max(100, "اسم المنتج طويل جداً"),

    // الوصف: تأكد من وجود محتوى حقيقي
    prodDescription: z
      .string()
      .trim()
      .min(10, "الوصف يجب أن يكون تفصيلياً (10 حروف على الأقل)")
      .max(2000, "الوصف طويل جداً"),

    // السعر الأساسي: يجب أن يكون رقماً موجباً أكبر من الصفر
    priceBefore: z.coerce
      .number({ invalid_type_error: "يجب إدخال رقم صحيح للسعر" })
      .positive("السعر يجب أن يكون رقماً موجباً أكبر من 0")
      .min(1, "السعر لا يمكن أن يكون أقل من 1"),

    // سعر الخصم: اختياري، ولكن إذا وُجد يجب أن يكون موجباً
    priceAfterDiscount: z.coerce
      .number()
      .nonnegative("سعر الخصم لا يمكن أن يكون سالباً")
      .optional()
      .or(z.literal("")), // يسمح بترك الحقل فارغاً دون خطأ

    // الكمية: يجب أن تكون رقماً صحيحاً (Integer) وموجباً أو صفر
    qty: z.coerce
      .number()
      .int("الكمية يجب أن تكون رقماً صحيحاً")
      .nonnegative("الكمية لا يمكن أن تكون أقل من الصفر"),

    // التصنيفات والبراند
    catID: z
      .string()
      .refine((val) => val !== "0" && val !== "", "من فضلك اختر تصنيف رئيسي"),

    brandID: z.string().optional(),

    // الألوان: تأكد أنها مصفوفة (حتى لو فارغة)
    colors: z.array(z.string()).default([]),

    // التصنيفات الفرعية
    selectedSubID: z.array(z.any()).default([]),
  })
  .refine(
    (data) => {
      // التحقق من منطقية الخصم: يجب أن يكون سعر الخصم أقل من السعر الأصلي
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
      path: ["priceAfterDiscount"], // تحديد مكان ظهور الخطأ
    }
  );
