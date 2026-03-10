import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tasksAPI } from '../../app/services/api';

const initialState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
};

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async ({ boardId, listId }, { rejectWithValue }) => {
    try {
      const response = await tasksAPI.getTasks(boardId, listId);
      let tasks = response.data;
      if (!Array.isArray(tasks)) {
        tasks = [];
      }
      const normalizedTasks = tasks.map(task => ({
        id: task.id || task.taskId,
        content: task.name || task.content || '',
        listId: task.listId,
        completed: task.isActive === false ? true : task.completed || false,
        boardId: task.boardId,
        order: task.order || 0,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
      }));
      return { listId, tasks: normalizedTasks };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки задач');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await tasksAPI.createTask(taskData.name, taskData.listId);
      const newTask = {
        id: response.data.id || response.data.taskId,
        content: response.data.name || response.data.content || taskData.name,
        listId: response.data.listId || taskData.listId,
        completed: response.data.isActive === false ? true : response.data.completed || false,
        boardId: response.data.boardId,
        order: response.data.order || 0,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt
      };
      return newTask;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка создания задачи');
    }
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await tasksAPI.editTask(
        taskData.name,
        taskData.isActive,
        taskData.id,
        taskData.listId,
        taskData.boardId
      );
      
      const updatedTask = {
        id: response.data.id || response.data.taskId || taskData.id,
        content: response.data.name || response.data.content || taskData.name,
        listId: response.data.listId || taskData.listId,
        completed: response.data.isActive === false ? true : false,
        boardId: response.data.boardId || taskData.boardId,
        order: response.data.order || taskData.order || 0,
        createdAt: response.data.createdAt || taskData.createdAt,
        updatedAt: response.data.updatedAt || new Date().toISOString()
      };
      
      return updatedTask;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка изменения задачи');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskData, { rejectWithValue }) => {
    try {
      await tasksAPI.deleteTask(taskData.id, taskData.listId, taskData.boardId);
      return taskData.id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка удаления задачи');
    }
  }
);

export const reorderTask = createAsyncThunk(
  'tasks/reorderTask',
  async ({ taskId, order, listId, boardId }, { rejectWithValue }) => {
    try {
      const response = await tasksAPI.reorderTask(taskId, order, listId, boardId);
      return { taskId, order, listId, boardId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка изменения порядка задачи');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateTaskLocally: (state, action) => {
      const { id, completed, content } = action.payload;
      const index = state.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
    reorderTasksLocally: (state, action) => {
      const { listId, startIndex, endIndex } = action.payload;
      const listTasks = state.tasks.filter(t => t.listId === listId);
      const otherTasks = state.tasks.filter(t => t.listId !== listId);
      const result = Array.from(listTasks);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      result.forEach((task, index) => {
        task.order = index;
      });
      state.tasks = [...otherTasks, ...result];
    },
    moveTaskBetweenLists: (state, action) => {
      const { taskId, sourceListId, destListId, destIndex } = action.payload;
      const taskIndex = state.tasks.findIndex(t => t.id === taskId);
      if (taskIndex === -1) return;
      const task = { ...state.tasks[taskIndex], listId: destListId };
      const sourceTasks = state.tasks.filter(t => t.listId === sourceListId && t.id !== taskId);
      const destTasks = state.tasks.filter(t => t.listId === destListId);
      const otherTasks = state.tasks.filter(t => t.listId !== sourceListId && t.listId !== destListId);
      sourceTasks.forEach((t, index) => { t.order = index; });
      const newDestTasks = [...destTasks];
      newDestTasks.splice(destIndex, 0, task);
      newDestTasks.forEach((t, index) => { t.order = index; });
      state.tasks = [...otherTasks, ...sourceTasks, ...newDestTasks];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        const otherTasks = state.tasks.filter(t => t.listId !== action.payload.listId);
        state.tasks = [...otherTasks, ...action.payload.tasks];
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editTask.pending, (state, action) => {
        const { id, isActive, name } = action.meta.arg;
        const completed = !isActive;
        const index = state.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], completed, content: name };
        }
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(editTask.rejected, (state, action) => {})
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t.id !== action.payload);
      });
  },
});

export const { setCurrentTask, clearError, updateTaskLocally, reorderTasksLocally, moveTaskBetweenLists } = tasksSlice.actions;
export default tasksSlice.reducer;