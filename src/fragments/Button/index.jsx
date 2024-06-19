import { Link } from "react-router-dom";
import styles from "./style.module.scss";

const Button = ({ type, name, status, onClickDefault, linkRoute }) => {

    return (
            <>
                <button type={type ? type : null} className={status === "active" ? styles.buttonDefault : status === "disable" ? styles.buttonDisable : status === "disable-hover" ? styles.buttonDisableHover : status === "negative" ? styles.buttonNegative : null} onClick={onClickDefault ? onClickDefault : null} >{ linkRoute ? <Link to={linkRoute}>{name}</Link> : name }</button>
            </>
    )
};

export default Button;