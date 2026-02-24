import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';
import boardsReducer from '../../features/boards/boardsSlice';
import listsReducer from '../../features/lists/listsSlice';
import tasksReducer from '../../features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
    lists: listsReducer,
    tasks: tasksReducer,
  },
});

export default store;