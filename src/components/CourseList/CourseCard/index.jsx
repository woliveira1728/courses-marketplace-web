import { useContext } from "react";
import styles from "./style.module.scss";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../providers/UserContext";


export const CourseCard = ({ course, addItemCart, isPurchased, isForSale, buyCourse, courseDelete }) => {
    const { isAdmin, adminEditStatusCourse, admCourseDelete, navigate } = useContext(UserContext);

    const openCurseDetails = () => {
        navigate(`/course/${course.id}`);
    };

    const openCurseEdit = () => {
        navigate(`/course/edit/${course.id}`);
    };

    const editCourse = (status) => {
        adminEditStatusCourse(course.id, status);
        navigate("/dashboard");
    };

    return (
        <>

            <li className={styles.courseCard} >

                <img src={`${course.img}`} alt="Link da imagem do curso" />
                <div className={styles.courseInfo}>

                    <h3 className={styles.courseTitle} onClick={openCurseDetails} >{course.title}</h3>
                    <p className={styles.pInfo}>{course.description}</p>
                    <p className={styles.pInfo}> R$ {course.price},00 </p>
                    <p className={styles.pInfo}> Instrutor: {course.instructor} </p>
                    {
                        isAdmin ? <p className={styles.pInfo}> Status: {
                            course.status === "PENDING" ? "PENDENTE" :
                            course.status === "APPROVED" ? "APROVADO" :
                            "REJEITADO"
                        } </p>
                        : null
                    }

                </div>
                {
                    isAdmin ?
                    <>
                        <button className={styles.bntDefault} onClick={() => editCourse("APPROVED")} >
                            APROVAR
                        </button>
                        <button className={styles.bntDefault} onClick={() => editCourse("REJECTED")} >
                            REJEITAR
                        </button>
                        <button className={styles.bntDefault} onClick={() => admCourseDelete(course.id)} >
                            DELETAR
                        </button>
                    </>
                    : isForSale ?
                    <>
                        <button className={styles.bntDefault} onClick={openCurseEdit} >
                            Editar
                        </button>
                        <button className={styles.bntDefault} onClick={() => courseDelete(course.id)} >
                            Deletar
                        </button>
                    </>
                    : isPurchased ?
                    <button className={styles.bntDefault} >
                        Assistir curso
                    </button>
                    :
                    <>
                        <button className={styles.bntDefault}  onClick={() => addItemCart(course)} >
                            Adicionar ao carrinho
                        </button>
                        <button className={styles.bntDefault} onClick={() => buyCourse(course)} >
                            Comprar
                        </button>
                    </>
                }
            </li>

        </>
    );
};