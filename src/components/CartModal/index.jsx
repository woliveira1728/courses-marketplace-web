import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";

export const CartModal = ({ setIsCartOpen, cartList, setCartList, delItemCart, delCart, buyAllInCart }) => {
   const total = cartList.reduce((prevValue, course) => {
      return prevValue + course.price;
   }, 0);

   return (
      <div role="dialog" className={styles.modalOverlay}>
         <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
               <h2 className={styles.modalTitle}>Carrinho de compras</h2>
               <button onClick={() => setIsCartOpen(false)} className={styles.modalCloseButton} aria-label="close" title="Fechar">
                  <MdClose size={21} />
               </button>
            </div>
            <div className={styles.modalMain}>
               <ul className={styles.cartListContainer}>
                  {cartList.map((course) => (
                     <CartItemCard key={course.id} course={course} delItemCart={delItemCart} cartList={cartList} setCartList={setCartList} />
                  ))}
               </ul>
            </div>
            <div className={styles.modalFooter}>
               <div className={styles.total}>
                  <span className={styles.totalTitle}>Total</span>
                  <span className={styles.totalPrice}>{total.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</span>
               </div>
               <button className={styles.buttonModalRemove} onClick={() => delCart()}>Remover todos</button>
               <button className={styles.buttonModal} onClick={() => buyAllInCart()}>Comprar todos</button>
            </div>
         </div>
      </div>
   );
};