import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { register } from './authSlice';
import styles from './styles.module.scss';
import { Link } from "react-router";
import { ROUTES } from '../../shared/constants/routes';

export const Reg = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !email || !password) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    if (!agreeToTerms) {
      alert('Пожалуйста, согласитесь с правилами использования');
      return;
    }

    try {
      const userData = {
        name: username,
        email,
        password,
      };
      
      const result = await dispatch(register(userData));
      
      if (register.fulfilled.match(result)) {
        navigate('/desk');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles["icon-close"]}>
        <Link to={ROUTES.HOME}>
          <ion-icon name="close"></ion-icon>
        </Link>
      </span>

      <div className={`${styles["form-box"]} ${styles.register}`}>
        <h2>Регистрация</h2>
        {error && (
          <div className={styles.error} style={{ color: 'red', marginBottom: '15px' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles["input-box"]}>
            <span className={styles.icon}>
              <ion-icon name="person"></ion-icon>
            </span>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            <label>Имя пользователя</label>
          </div>
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
          <div className={styles["input-box"]}>
            <span className={styles.icon}>
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
            <label>Повторите пароль</label>
          </div>
          <div className={styles["remember-forgot"]}>
            <label>
              <input 
                type="checkbox" 
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              Согласен с правилами использования сервиса
            </label>
          </div>
          <button 
            type="submit" 
            className={styles.btn}
            disabled={loading}
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
          <div className={styles["login-register"]}>
            <p>
              Уже есть аккаунт?{" "}
              <Link to={ROUTES.AUTH} className={styles["register-link"]}>
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};