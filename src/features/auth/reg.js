import styles from './styles.module.scss';
import { Link } from "react-router";

export const Reg = () => {
    return (
        <div className={styles.wrapper}>
            <span className={styles["icon-close"]}>
                <Link to="/">
                    <ion-icon name="close"></ion-icon>
                </Link>
            </span>

            <div className={`${styles["form-box"]} ${styles.register}`}>
                <h2>Регистрация</h2>
                <form action="#">
                    <div className={styles["input-box"]}>
                        <span className={styles.icon}>
                            <ion-icon name="person"></ion-icon>
                        </span>
                        <input type="text" className={styles.email} required />
                        <label>Имя пользователя</label>
                    </div>
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
                    <div className={styles["input-box"]}>
                        <span className={styles.icon}>
                            <ion-icon name="lock-closed"></ion-icon>
                        </span>
                        <input type="password" className={styles.password} required />
                        <label>Повторите пароль</label>
                    </div>
                    <div className={styles["remember-forgot"]}>
                        <label>
                            <input type="checkbox" />
                            Согласен с правилами использования сервиса
                        </label>
                    </div>
                    <button type="submit" className={styles.btn}>
                        Зарегистрироваться
                    </button>
                    <div className={styles["login-register"]}>
                        <p>
                            Уже есть аккаунт?{" "}
                            <Link to="/auth" className={styles["register-link"]}>
                                Войти
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};