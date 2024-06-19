import styles from "./style.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./formSchema";
import Button from "../../fragments/Button";
import Input from "../../fragments/Input";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";

const Register = () => {
    const { userRegister } = useContext(UserContext);
    const [showPwd, setShowPwd] = useState(false);
    const [showPwd2, setShowPwd2] = useState(false);
    
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
                <h1>Crie sua conta</h1>
                <span>Rápido e grátis, vamos nessa</span>
                <form className={styles.formContainer} onSubmit={handleSubmit(userRegister)} >
                    <Input type="text" label="Nome" placeholder="Digite aqui seu nome" {...register("name")} error={errors.name} />
                    <Input type="email" label="Email" placeholder="Digite aqui seu email" {...register("email")} error={errors.email} />
                    <Input type={showPwd ? "text" : "password"} label="Senha" placeholder="Digite aqui sua senha" {...register("password")} error={errors.password} showPwd={showPwd} setShowPwd={setShowPwd} />
                    <Input type={showPwd ? "text" : "password"} label="Confirmar Senha" placeholder="Confirme sua senha" {...register("confirmPassword")} showPwd2={showPwd2} setShowPwd2={setShowPwd2} />
                    <Button type="submit" name="Cadastrar" status="negative" />
                </form>
            </section>
        </main>
    );
};

export default Register;