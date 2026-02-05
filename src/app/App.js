import { RouterProvider } from "react-router";
import { Provider } from 'react-redux';
import { store } from './store';
import { routesConfig } from "./routes/routesConfig";

export const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={routesConfig} />
    </Provider>
  );
}