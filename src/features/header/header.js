import styles from './style.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <h2 className={styles.logo}>SAYTEC</h2>
            <nav className={styles.navigation}>
                <a href="/">Главная</a>
                <a href="/about">О нас</a>
                <a href="/desk">Мои доски</a>
                <a href="/contacts">Контакты</a>
                <button className={styles.btnLogin} onClick={() => window.location.href='/auth'}>
                    Войти
                </button>
            </nav>
        </header>
    );
};