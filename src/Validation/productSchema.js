import { z } from 'zod';

const baseProductSchema = z.object({
  prodName: z.string().trim().min(3, 'اسم المنتج قصير جداً'),
  prodDescription: z.string().trim().min(10, 'الوصف قصير جداً'),
  priceBefore: z.coerce.number().positive('السعر يجب أن يكون موجباً'),
  priceAfterDiscount: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.coerce.number().nonnegative().optional()
  ),
  qty: z.coerce.number().int().nonnegative(),
  catID: z.string().refine((val) => val !== '0', 'اختر تصنيف رئيسي'),
  brandID: z.string().optional(),

  colors: z.preprocess(
    (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;

      if (typeof val === 'string') return [val];
      return val;
    },
    z
      .array(z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, 'لون غير صالح'))
      .default([])
  ),
  selectedSubID: z.preprocess(
    (val) => {
      if (!val) return [];
      if (typeof val === 'object' && !Array.isArray(val)) return [val];
      return val;
    },
    z.array(z.object({ value: z.string(), label: z.string() })).default([])
  ),
});

export const addProductSchema = baseProductSchema.refine(
  (data) =>
    !data.priceAfterDiscount ||
    Number(data.priceAfterDiscount) < Number(data.priceBefore),
  {
    message: 'سعر الخصم يجب أن يكون أقل من السعر الأصلي',
    path: ['priceAfterDiscount'],
  }
);

export const editProductSchema = baseProductSchema.partial().refine(
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
    message: 'سعر الخصم يجب أن يكون أقل من السعر الأصلي',
    path: ['priceAfterDiscount'],
  }
);
