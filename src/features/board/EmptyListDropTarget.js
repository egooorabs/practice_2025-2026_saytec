import { useDrop } from 'react-dnd';
import { useRef } from 'react';
import styles from './style.module.scss';

const ItemTypes = {
  TASK: 'task',
};

export const EmptyListDropTarget = ({ listId, onDrop, children }) => {
  const ref = useRef(null);
  
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => {
      onDrop(item, listId);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  
  drop(ref);
  
  return (
    <div 
      ref={ref} 
      className={`${styles.emptyListDropTarget} ${isOver ? styles.dropOver : ''}`}
    >
      {children}
    </div>
  );
};