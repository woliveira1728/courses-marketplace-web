import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email inválido.").min(1, "Este campo é obrigatório."),
    password: z.string().min(8, "Este campo é obrigatório.")
});