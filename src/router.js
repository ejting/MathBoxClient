import {BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello World!</div>,
    },
]);

export default router;