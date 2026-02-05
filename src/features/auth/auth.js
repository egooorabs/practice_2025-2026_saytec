import styles from './style.module.scss';
import { Link } from "react-router";

export const Auth = () => {
    return (
        <div className={styles.wrapper}>
            <span className={styles["icon-close"]}>
                <Link to="/">
                    <ion-icon name="close"></ion-icon>
                </Link>
            </span>

            <div className={`${styles["form-box"]} ${styles.login}`}>
                <h2>Войти</h2>
                <form action="#">
                    <div className={styles["input-box"]}>
                        <span className={styles.icon}>
                            <ion-icon name="mail"></ion-icon>
                        </span>
                        <input type="email" className={styles.email} required />
                        <label>Почта</label>
                    </div>
                    <div className={styles["input-box"]}>
                        <span className={styles.icon}>
                            <ion-icon name="lock-closed"></ion-icon>
                        </span>
                        <input type="password" className={styles.password} required />
                        <label>Пароль</label>
                    </div>
                    <div className={styles["remember-forgot"]}>
                        <label>
                            <input type="checkbox" />
                            Запомнить пароль
                        </label>
                        <a href="#" className={styles.forgotLink}>
                            Забыли пароль?
                        </a>
                    </div>
                    <button type="submit" className={styles.btn}>
                        Войти
                    </button>
                    <div className={styles["login-register"]}>
                        <p>
                            Нет аккаунта?{" "}
                            <Link to="/register" className={styles["register-link"]}>
                                Зарегистрироваться
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};