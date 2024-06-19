import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(1, "Campo obrigatório."),
    description: z.string().min(1, "Campo obrigatório."),
    price: z.string().min(1, "Campo obrigatório."),
    img: z.string().min(1, "Campo obrigatório."),
});