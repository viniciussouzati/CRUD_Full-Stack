// -----------------LIGAÇÃO ENTRE HOMECONTROLLER E APP-----------------

import { Router } from "express";
import HomeController from "./controllers/HomeController";

const routes = new Router ();

routes.get('/home', HomeController.index)

export default routes;
