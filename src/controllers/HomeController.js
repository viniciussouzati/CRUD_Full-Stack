// ----------------- Lógica para ROTA HELLO -----------------

class HelloController {
    async index (req, res) { 
      return res.json({ hello: 'Página inicial' });
    }
}

export default new HelloController();

// --- estrutura = código -> node -> mongodb