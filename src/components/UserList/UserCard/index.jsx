import { useContext } from "react";
import styles from "./style.module.scss";
import { UserContext } from "../../../providers/UserContext";


export const UserCard = ({ user }) => {
    const { adminEditUser, admUserDelete } = useContext(UserContext);

    return (
        <>

            <li className={styles.courseCard} >

                <div className={styles.courseInfo}>

                    <h3 className={styles.courseTitle} >NOME: {user.name}</h3>
                    <p className={styles.pInfo}>E-MAIL: {user.email}</p>
                    <p className={styles.pInfo}>ID: {user.id}</p>
                    <p className={styles.pInfo}>FUNÇÃO: {user.isSeller ? "VENDEDOR" : "USUÁRIO"} <span onClick={() => adminEditUser(user.id)}>editar</span></p>
                    <button className={styles.bntDefault} onClick={() => admUserDelete(user.id)} >
                        Deletar
                    </button>

                </div>
                
            </li>

        </>
    );
};