import * as React from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	type RouteObject,
} from "react-router";

import { TooltipProvider } from "#/components/ui/tooltip";
import { DocsPage } from "./DocsPage";
import { HomePage } from "./HomePage";
import { ListPage, listLoader } from "./ListPage";
import { NotFoundPage } from "./NotFoundPage";
import "./styles.css";

const routeObjects = [
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/list",
		loader: listLoader,
		element: <ListPage />,
	},
	{
		path: "/docs/*",
		element: <DocsPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
] satisfies RouteObject[];

const router = createBrowserRouter(routeObjects);

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<TooltipProvider>
			<RouterProvider router={router} />
		</TooltipProvider>
	</React.StrictMode>,
);
