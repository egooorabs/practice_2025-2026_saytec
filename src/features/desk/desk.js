import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getBoards, createBoard, editBoard, deleteBoard, setCurrentBoard } from '../boards/boardsSlice';
import styles from './style.module.scss';

export const Desk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boards, loading } = useSelector((state) => state.boards);
  
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  
  const [editingBoard, setEditingBoard] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    
    if (!boardName.trim()) {
      alert('Введите название доски');
      return;
    }
    
    const boardData = {
      name: boardName,
      description: boardDescription || '',
    };
    
    const result = await dispatch(createBoard(boardData));
    
    if (createBoard.fulfilled.match(result)) {
      setShowBoardModal(false);
      setBoardName('');
      setBoardDescription('');
    } else {
      alert('Ошибка при создании доски: ' + (result.payload || 'Неизвестная ошибка'));
    }
  };

  const handleEditBoard = (board, e) => {
    e.stopPropagation();
    setEditingBoard(board);
    setEditName(board.name);
    setEditDescription(board.description || '');
    setShowBoardModal(true);
  };

  const handleUpdateBoard = async (e) => {
    e.preventDefault();
    
    if (!editName.trim()) {
      alert('Введите название доски');
      return;
    }
    
    const boardData = {
      id: editingBoard.id,
      name: editName,
      description: editDescription || '',
      boardId: editingBoard.id
    };
    
    const result = await dispatch(editBoard(boardData));
    
    if (editBoard.fulfilled.match(result)) {
      setEditingBoard(null);
      setShowBoardModal(false);
      setBoardName('');
      setBoardDescription('');
    } else {
      alert('Ошибка при обновлении доски: ' + (result.payload || 'Неизвестная ошибка'));
    }
  };

  const handleDeleteBoard = async (boardId, e) => {
    e.stopPropagation();
    
    if (window.confirm('Удалить доску? Все списки и задачи будут также удалены.')) {
      const result = await dispatch(deleteBoard(boardId));
      
      if (deleteBoard.fulfilled.match(result)) {
      } else {
        alert('Ошибка при удалении доски: ' + (result.payload || 'Неизвестная ошибка'));
      }
    }
  };

  const handleBoardClick = (board) => {
    dispatch(setCurrentBoard(board));
    navigate(`/board/${board.id}`);
  };

  const closeModal = () => {
    setShowBoardModal(false);
    setEditingBoard(null);
    setBoardName('');
    setBoardDescription('');
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка досок...</div>;
  }

  return (
    <>
      <div className={`${styles.modalOverlay} ${showBoardModal ? styles.show : ''}`}>
        <div className={styles.modalContent}>
          <span className={styles.iconClose} onClick={closeModal}>
            <ion-icon name="close"></ion-icon>
          </span>
          
          <div className={styles.formBox}>
            <h2>{editingBoard ? 'Редактировать доску' : 'Новая доска'}</h2>
            <form onSubmit={editingBoard ? handleUpdateBoard : handleCreateBoard}>
              <div className={styles.inputBox}>
                <span className={styles.icon}>
                  <ion-icon name="document-text"></ion-icon>
                </span>
                <input 
                  type="text" 
                  required 
                  value={editingBoard ? editName : boardName}
                  onChange={(e) => editingBoard ? setEditName(e.target.value) : setBoardName(e.target.value)}
                />
                <label>Название доски</label>
              </div>
              <div className={styles.inputBox}>
                <span className={styles.icon}>
                  <ion-icon name="pencil"></ion-icon>
                </span>
                <input 
                  type="text" 
                  value={editingBoard ? editDescription : boardDescription}
                  onChange={(e) => editingBoard ? setEditDescription(e.target.value) : setBoardDescription(e.target.value)}
                />
                <label>Описание (необязательно)</label>
              </div>
              <div className={styles.modalActions}>
                <button 
                  type="button" 
                  className={`${styles.btn} ${styles.btnSecondary}`} 
                  onClick={closeModal}
                >
                  Отмена
                </button>
                <button type="submit" className={styles.btn}>
                  {editingBoard ? 'Сохранить' : 'Создать доску'}
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
          
          {boards.length === 0 ? (
            <div className={styles.emptyState}>
              <p>У вас пока нет досок. Создайте первую доску!</p>
            </div>
          ) : (
            <div className={styles.boardsGrid}>
              {boards.map(board => (
                <div 
                  key={board.id} 
                  className={styles.boardCard} 
                  onClick={() => handleBoardClick(board)}
                >
                  <div className={styles.boardCardHeader}>
                    <h3>{board.name}</h3>
                    <div className={styles.boardActions}>
                      <button 
                        className={styles.iconBtn}
                        onClick={(e) => handleEditBoard(board, e)}
                      >
                        <ion-icon name="create"></ion-icon>
                      </button>
                      <button 
                        className={styles.iconBtn}
                        onClick={(e) => handleDeleteBoard(board.id, e)}
                      >
                        <ion-icon name="trash"></ion-icon>
                      </button>
                    </div>
                  </div>
                  <div className={styles.boardCardContent}>
                    <p>{board.description || 'Нет описания'}</p>
                  </div>
                  <div className={styles.boardCardFooter}>
                    <small>
                      {board.createdAt ? new Date(board.createdAt).toLocaleDateString('ru-RU') : 'Дата не указана'}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};