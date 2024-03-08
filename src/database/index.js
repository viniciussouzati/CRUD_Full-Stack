import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

class Database {
    constructor(){
        this.connection = mongoose.connect(
            process.env.MONGODB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        ).then(() => {
            console.log("Conectado ao banco de dados MongoDB");
        }).catch(err => {
            console.error("Erro ao conectar ao banco de dados MongoDB:", err);
        });  
    }
}

export default new Database();
