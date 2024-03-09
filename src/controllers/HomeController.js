// ----------------- Lógica para ROTA HELLO -----------------

class HomeController {
    async index (req, res) { 
      return res.json({ hello: 'Página inicial' });
    }
}

export default new HomeController();

// --- estrutura = código -> node -> mongodb