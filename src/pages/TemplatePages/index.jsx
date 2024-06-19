import { useContext } from "react";
import { CartModal } from "../../components/CartModal";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./style.module.scss";
import { UserContext } from "../../providers/UserContext";

const TemplatePage = ({children}) => {
    const { cartList, isCartOpen, setIsCartOpen, delItemCart, delCart, setCartList, buyAllInCart } = useContext(UserContext);
    

    return (
        <>
            <Header />
            <main className={styles.mainContainer}>{children}</main>
            <Footer />
            {isCartOpen ? <CartModal setIsCartOpen={setIsCartOpen} cartList={cartList} setCartList={setCartList} delItemCart={delItemCart} delCart={delCart} buyAllInCart={buyAllInCart} /> : null}
        </>
    )
}

export default TemplatePage;