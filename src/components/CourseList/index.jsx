import { CourseCard } from "./CourseCard";
import styles from "./style.module.scss";
import { useContext } from "react";
import { UserContext } from '../../providers/UserContext';

export const CourseList = ({ myCoursesList, myCoursesForSale, isPurchased, isForSale }) => {
    const { courseList, addItemCart, buyCourse, courseDelete } = useContext(UserContext);

    return (
        <ul className={styles.courseList}>

            {
                myCoursesList ?
                myCoursesList.map((course) =>(
                <CourseCard key={course.id} course={course} addItemCart={addItemCart} isPurchased={isPurchased} buyCourse={buyCourse} />
                ))
                : myCoursesForSale ?
                myCoursesForSale.map((course) =>(
                    <CourseCard key={course.id} course={course} addItemCart={addItemCart} isForSale={isForSale} buyCourse={buyCourse} courseDelete={courseDelete} />
                    ))
                : courseList.map((course) =>(
                <CourseCard key={course.id} course={course} addItemCart={addItemCart} buyCourse={buyCourse} />
                ))
            }

        </ul>
    );

};