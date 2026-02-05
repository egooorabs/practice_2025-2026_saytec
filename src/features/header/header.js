import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../auth/authSlice';
import styles from './style.module.scss';

export const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>SAYTEC</h2>
      <nav className={styles.navigation}>
        <a href="/">Главная</a>
        <a href="/about">О нас</a>
        <a href="/desk">Мои доски</a>
        <a href="/contacts">Контакты</a>
        
        {isAuthenticated ? (
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              <ion-icon name="person-circle" className={styles.userIcon}></ion-icon>
              <span className={styles.userName}>
                {user?.name || 'Пользователь'}
              </span>
            </div>
            <button className={styles.btnLogin} onClick={handleLogout}>
              Выйти
            </button>
          </div>
        ) : (
          <button className={styles.btnLogin} onClick={() => window.location.href='/auth'}>
            Войти
          </button>
        )}
      </nav>
    </header>
  );
};