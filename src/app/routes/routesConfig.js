import { createBrowserRouter } from "react-router";
import { AuthPage } from "../../pages/Auth/AuthPage";
import { RegPage } from "../../pages/Reg/RegPage";
import { HomePage } from "../../pages/Home/HomePage";
import { Error404Page } from "../../pages/Error404/Error404Page";
import { DeskPage } from "../../pages/Desk/DeskPage";
import { BoardPage } from "../../pages/Board/BoardPage";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { ROUTES } from "../../shared/constants/routes";

export const routesConfig = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage/>
  },
  {
    path: ROUTES.AUTH,
    element: <AuthPage/>
  },
  {
    path: ROUTES.REGISTER,
    element: <RegPage/>
  },
  {
    path: ROUTES.DESK,
    element: (
      <ProtectedRoute>
        <DeskPage/>
      </ProtectedRoute>
    )
  },
  {
    path: ROUTES.BOARD,
    element: (
      <ProtectedRoute>
        <BoardPage/>
      </ProtectedRoute>
    )
  },
  {
    path: ROUTES.ERROR_404,
    element: <Error404Page/>
  },
  {
    path: ROUTES.ABOUT,
    element: <Error404Page/>
  },
  {
    path: ROUTES.CONTACTS,
    element: <Error404Page/>
  },
  {
    path: ROUTES.ANY,
    element: <Error404Page/>
  }
]);