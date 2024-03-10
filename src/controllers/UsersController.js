// ----------------- Lógica para ROTA HELLO -----------------
import User from "../models/User"
class UsersController {
    async index (req, res) { 
        try {  
            const users = await User.find();       // ---- Lista todos os usuários ----                                                        
            return res.json(users);
        } catch (err){  
            console.error(err);                          // ---- IF em casos de erro de conexão ----
            return res.status(500).json({ error: "Internal server error." })
        }
    }
// -----------------MONSTRAR USUÁRIO-----------------
    async show (req, res) { 
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json();
            }
            return res.json(user);
        } catch (err) {
            console.error(err);                          // ---- IF em casos de erro de conexão ----
            return res.status(500).json({ error: "Internal server error." })
        }
      
// -----------------CRIAR USUARIOS-----------------
    }
    async create (req, res) {
        try {
            const { name, email, linkedin, password } = req.body;

            const user = await User.findOne({ email });

            if (user) {
                return res
                .status(422)
                .json({ message: `Usuário ${email} já existente.`});
            }

            const newUser = await User.create({ name, email, linkedin, password  });
            return res
            .status(201)
            .json(newUser);
        } catch (err){
            console.error(err);                          // ---- IF em casos de erro de conexão ----
            return res.status(500).json({ error: "Internal server error." })
        }  
    }

// -----------------
    async update (req, res) { 
        try{
            const { id } = req.params;
            const { name, email, password, linkedin } = req.body;
            
            const user = await User.findById(id);
            
            if (!user) {
                return res.status(404).json();
        }
        await user.updateOne ({ name, email, password, linkedin })
        
        return res.status(200).json();
        }  catch(err){
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
      
    }
    async destroy (req, res) { 
        try{
        const { id } = req.params;
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json();
        }
        await user.deleteOne();
    
        return res.status(200).json();
        }  catch(err){
        console.error(err);
        return res.status(500).json({ error: "Internal server error." })
        }
    }
}


export default new UsersController();

// --- estrutura = código -> node -> mongodb