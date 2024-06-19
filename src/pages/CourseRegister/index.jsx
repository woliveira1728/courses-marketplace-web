import styles from "./style.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./formSchema";
import Button from "../../fragments/Button";
import Input from "../../fragments/Input";
import { useContext } from "react";
import { UserContext } from '../../providers/UserContext';

const CourseRegister = () => {
    const { courseRegister } = useContext(UserContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
    });

    return (
        
        <main className={styles.registerContainer}>
            <div className={styles.registerHeader}>
                <h1>Courses Marketplace</h1>
                <div><Button name="Voltar" status="disable-hover" linkRoute="/" /></div>
            </div>
            <section className={styles.registerContent}>
                <h1>Registre seu curso</h1>
                <form className={styles.formContainer} onSubmit={handleSubmit(courseRegister)} >
                    <Input type="text" label="Titulo" placeholder="Ttulo do curso" {...register("title")} error={errors.title} />
                    <Input type="text" label="Descrição" placeholder="Descrição do curso" {...register("description")} error={errors.description} />
                    <Input type="text" label="Preço" placeholder="Preço" {...register("price")} error={errors.price} />
                    <Input type="text" label="Imagem" placeholder="Link da imagem" {...register("img")} error={errors.img} />
                    
                    <Button type="submit" name="Registrar" status="negative" />
                </form>
            </section>
        </main>
    );
    
};

export default CourseRegister;