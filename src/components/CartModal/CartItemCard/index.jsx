import { MdDelete } from "react-icons/md";
import styles from "./style.module.scss";

export const CartItemCard = ({ course, delItemCart }) => {
   const total = course.price;

   return (
      <li className={styles.cartCard}>
         <div className={styles.cardInfo}>
            <img src={course.img} alt={course.name} />
            <div className={styles.titlePrice}>
               <h3>{course.title}</h3>
               <span>{total.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</span>
            </div>
         </div>
         <button className={styles.buttonDelItem} aria-label="delete" title="Remover item" onClick={() => delItemCart(course.id)}>
            <MdDelete size={21} />
         </button>
      </li>
   );
};