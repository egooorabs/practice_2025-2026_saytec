import { RouterProvider } from "react-router";
import { routesConfig } from "./routes/routesConfig";

export const App = () => {
    return(
        <RouterProvider router={routesConfig} />
    )
}