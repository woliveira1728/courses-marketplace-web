import styles from "./style.module.scss";
import { useContext } from 'react';
import { UserContext } from '../../providers/UserContext';
import { CourseList } from '../../components/CourseList/index';
import { useEffect } from 'react';
import { UserList } from "../../components/UserList";


export const Dashboard = ({  }) => {
    const {
        getMyCourses, myCoursesList, myCoursesForSale, isSeller, getMyCoursesForSale, isUser, isAdmin, setIsSeller,
        allCoursesForAdm, getAllCoursesForAdm, allUsersForAdm, getAllUsersForAdm
    } = useContext(UserContext);
    const isPurchased = true;
    const isForSale = true;

    useEffect(() => {
        if (isUser) {
            getMyCourses();
            getMyCoursesForSale();
            getAllUsersForAdm();
        }
        if(isAdmin){
            getAllCoursesForAdm();
            getAllUsersForAdm();
        }
    }, []);

    return (
        <section className={styles.sectionDashdoard}>

            <h2 className={styles.secTitle}>DASHBOARD </h2>

            {
                isAdmin ?
                <section className={styles.secContainer}>
                    <h3 className={styles.secCourse}>Todos os Cursos</h3>
                    <CourseList allCoursesForAdm={allCoursesForAdm} />
                    <h3 className={styles.secCourse}>Todos os Usuários</h3>
                    <UserList allUsersForAdm={allUsersForAdm} />
                </section> :
                myCoursesList.length > 0 ?
                <section className={styles.secContainer}>
                    <h3 className={styles.secCourse}>Meus cursos comprados</h3>
                    <CourseList myCoursesList={myCoursesList} isPurchased={isPurchased} />
                </section> :
                <section className={styles.secContainer}>
                    <h3 className={styles.secCourse}>Meus cursos comprados</h3>
                    <h3 className={styles.notCourse}>Você ainda não tem cursos comprados</h3>
                </section>
            }

            {
                isSeller && myCoursesForSale.length > 0 ?
                <section className={styles.secContainer}>
                    <h3 className={styles.secCourse}>Meus cursos a venda</h3>
                    <CourseList myCoursesForSale={myCoursesForSale} isForSale={isForSale} />
                </section>
                : isSeller && !isAdmin ?
                <section className={styles.secContainer}>
                    <h3 className={styles.secCourse}>Meus cursos a venda</h3>
                    <h3 className={styles.notCourse}>Você ainda não tem cursos a venda</h3>
                </section>
                : null
            }
            
        </section>
    );
    
};