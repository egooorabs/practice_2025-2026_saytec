import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import styles from './style.module.scss';

const ItemTypes = {
  TASK: 'task',
};

export const DraggableTask = ({ 
  task, 
  index, 
  listId, 
  moveTask, 
  moveTaskToList,
  children 
}) => {
  const ref = useRef(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { 
      id: task.id, 
      index, 
      listId,
      content: task.content,
      completed: task.completed
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      if (item.listId !== listId) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveTask(dragIndex, hoverIndex, listId);
      item.index = hoverIndex;
    },
    drop: (item, monitor) => {
      if (item.listId !== listId) {
        const destIndex = 0;
        moveTaskToList(item.id, item.listId, listId, destIndex);
      }
    },
  });
  
  drag(drop(ref));
  
  return (
    <div 
      ref={ref} 
      className={`${styles.card} ${task.completed ? styles.completed : ''} ${isDragging ? styles.dragging : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {children}
    </div>
  );
};