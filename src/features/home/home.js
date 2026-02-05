import styles from './style.module.scss';

export const Home = () => {
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
                <a href="/auth" className={styles.mainBtn}>
                    Начать работу
                </a>
                <a href="/dashboard" className={styles.mainBtn}>
                    Посмотреть демо
                </a>
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