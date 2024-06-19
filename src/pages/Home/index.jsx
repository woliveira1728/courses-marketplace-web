import { useContext } from "react";
import { CourseList } from "../../components/CourseList";
import styles from "./style.module.scss";
import { UserContext } from "../../providers/UserContext";



export const Home = () => {
    const { courseList } = useContext(UserContext);

    return (
        <section className={styles.sectionHome}>

            <h2 className={styles.secTitle}>CONHEÇA NOSSO CURSOS</h2>

            <CourseList />
            
        </section>
    );
    
};

export default Home;