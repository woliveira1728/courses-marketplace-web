import styles from "./style.module.scss";
import { useContext } from "react";
import { UserContext } from '../../providers/UserContext';
import { UserCard } from "./UserCard";

export const UserList = ({ allUsersForAdm }) => {
    const { userDelete } = useContext(UserContext);

    return (
        <ul className={styles.courseList}>

            {
                allUsersForAdm.map((user) =>(
                <UserCard key={user.id} user={user} userDelete={userDelete} />
                ))
                
            }

        </ul>
    );

};