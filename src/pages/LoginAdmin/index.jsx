import Input from "../../fragments/Input";
import styles from "./style.module.scss";
import Button from "../../fragments/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./loginSchema";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";


const LoginAdmin = () => {
    const [showPwd, setShowPwd] = useState(false);
    const { adminLogin } = useContext(UserContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    return (
        <main className={styles.loginContainer}>
            <section className={styles.loginContent}>
                <h1>Login Administrativo</h1>
                <form className={styles.formContainer} onSubmit={handleSubmit(adminLogin)}>
                    <Input type="email" label="Email" placeholder="email@exemplo.com" {...register("email")} error={errors.email} />
                    <Input type={showPwd ? "text" : "password"} label="Senha" placeholder="Digite sua senha" {...register("password")} error={errors.password} showPwd={showPwd} setShowPwd={setShowPwd} />
                    <Button type="submit" name="Entrar" status="negative" />
                </form>
                <span>Ainda não possui uma conta?</span>
                <Button name="Cadastre-se" status="negative" linkRoute="/admins/register" />
            </section>
        </main>
    );
};

export default LoginAdmin;