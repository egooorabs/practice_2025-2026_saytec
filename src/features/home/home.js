import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styles from './style.module.scss';

export const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (isAuthenticated) {
      navigate('/desk');
    } else {
      navigate('/auth');
    }
  };

  const handleDemoClick = () => {
    alert('Демо режим скоро будет доступен!');
  };

  return (
    <div className={styles.simpleContainer}>
      <div className={styles.mainLogo}>
        SAYTEC
      </div>
      
      <h1 className={styles.mainTitle}>
        Простой инструмент для управления задачами
      </h1>
      
      <p className={styles.mainDescription}>
        Создавайте доски, добавляйте задачи и управляйте проектами. 
        Просто, быстро, без сложностей.
      </p>
      
      <div className={styles.buttons}>
        <button onClick={handleStartClick} className={styles.mainBtn}>
          {isAuthenticated ? 'Перейти к доскам' : 'Начать работу'}
        </button>
        <button onClick={handleDemoClick} className={styles.mainBtn}>
          Посмотреть демо
        </button>
      </div>
      
      <div className={styles.simpleFeatures}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <ion-icon name="checkmark-circle"></ion-icon>
          </div>
          <div className={styles.featureTitle}>Простота</div>
          <div className={styles.featureText}>
            Интуитивно понятный интерфейс, который легко освоить
          </div>
        </div>
        
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <ion-icon name="flash"></ion-icon>
          </div>
          <div className={styles.featureTitle}>Быстрота</div>
          <div className={styles.featureText}>
            Создание досок и задач за считанные секунды
          </div>
        </div>
        
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <ion-icon name="phone-portrait"></ion-icon>
          </div>
          <div className={styles.featureTitle}>Доступность</div>
          <div className={styles.featureText}>
            Работайте с любого устройства в любое время
          </div>
        </div>
      </div>
      
      <div className={styles.simpleFooter}>
        © 2026 SAYTEC. Простой менеджер задач.
      </div>
    </div>
  );
};