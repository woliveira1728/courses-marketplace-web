import { useContext, useEffect, useState } from "react";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import styles from "./style.module.scss";
import { UserContext } from "../../providers/UserContext";
import Button from "../../fragments/Button";

export const Header = ({  }) => {
   const {
      isUser, setIsUser, cartList, setIsCartOpen, userLogOut, beSalesperson, isSeller, navigate
   } = useContext(UserContext);

   const meusCursos = () => {
      navigate("/dashboard");
   };

   const goToHome = () => {
      navigate("/");
   };


   return (
      <header className={styles.headerContainer}>
         <h1 className={styles.headerTitle} onClick={goToHome} >Courses Marketplace</h1>

         <div className={styles.rightHeader}>

            {isUser ? <span className={styles.welcomeHeader}>Bem vindo {isUser.name}</span> :
            <span className={styles.welcomeHeader}>Bem vindo!</span>}

            {
               isSeller ?
               <>
                  <div><Button name="Registrar curso" status="active" linkRoute="/course/register" /></div>
                  <div><Button name="Dashboard" status="active" linkRoute="/dashboard" /></div>
                  <div><Button name="Sair" status="active" onClickDefault={userLogOut} /></div>
               </> :
               isUser ?
               <>
                  <div><Button name="Seja Vendedor" status="active" onClickDefault={beSalesperson} /></div>
                  <div><Button name="Dashboard" status="active" linkRoute="/dashboard" /></div>
                  <div><Button name="Sair" status="active" onClickDefault={userLogOut} /></div>
               </> :
               
               <div><Button name="Login" status="active" linkRoute="/login" /></div>
            }
            <button className={styles.cartButton} onClick={() => setIsCartOpen(true)}>
               <MdShoppingCart size={21} />
               <span>{cartList.length}</span>
            </button>
         </div>
      </header>
   );
};