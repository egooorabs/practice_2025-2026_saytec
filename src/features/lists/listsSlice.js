import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listsAPI } from '../../app/services/api';

const initialState = {
  lists: [],
  currentList: null,
  loading: false,
  error: null,
};

export const getLists = createAsyncThunk(
  'lists/getLists',
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await listsAPI.getLists(boardId);
      
      const lists = Array.isArray(response.data) ? response.data.map(list => ({
        id: list.id,
        name: list.name || 'Без названия',
        boardId: list.boardId,
        order: list.order || 0
      })) : [];
      
      return lists;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки листов');
    }
  }
);

export const createList = createAsyncThunk(
  'lists/createList',
  async (listData, { rejectWithValue }) => {
    try {
      const response = await listsAPI.createList(listData.name, listData.boardId);
      
      return {
        id: response.data.id,
        name: response.data.name || listData.name,
        boardId: response.data.boardId || listData.boardId,
        order: response.data.order || 0
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка создания листа');
    }
  }
);


export const editList = createAsyncThunk(
  'lists/editList',
  async (listData, { rejectWithValue }) => {
    try {
      
      const response = await listsAPI.editList(
        listData.name,
        listData.id,
        listData.boardId
      );
      
      return {
        id: response.data.id || listData.id,
        name: response.data.name || listData.name,
        boardId: response.data.boardId || listData.boardId,
        order: response.data.order || listData.order || 0
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка изменения листа');
    }
  }
);

export const deleteList = createAsyncThunk(
  'lists/deleteList',
  async (listData, { rejectWithValue }) => {
    try {
      await listsAPI.deleteList(listData.id, listData.boardId);
      return listData.id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка удаления листа');
    }
  }
);

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setCurrentList: (state, action) => {
      state.currentList = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(getLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.loading = false;
        state.lists.push(action.payload);
      })
      .addCase(createList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editList.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.lists.findIndex(l => l.id === action.payload.id);
        if (index !== -1) {
          state.lists[index] = action.payload;
        }
      })
      .addCase(editList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = state.lists.filter(l => l.id !== action.payload);
      });
  },
});

export const { setCurrentList, clearError } = listsSlice.actions;
export default listsSlice.reducer;