import { Router } from "express";
import HomeController from "./controllers/HomeController";
import UsersController from "./controllers/UsersController";
import RespositoriesController from "./controllers/RespositoriesController";

const routes = new Router ();

// -----------------Redireciona a raiz do diretório para /home-----------------

// routes.get('/', (req, res) => {
//   res.redirect('/home');
// });

// -----------------RESTFULL-----------------
routes.get('/home', HomeController.index);

// -----------------UsersController-----------------
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.destroy);

//-----------------RespositoriesController-----------------
routes.get('/users/:user_id/repositories', RespositoriesController.index);
routes.post('/users/:user_id/repositories', RespositoriesController.create);
routes.delete('/users/:user_id/repositories', RespositoriesController.update);

export default routes;
