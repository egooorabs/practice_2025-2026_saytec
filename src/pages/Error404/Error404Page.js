export const Error404Page = () => {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="error-container">
            <div className="error-icon">
                <ion-icon name="warning"></ion-icon>
            </div>
            
            <div className="error-code">
                <span>4</span>
                <span>0</span>
                <span>4</span>
            </div>
            
            <h1 className="error-title">Страница не найдена</h1>
            
            <p className="error-message">
                К сожалению, запрашиваемая вами страница не существует или была перемещена. 
                Возможно, вы ошиблись в адресе или страница находится в разработке.
            </p>

            <div className="error-actions">
                <a href="/" className="btn-home">
                    <ion-icon name="home"></ion-icon>
                    Вернуться на главную
                </a>
                
                <button className="btn-back" onClick={handleBack}>
                    <ion-icon name="arrow-back"></ion-icon>
                    Назад
                </button>
            </div>
            
            <div className="error-details">
                <h3>Что можно сделать?</h3>
                <p>Возможно, эта информация поможет вам:</p>
                <ul>
                    <li>Проверьте правильность введенного адреса</li>
                    <li>Воспользуйтесь поиском выше</li>
                    <li>Перейдите на <a href="/" style={{color: '#fff', textDecoration: 'underline'}}>главную страницу</a></li>
                    <li>Если вы уверены, что страница должна существовать, свяжитесь с поддержкой</li>
                </ul>
                
                <p style={{marginTop: '20px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px'}}>
                    Ошибка 404: Страница не найдена • SAYTEC Board System
                </p>
            </div>
        </div>
    );
};