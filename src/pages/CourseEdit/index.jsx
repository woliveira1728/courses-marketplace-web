import styles from "./style.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./formSchema";
import Button from "../../fragments/Button";
import Input from "../../fragments/Input";
import { useContext, useEffect } from "react";
import { UserContext } from '../../providers/UserContext';
import { useParams } from 'react-router-dom';


const CourseEdit = () => {
    const { myCoursesForSale, courseEdit, navigate } = useContext(UserContext);
    const { courseId } = useParams();

    const course = myCoursesForSale.find(course => course.id === courseId);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
    });
    
    useEffect(() => {
        if (course) {
            setValue("title", course.title);
            setValue("description", course.description || "");
            setValue("price", course.price || "");
            setValue("img", course.img || "");
        }
    }, [course, setValue]);

    const onSubmit = (formData) => {
        courseEdit(courseId, formData);
    };

    return (
        
        <main className={styles.registerContainer}>
            <div className={styles.registerHeader}>
                <h1>Courses Marketplace</h1>
                <div><Button name="Voltar" status="disable-hover" linkRoute="/" /></div>
            </div>
            <section className={styles.registerContent}>
                <h1>Registre seu curso</h1>
                <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} >
                    <Input type="text" label="Título" placeholder="Título do curso" {...register("title")} error={errors.title} disabled={true} />
                    <Input type="text" label="Descrição" placeholder="Descrição do curso" {...register("description")} error={errors.description} />
                    <Input type="text" label="Preço" placeholder="Preço" {...register("price")} error={errors.price} />
                    <Input type="text" label="Imagem" placeholder="Link da imagem" {...register("img")} error={errors.img} />
                    
                    <Button type="submit" name="Registrar" status="negative" />
                </form>
            </section>
        </main>
    );
    
};

export default CourseEdit;