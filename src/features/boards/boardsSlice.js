import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { boardsAPI } from '../../app/services/api';

const initialState = {
  boards: [],
  currentBoard: null,
  loading: false,
  error: null,
};

export const getBoards = createAsyncThunk(
  'boards/getBoards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await boardsAPI.getBoards();
      
      const boards = Array.isArray(response.data) ? response.data.map(board => ({
        id: board.id,
        name: board.name || 'Без названия',
        description: board.description || '',
        createdAt: board.createdAt,
        order: board.order || 0
      })) : [];
      
      return boards;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки досок');
    }
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (boardData, { rejectWithValue, dispatch }) => {
    try {
      const response = await boardsAPI.createBoard({ name: boardData.name });

      const newBoard = {
        id: response.data.id,
        name: response.data.name || boardData.name,
        description: response.data.description || boardData.description || '',
        createdAt: response.data.createdAt,
        order: response.data.order || 0
      };
      
      await dispatch(getBoards());
      
      return newBoard;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка создания доски');
    }
  }
);

export const editBoard = createAsyncThunk(
  'boards/editBoard',
  async (boardData, { rejectWithValue, dispatch }) => {
    try {
      const response = await boardsAPI.editBoard(boardData.name, boardData.id);
      
      const updatedBoard = {
        id: response.data.id || boardData.id,
        name: response.data.name || boardData.name,
        description: response.data.description || boardData.description || '',
        createdAt: response.data.createdAt || boardData.createdAt,
        order: response.data.order || boardData.order || 0
      };
      
      await dispatch(getBoards());
      
      return updatedBoard;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка изменения доски');
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId, { rejectWithValue, dispatch }) => {
    try {
      await boardsAPI.deleteBoard(boardId);
      
      await dispatch(getBoards());
      
      return boardId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка удаления доски');
    }
  }
);

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateBoardLocally: (state, action) => {
      const index = state.boards.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.boards[index] = { ...state.boards[index], ...action.payload };
      }
      if (state.currentBoard?.id === action.payload.id) {
        state.currentBoard = { ...state.currentBoard, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
      });
  },
});

export const { setCurrentBoard, clearError, updateBoardLocally } = boardsSlice.actions;
export default boardsSlice.reducer;