import axios from 'axios';

const API_URL = 'http://localhost:7000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/registration', userData),
};


export const boardsAPI = {
  createBoard: (name) => {
    return api.post('/board/createBoard', name);
  },
  
  deleteBoard: (boardId) => {
    return api.delete('/board/deleteBoard', { params: { boardId }});
  },
  
  editBoard: (name, boardId) => {
    return api.put('/board/editBoard', { name, boardId });
  },
  
  getBoards: () => {
    return api.get('/board/boards');
  },
};

export const listsAPI = {
  createList: (name, boardId) => {
    return api.post('/list/createList', { name, boardId });
  },
  
  deleteList: (listId, boardId) => {
    return api.delete('/list/deleteList', { params: { listId, boardId } });
  },
  

  editList: (name, listId, boardId) => {
    return api.put('/list/editList', { name, listId, boardId });
  },
  
  getLists: (boardId) => {
    return api.get('/list/list', { params: { boardId } });
  },
};

export const tasksAPI = {
  createTask: (name, listId) => {
    return api.post('/task/createTask', { name, listId });
  },
  

  getTasks: (boardId, listId) => {
    return api.get('/task/task', { params: { boardId, listId } });
  },
  

  editTask: (name, isActive, taskId, listId, boardId) => {
    return api.put('/task/editTask', { name, isActive, taskId, listId, boardId });
  },
  

  deleteTask: (taskId, listId, boardId) => {
    return api.delete('/task/deleteTask', { params: { taskId, listId, boardId } });
  },
};

export default api;