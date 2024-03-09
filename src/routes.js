// -----------------LIGAÇÃO ENTRE HOMECONTROLLER E APP-----------------

import { Router } from "express";
import { route } from "express/lib/router"


import HomeController from "./controllers/HomeController";
import UsersController from "./controllers/UsersController";

const routes = new Router ();



// RESTFULL
routes.get('/home', HomeController.index);                  // --- CONSULTA ROTA---
routes.get('/users/:id', UsersController.show);             // --- MOSTRAR USER---
routes.post('/users', UsersController.create);             // --- CRIAR USER ---
routes.put('/users/:id', UsersController.update);           // --- UP USER ---
routes.delete('/users/:id', UsersController.destroy);       // --- DELETE USER ---



export default routes;
