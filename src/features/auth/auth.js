import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from './authSlice';
import styles from './style.module.scss';
import { Link } from "react-router";
import { ROUTES } from '../../shared/constants/routes';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const result = await dispatch(login({ email, password }));
      
      if (login.fulfilled.match(result)) {
        navigate('/desk');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles["icon-close"]}>
        <Link to={ROUTES.HOME}>
          <ion-icon name="close"></ion-icon>
        </Link>
      </span>

      <div className={`${styles["form-box"]} ${styles.login}`}>
        <h2>Войти</h2>
        {error && (
          <div className={styles.error} style={{ color: 'red', marginBottom: '15px' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles["input-box"]}>
            <span className={styles.icon}>
              <ion-icon name="mail"></ion-icon>
            </span>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <label>Почта</label>
          </div>
          <div className={styles["input-box"]}>
            <span className={styles.icon}>
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <label>Пароль</label>
          </div>
          <div className={styles["remember-forgot"]}>
            <label>
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Запомнить пароль
            </label>
            <a href="#" className={styles.forgotLink}>
              Забыли пароль?
            </a>
          </div>
          <button 
            type="submit" 
            className={styles.btn}
            disabled={loading}
          >
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
          <div className={styles["login-register"]}>
            <p>
              Нет аккаунта?{" "}
              <Link to={ROUTES.REGISTER} className={styles["register-link"]}>
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};