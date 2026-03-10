import { createBrowserRouter } from "react-router";
import { AuthPage } from "../../pages/Auth/AuthPage";
import { RegPage } from "../../pages/Reg/RegPage";
import { HomePage } from "../../pages/Home/HomePage";
import { Error404Page } from "../../pages/Error404/Error404Page";
import { DeskPage } from "../../pages/Desk/DeskPage";
import { BoardPage } from "../../pages/Board/BoardPage";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export const routesConfig = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/auth',
    element: <AuthPage/>
  },
  {
    path: '/register',
    element: <RegPage/>
  },
  {
    path: '/desk',
    element: (
      <ProtectedRoute>
        <DeskPage/>
      </ProtectedRoute>
    )
  },
  {
    path: '/board/:boardId',
    element: (
      <ProtectedRoute>
        <BoardPage/>
      </ProtectedRoute>
    )
  },
  {
    path: '/404',
    element: <Error404Page/>
  },
  {
    path: '/about',
    element: <Error404Page/>
  },
  {
    path: '/contacts',
    element: <Error404Page/>
  },
  {
    path: '*',
    element: <Error404Page/>
  }
]);