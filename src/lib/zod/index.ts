import { z } from "zod";

export type TCreateFormSchema = z.infer<typeof createFormSchema>;

export const createFormSchema = z.object({
  subject: z.string().min(1, { message: "Mapel harus diisi" }),
  hardLevel: z.enum(["Mudah", "Menengah", "Susah"]),
  grade: z.enum(["SD", "SMP", "SMA", "Kuliah"]),
  amount: z.coerce.number().min(1, { message: "Jumlah harus diisi" }),
});
