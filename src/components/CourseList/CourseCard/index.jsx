import styles from "./style.module.scss";
import { useNavigate } from 'react-router-dom';


export const CourseCard = ({ course, addItemCart, isPurchased, isForSale, buyCourse, courseDelete }) => {
    const navigate = useNavigate();

    const openCurseDetails = () => {
        navigate(`/course/${course.id}`);
    };

    const openCurseEdit = () => {
        navigate(`/course/edit/${course.id}`);
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

                </div>
                {
                    isForSale ?
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