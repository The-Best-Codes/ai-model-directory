import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { TooltipProvider } from "#/components/ui/tooltip";
import { HomePage } from "./HomePage";
import { ListPage, listLoader } from "./ListPage";
import "./styles.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/list",
		loader: listLoader,
		element: <ListPage />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<TooltipProvider>
			<RouterProvider router={router} />
		</TooltipProvider>
	</React.StrictMode>,
);
