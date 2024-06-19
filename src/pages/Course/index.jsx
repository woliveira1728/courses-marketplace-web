import { useContext, useState } from "react";
import styles from "./style.module.scss";
import { useParams } from 'react-router-dom';
import { UserContext } from "../../providers/UserContext";

export const Course = ({  }) => {
    const { myCoursesList, courseList, addItemCart, isUser, buyCourse } = useContext(UserContext);
    const { courseId } = useParams();

    const course = myCoursesList.find(course => course.id === courseId) || courseList.find(course => course.id === courseId);

    const isInMyCoursesList = myCoursesList.find(course => course.id === courseId);

    if (!course) {
        return <p>Curso não encontrado.</p>;
    }

    return (
        <section className={styles.sectionCourse}>

            <div className={styles.courseBanner}>
                <img src={course.img} alt="" />
                <p>{course.description}</p>
            </div>

            <div className={styles.courseInfos}>
                <div className={styles.leftInfo}>
                    <p><span>Título: </span>{course.title}</p>
                    <p><span>Instrutor: </span>{course.instructor}</p>
                    <p><span>Preço: R$</span>{course.price},00</p>
                </div>
                {
                    isInMyCoursesList && isUser ?
                    <>
                        <button className={styles.bntDefault} >
                            Assistir
                        </button>
                    </>
                    :
                    <div className={styles.rightInfo}>
                        <button className={styles.bntDefault} onClick={() => buyCourse(course)} >
                            Comprar
                        </button>
                        <button className={styles.bntDefault} onClick={() => addItemCart(course)} >
                            Adicionar ao carrinho
                        </button>
                    </div>
                }
            </div>

            
        </section>
    );
};