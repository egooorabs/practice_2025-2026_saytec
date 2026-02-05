import { Header } from '../header';
import styles from './style.module.scss';

export const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
            
            
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        </>
    );
};