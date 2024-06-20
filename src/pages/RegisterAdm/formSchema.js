import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(1, "Campo obrigatório."),
    email: z.string().email("Email inválido.").min(1, "Campo obrigatório."),
    password: z
        .string()
        .min(8, "Mínimo 8 caracteres.")
        .regex(/[A-Z]/, "Mínimo uma letra maiúscula.")
        .regex(/[a-z]/, "Mínimo uma letra minúscula.")
        .regex(/[0-9]/, "Mínimo um número.")
        .regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+/, "É necessário conter pelo menos um caracter especial."),
    confirmPassword: z.string().min(8, "Confirmar a senha"),
    isSeller: z.boolean().optional()
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não correspondem.",
    path: [ "confirmPassword" ],
});