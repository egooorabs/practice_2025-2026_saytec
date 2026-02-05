import { useState } from 'react';
import styles from './style.module.scss';

export const Board = () => {
    const [showListModal, setShowListModal] = useState(false);
    const [listName, setListName] = useState('');
    const [lists, setLists] = useState([
        {
            id: 1,
            title: 'Надо выполнить',
            cards: [
                { id: 1, content: 'Создать дизайн главной страницы', completed: false },
                { id: 2, content: 'Написать техническое задание', completed: false },
                { id: 3, content: 'Подготовить презентацию для клиента', completed: false },
            ]
        },
        {
            id: 2,
            title: 'В процессе',
            cards: [
                { id: 4, content: 'Разработка API', completed: false },
                { id: 5, content: 'Тестирование функционала', completed: false },
            ]
        },
        {
            id: 3,
            title: 'Выполнено',
            cards: [
                { id: 6, content: 'Исследование рынка', completed: true },
                { id: 7, content: 'Создание прототипа', completed: true },
            ]
        }
    ]);

    const addCard = (listId) => {
        setLists(lists.map(list => {
            if (list.id === listId) {
                return {
                    ...list,
                    cards: [...list.cards, { 
                        id: Date.now(), 
                        content: 'Новая задача', 
                        completed: false 
                    }]
                };
            }
            return list;
        }));
    };

    const toggleCard = (listId, cardId) => {
        setLists(lists.map(list => {
            if (list.id === listId) {
                return {
                    ...list,
                    cards: list.cards.map(card => 
                        card.id === cardId 
                            ? { ...card, completed: !card.completed }
                            : card
                    )
                };
            }
            return list;
        }));
    };

    const createNewList = () => {
        if (!listName.trim()) return;
        
        const newList = {
            id: Date.now(),
            title: listName,
            cards: []
        };
        
        setLists([...lists, newList]);
        setListName('');
        setShowListModal(false);
    };

    const removeList = (listId) => {
        setLists(lists.filter(list => list.id !== listId));
    };

    const updateCardContent = (listId, cardId, content) => {
        setLists(lists.map(list => {
            if (list.id === listId) {
                return {
                    ...list,
                    cards: list.cards.map(card => 
                        card.id === cardId 
                            ? { ...card, content }
                            : card
                    )
                };
            }
            return list;
        }));
    };

    return (
        <>
            <div className={`${styles.modalOverlay} ${showListModal ? styles.show : ''}`} id="listModal">
                <div className={styles.modalContent}>
                    <span className={styles.iconClose} onClick={() => setShowListModal(false)}>
                        <ion-icon name="close"></ion-icon>
                    </span>
                    
                    <div className={styles.formBox}>
                        <h2>Новый список</h2>
                        <form onSubmit={(e) => { e.preventDefault(); createNewList(); }}>
                            <div className={styles.inputBox}>
                                <span className={styles.icon}>
                                    <ion-icon name="list"></ion-icon>
                                </span>
                                <input 
                                    type="text" 
                                    required 
                                    value={listName}
                                    onChange={(e) => setListName(e.target.value)}
                                />
                                <label>Название списка</label>
                            </div>
                            <div className={styles.modalActions}>
                                <button 
                                    type="button" 
                                    className={`${styles.btn} ${styles.btnSecondary}`} 
                                    onClick={() => setShowListModal(false)}
                                >
                                    Отмена
                                </button>
                                <button type="submit" className={styles.btn}>
                                    Создать список
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div className={styles.boardPage}>
                <div className={styles.boardHeader}>
                    <h1 className={styles.boardTitle}>Проект №1</h1>
                    <button className={styles.addListBtn} onClick={() => setShowListModal(true)}>
                        <ion-icon name="add"></ion-icon>
                        Добавить список
                    </button>
                </div>

                <div className={styles.listsContainer}>
                    {lists.map(list => (
                        <div key={list.id} className={styles.list}>
                            <div className={styles.listHeader}>
                                <h3 className={styles.listTitle}>{list.title}</h3>
                                <button className={styles.closeListBtn} onClick={() => removeList(list.id)}>
                                    <ion-icon name="close"></ion-icon>
                                </button>
                            </div>
                            
                            {list.cards.map(card => (
                                <div key={card.id} className={`${styles.card} ${card.completed ? styles.completed : ''}`}>
                                    <input 
                                        type="checkbox" 
                                        className={styles.cardCheckbox} 
                                        checked={card.completed}
                                        onChange={() => toggleCard(list.id, card.id)}
                                    />
                                    <div 
                                        className={styles.cardContent}
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => updateCardContent(list.id, card.id, e.target.textContent)}
                                    >
                                        {card.content}
                                    </div>
                                </div>
                            ))}
                            
                            <div className={styles.addCard} onClick={() => addCard(list.id)}>
                                + Добавить карточку
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};