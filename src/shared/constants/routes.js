export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  REGISTER: '/register',
  DESK: '/desk',
  BOARD: '/board/:boardId',
  BOARD_WITH_ID: (boardId) => `/board/${boardId}`,
  ERROR_404: '/404',
  ABOUT: '/about',
  CONTACTS: '/contacts',
  ANY: '*',
};