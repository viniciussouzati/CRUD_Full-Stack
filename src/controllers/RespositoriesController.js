import User from "../models/User";
import Repository from "../models/Repository"

class RepositoryController {
    async index (req, res) { 
        try {  
            const { user_id } = req.params;     // ---- Lista todos os usuários ----                                                        
            const users = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            const repositories = await Repository.find({
                userId: user_id
            });

            return res.json(repositories);
        } catch (err){  
            console.error(err);                          // ---- IF em casos de erro de conexão ----
            return res.status(500).json({ error: "Internal server error." })
        }
    }
    
    async create (req, res) {
        try {
            const { user_id } = req.params;     // ---- Lista todos os usuários ----                                                        
            const {name, email, password, linkedin, profilePicture} = req.body
            const users = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            const repository = await Repository.findOne({ 
                userId: user_id, name})
            
            if (repository) {
                return res.status(422).json({ message: `Repository ${name} already exists.`});
            }

            const newRepository = await Repository.create({
                name,
                userId: user_id,
                email, 
                password,
                linkedin,
                profilePicture
            });

            return res.status(201).json(newRepository);
        } catch (err){  
            console.error(err);                          // ---- IF em casos de erro de conexão ----
            return res.status(500).json({ error: "Internal server error." })
        }

    }
    async update(req, res) {
        try {
            const { userId } = req.params; 
            const { repo_id } = req.body; 
            const { name, email, password, linkedin, profilePicture } = req.body; 

            // -------Verifica se o repositório pertence ao userId fornecido-------
            const repository = await Repository.findOne({ userId, id: repo_id });
            if (!repository) {
                return res.status(404).json({ message: "Repository not found for the given userId." });
            }

            // -------Atualiza os campos-------
            repository.name = name;
            repository.email = email;
            repository.password = password;
            repository.linkedin = linkedin;
            repository.profilePicture = profilePicture;

            // -------Salva as alterações-------
            await repository.save();

            return res.status(200).json(repository);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export default new RepositoryController();
