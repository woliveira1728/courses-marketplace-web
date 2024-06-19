import styles from "./style.module.scss";
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {

    return (
        <footer className={styles.footerContainer}>
            <div className={styles.contactsContainer}>
                <ul>
                    <li>
                        <a href="https://wa.me/5592994763359" target="_blank">
                            <FaWhatsapp />
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/woliveira1728" target="_blank">
                            <FaGithub />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/woliveira1728/" target="_blank">
                            <FaLinkedin />
                        </a>
                    </li>
                </ul>
                <span>woliveira1728@gmail.com</span>
            </div>
            <p>Developed by Wilson Oliveira</p>
        </footer>
    )
};