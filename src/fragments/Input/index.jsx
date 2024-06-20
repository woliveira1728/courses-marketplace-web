import { forwardRef, useContext } from "react";
import styles from "./style.module.scss";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";


const Input = forwardRef(({showPwd2, setShowPwd2, showPwd, setShowPwd, label, error, type, ...rest}, ref) => {

    return (
        <div className={styles.inputContainer}>
            {type === "checkbox" ? (
                <div className={styles.checkInput}>
                    <input id={label} ref={ref} type={type} {...rest} />
                    <label htmlFor={label}>{label}</label>
                </div>
            ) : (
                <>
                    <label htmlFor={label}>{label}</label>
                    <input id={label} ref={ref} type={type} {...rest} placeholder={rest.placeholder} />
                    {showPwd && label === "Senha" ? (
                        <FaRegEyeSlash onClick={() => setShowPwd(!showPwd)} />
                    ) : !showPwd && label === "Senha" ? (
                        <FaRegEye onClick={() => setShowPwd(!showPwd)} />
                    ) : null}
                    {showPwd2 && label === "Confirmar Senha" ? (
                        <FaRegEyeSlash onClick={() => setShowPwd2(!showPwd2)} />
                    ) : !showPwd2 && label === "Confirmar Senha" ? (
                        <FaRegEye onClick={() => setShowPwd2(!showPwd2)} />
                    ) : null}
                </>
            )}
            {error ? <span className={styles.alertError}>{error.message}</span> : null}
        </div>
    );
});

export default Input;