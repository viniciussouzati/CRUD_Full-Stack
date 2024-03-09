import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

class Database {
    constructor(){
        this.connection = mongoose.connect("mongodb+srv://vluiz05:123Lindo@cluster0.suhfhss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// ---------PRÁTICA INCORRETA AO ADICIONAR O LINK DIRETO DO DB AQUI---------
        ).then(() => {
            console.log("Conectado ao banco de dados MongoDB");
        }).catch(err => {
            console.error("Erro ao conectar ao banco de dados MongoDB:", err);
        });  
    }
}

export default new Database();
