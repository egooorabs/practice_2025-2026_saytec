import { RouterProvider } from "react-router";
import { Provider } from 'react-redux';
import { store } from './store';
import { routesConfig } from "./routes/routesConfig";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={routesConfig} />
      </DndProvider>
    </Provider>
  );
}