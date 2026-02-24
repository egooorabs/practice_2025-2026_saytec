import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getLists, createList, editList, deleteList } from '../lists/listsSlice';
import { getTasks, createTask, editTask, deleteTask, updateTaskLocally } from '../tasks/tasksSlice';
import { getBoards, setCurrentBoard } from '../boards/boardsSlice';
import styles from './style.module.scss';

export const Board = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  
  const { lists, loading: listsLoading } = useSelector((state) => state.lists);
  const { tasks } = useSelector((state) => state.tasks);
  const { currentBoard } = useSelector((state) => state.boards);
  
  const [showListModal, setShowListModal] = useState(false);
  const [listName, setListName] = useState('');
  
  const [editingList, setEditingList] = useState(null);
  const [editListName, setEditListName] = useState('');
  
  const [editingTask, setEditingTask] = useState(null);
  const [taskContent, setTaskContent] = useState('');
  
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentListId, setCurrentListId] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');

  useEffect(() => {
    if (boardId) {
      dispatch(getBoards()).then((action) => {
        if (getBoards.fulfilled.match(action)) {
          const boards = action.payload;
          const currentBoard = boards.find(b => b.id === boardId);
          if (currentBoard) {
            dispatch(setCurrentBoard(currentBoard));
          }
        }
      });
      
      dispatch(getLists(boardId));
    }
  }, [dispatch, boardId]);

  useEffect(() => {
    if (lists && lists.length > 0) {
      lists.forEach(list => {
        if (list?.id) {
          dispatch(getTasks({ boardId, listId: list.id }));
        }
      });
    }
  }, [dispatch, lists, boardId]);

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!listName.trim()) {
      alert('Введите название списка');
      return;
    }
    
    const listData = {
      name: listName,
      boardId: boardId,
    };
    
    const result = await dispatch(createList(listData));
    
    if (createList.fulfilled.match(result)) {
      dispatch(getLists(boardId));
      setListName('');
      setShowListModal(false);
    } else {
      alert('Ошибка при создании списка: ' + (result.payload || 'Неизвестная ошибка'));
    }
  };

  const handleEditList = (list) => {
    setEditingList(list.id);
    setEditListName(list.name);
  };

  const handleUpdateList = async (list) => {
    if (!editListName.trim()) {
      setEditingList(null);
      return;
    }
    
    const listData = {
      id: list.id,
      name: editListName,
      boardId: boardId,
    };
    
    const result = await dispatch(editList(listData));
    
    if (editList.fulfilled.match(result)) {
      dispatch(getLists(boardId));
    } else {
      alert('Ошибка при обновлении списка: ' + (result.payload || 'Неизвестная ошибка'));
    }
    setEditingList(null);
  };

  const handleDeleteList = async (listId) => {
    if (!listId) return;
    
    if (window.confirm('Удалить список со всеми задачами?')) {
      const result = await dispatch(deleteList({ 
        id: listId,
        boardId: boardId
      }));
      
      if (deleteList.fulfilled.match(result)) {
        dispatch(getLists(boardId));
      } else {
        alert('Ошибка при удалении списка: ' + (result.payload || 'Неизвестная ошибка'));
      }
    }
  };

  const handleOpenCreateTask = (listId) => {
    setCurrentListId(listId);
    setNewTaskName('');
    setShowTaskModal(true);
  };

  const handleCreateTaskWithName = async () => {
    if (!newTaskName.trim()) {
      alert('Введите название задачи');
      return;
    }
    
    const taskData = {
      content: newTaskName,
      listId: currentListId,
      completed: false,
    };
    
    const result = await dispatch(createTask(taskData));
    
    if (createTask.fulfilled.match(result)) {
      await dispatch(getTasks({ boardId, listId: currentListId }));
      setShowTaskModal(false);
      setNewTaskName('');
      setCurrentListId(null);
    } else {
      alert('Ошибка при создании задачи: ' + (result.payload || 'Неизвестная ошибка'));
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setTaskContent(task.content);
  };

  const handleUpdateTask = async (task) => {
    if (!taskContent.trim()) {
      setEditingTask(null);
      return;
    }
    
    const taskData = {
      id: task.id,
      content: taskContent,
      listId: task.listId,
      boardId: boardId,
      completed: task.completed,
    };
    
    
    const updatedTask = { ...task, content: taskContent };
    dispatch(updateTaskLocally(updatedTask));
    
    const result = await dispatch(editTask(taskData));
    
    if (editTask.fulfilled.match(result)) {
      await dispatch(getTasks({ boardId, listId: task.listId }));
    } else {
      dispatch(updateTaskLocally(task));
      alert('Ошибка при обновлении задачи: ' + (result.payload || 'Неизвестная ошибка'));
    }
    setEditingTask(null);
  };

  const handleToggleTask = async (task) => {
    const newCompleted = !task.completed;
    
    const updatedTask = { ...task, completed: newCompleted };
    dispatch(updateTaskLocally(updatedTask));
    
    const taskData = {
      id: task.id,
      content: task.content,
      listId: task.listId,
      boardId: boardId,
      completed: newCompleted,
    };
    
    const result = await dispatch(editTask(taskData));
    
    if (!editTask.fulfilled.match(result)) {
      dispatch(updateTaskLocally(task));
      alert('Ошибка при изменении статуса задачи');
    }
  };

  const handleDeleteTask = async (taskId, listId) => {
    if (!taskId) return;
    
    if (window.confirm('Удалить задачу?')) {
      const result = await dispatch(deleteTask({ 
        id: taskId,
        listId: listId,
        boardId: boardId 
      }));
      
      if (deleteTask.fulfilled.match(result)) {
        await dispatch(getTasks({ boardId, listId }));
      } else {
        alert('Ошибка при удалении задачи: ' + (result.payload || 'Неизвестная ошибка'));
      }
    }
  };

  const getTasksForList = (listId) => {
    return tasks.filter(task => task.listId === listId);
  };

  const closeListModal = () => {
    setShowListModal(false);
    setListName('');
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setNewTaskName('');
    setCurrentListId(null);
  };

  if (listsLoading && lists.length === 0) {
    return <div className={styles.loading}>Загрузка списков...</div>;
  }

  return (
    <>
      <div className={`${styles.modalOverlay} ${showListModal ? styles.show : ''}`}>
        <div className={styles.modalContent}>
          <span className={styles.iconClose} onClick={closeListModal}>
            <ion-icon name="close"></ion-icon>
          </span>
          
          <div className={styles.formBox}>
            <h2>Новый список</h2>
            <form onSubmit={handleCreateList}>
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
                  onClick={closeListModal}
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

      <div className={`${styles.modalOverlay} ${showTaskModal ? styles.show : ''}`}>
        <div className={styles.modalContent}>
          <span className={styles.iconClose} onClick={closeTaskModal}>
            <ion-icon name="close"></ion-icon>
          </span>
          
          <div className={styles.formBox}>
            <h2>Новая задача</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateTaskWithName(); }}>
              <div className={styles.inputBox}>
                <span className={styles.icon}>
                  <ion-icon name="document-text"></ion-icon>
                </span>
                <input 
                  type="text" 
                  required 
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  autoFocus
                />
                <label>Название задачи</label>
              </div>
              <div className={styles.modalActions}>
                <button 
                  type="button" 
                  className={`${styles.btn} ${styles.btnSecondary}`} 
                  onClick={closeTaskModal}
                >
                  Отмена
                </button>
                <button type="submit" className={styles.btn}>
                  Создать задачу
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className={styles.boardPage}>
        <div className={styles.boardHeader}>
          <h1 className={styles.boardTitle}>{currentBoard?.name || 'Доска'}</h1>
          <button className={styles.addListBtn} onClick={() => setShowListModal(true)}>
            <ion-icon name="add"></ion-icon>
            Добавить список
          </button>
        </div>

        {lists.length === 0 ? (
          <div className={styles.emptyState}>
            <p>В этой доске пока нет списков. Создайте первый список!</p>
          </div>
        ) : (
          <div className={styles.listsContainer}>
            {lists.map(list => (
              <div key={list.id} className={styles.list}>
                <div className={styles.listHeader}>
                  {editingList === list.id ? (
                    <input
                      type="text"
                      value={editListName}
                      onChange={(e) => setEditListName(e.target.value)}
                      onBlur={() => handleUpdateList(list)}
                      onKeyPress={(e) => e.key === 'Enter' && handleUpdateList(list)}
                      className={styles.listEditInput}
                      autoFocus
                    />
                  ) : (
                    <h3 
                      className={styles.listTitle}
                      onClick={() => handleEditList(list)}
                    >
                      {list.name}
                    </h3>
                  )}
                  <button 
                    className={styles.closeListBtn}
                    onClick={() => handleDeleteList(list.id)}
                  >
                    <ion-icon name="close"></ion-icon>
                  </button>
                </div>
                
                {getTasksForList(list.id).length > 0 ? (
                  getTasksForList(list.id).map(task => (
                    <div key={task.id} className={`${styles.card} ${task.completed ? styles.completed : ''}`}>
                      <input 
                        type="checkbox" 
                        className={styles.cardCheckbox} 
                        checked={task.completed}
                        onChange={() => handleToggleTask(task)}
                      />
                      
                      {editingTask === task.id ? (
                        <input
                          type="text"
                          value={taskContent}
                          onChange={(e) => setTaskContent(e.target.value)}
                          onBlur={() => handleUpdateTask(task)}
                          onKeyPress={(e) => e.key === 'Enter' && handleUpdateTask(task)}
                          className={styles.taskInput}
                          autoFocus
                        />
                      ) : (
                        <div 
                          className={styles.cardContent}
                          onClick={() => handleEditTask(task)}
                        >
                          {task.content}
                        </div>
                      )}
                      
                      <button 
                        className={styles.deleteTaskBtn}
                        onClick={() => handleDeleteTask(task.id, task.listId)}
                      >
                        <ion-icon name="close"></ion-icon>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className={styles.noTasks}>Нет задач</div>
                )}
                
                <div className={styles.addCard} onClick={() => handleOpenCreateTask(list.id)}>
                  + Добавить карточку
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};