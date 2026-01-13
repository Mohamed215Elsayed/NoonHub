import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    phone: z
      .string()
      .optional()
      .refine((val) => {
        if (!val) return true;
        const eg = /^(?:\+?20|0)?1[0125][0-9]{8}$/;
        const sa = /^(?:\+?966)?5[0-9]{8}$/;
        return eg.test(val) || sa.test(val);
      }, "رقم الهاتف غير صحيح"),
    password: z.string().min(6, "كلمة المرور لا تقل عن 6 أحرف"),
    confirmPassword: z.string(),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: "يجب الموافقة على الشروط" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });
