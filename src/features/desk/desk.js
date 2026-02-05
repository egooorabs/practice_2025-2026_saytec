import { useState } from 'react';
import styles from './style.module.scss';

export const Desk = () => {
    const [showBoardModal, setShowBoardModal] = useState(false);
    const [boardName, setBoardName] = useState('');
    const [boardDescription, setBoardDescription] = useState('');

    const handleCreateBoard = (e) => {
        e.preventDefault();
        console.log('Creating board:', boardName, boardDescription);
        setShowBoardModal(false);
        setBoardName('');
        setBoardDescription('');
    };

    const boards = [
        { id: 1, title: 'Проект №1', description: 'Доска для управления проектом', lists: 3, tasks: 5, updated: '20.01.2026' },
        { id: 2, title: 'Личные задачи', description: 'Ежедневные задачи и напоминания', lists: 2, tasks: 8, updated: '20.01.2026' },
        { id: 3, title: 'Рабочие заметки', description: 'Идеи и заметки по работе', lists: 1, tasks: 3, updated: '20.01.2026' },
    ];

    return (
        <>
            <div className={`${styles.modalOverlay} ${showBoardModal ? styles.show : ''}`} id="boardModal">
                <div className={styles.modalContent}>
                    <span className={styles.iconClose} onClick={() => setShowBoardModal(false)}>
                        <ion-icon name="close"></ion-icon>
                    </span>
                    
                    <div className={styles.formBox}>
                        <h2>Новая доска</h2>
                        <form onSubmit={handleCreateBoard}>
                            <div className={styles.inputBox}>
                                <span className={styles.icon}>
                                    <ion-icon name="document-text"></ion-icon>
                                </span>
                                <input 
                                    type="text" 
                                    required 
                                    value={boardName}
                                    onChange={(e) => setBoardName(e.target.value)}
                                />
                                <label>Название доски</label>
                            </div>
                            <div className={styles.inputBox}>
                                <span className={styles.icon}>
                                    <ion-icon name="pencil"></ion-icon>
                                </span>
                                <input 
                                    type="text" 
                                    value={boardDescription}
                                    onChange={(e) => setBoardDescription(e.target.value)}
                                />
                                <label>Описание (необязательно)</label>
                            </div>
                            <div className={styles.modalActions}>
                                <button 
                                    type="button" 
                                    className={`${styles.btn} ${styles.btnSecondary}`} 
                                    onClick={() => setShowBoardModal(false)}
                                >
                                    Отмена
                                </button>
                                <button type="submit" className={styles.btn}>
                                    Создать доску
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    <h1 className={styles.pageTitle}>Мои доски</h1>
                    
                    <div className={styles.newBoardSection}>
                        <button className={styles.newBoardBtn} onClick={() => setShowBoardModal(true)}>
                            <ion-icon name="add-circle"></ion-icon>
                            Новая доска
                        </button>
                    </div>
                    
                    <div className={styles.boardsGrid}>
                        {boards.map(board => (
                            <div key={board.id} className={styles.boardCard} onClick={() => window.location.href='/board'}>
                                <div className={styles.boardCardHeader}>
                                    <h3>{board.title}</h3>
                                    <div className={styles.boardActions}>
                                        <button className={styles.iconBtn}>
                                            <ion-icon name="ellipsis-vertical"></ion-icon>
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.boardCardContent}>
                                    <p>{board.description}</p>
                                    <div className={styles.boardStats}>
                                        <span><ion-icon name="list"></ion-icon> {board.lists} списка</span>
                                        <span><ion-icon name="checkmark-circle"></ion-icon> {board.tasks} задач</span>
                                    </div>
                                </div>
                                <div className={styles.boardCardFooter}>
                                    <small>Обновлено: {board.updated}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};