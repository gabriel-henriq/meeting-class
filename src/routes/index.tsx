import {createBrowserRouter} from "react-router-dom";
import Layout from "../layouts/Layout.tsx";
import ClassPage from "../pages/ClassPage.tsx";
import ProfessorPage from "../pages/ProfessorPage.tsx";
import TabletPage from "../pages/TabletPage.tsx";
import ClassroomPage from "../pages/ClassroomPage.tsx";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "class",
                index: true,
                element:<ClassPage />,
            },
            {
                path: "professor",
                element: <ProfessorPage/>,
            },
            {
                path: "tablet",
                element: <TabletPage/>,
            },
            {
                path: "room",
                element: <ClassroomPage/>,
            }
        ]
    },
]);


export default routes;