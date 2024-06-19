import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(1, "Campo obrigatório."),
    description: z.string().optional(),
    price: z.string().optional(),
    img: z.string().optional(),
});