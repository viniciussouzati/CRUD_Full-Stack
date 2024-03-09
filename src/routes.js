// -----------------LIGAÇÃO ENTRE HOMECONTROLLER E APP-----------------
import { Router } from "express";


import HomeController from "./controllers/HomeController";
import UsersController from "./controllers/UsersController";
import RespositoriesController from "./controllers/RespositoriesController";

const routes = new Router ();



// RESTFULL
routes.get('/home', HomeController.index);                  // --- CONSULTA ROTA---
routes.get('/users/:id', UsersController.show);             // --- MOSTRAR USER---
routes.post('/users', UsersController.create);             // --- CRIAR USER ---
routes.put('/users/:id', UsersController.update);           // --- UP USER ---
routes.delete('/users/:id', UsersController.destroy);       // --- DELETE USER ---

routes.get('/users/:user_id/repositories', RespositoriesController.index);
routes.post('/users/:user_id/repositories', RespositoriesController.create);
routes.delete('/users/:user_id/repositories', RespositoriesController.update);


export default routes;
