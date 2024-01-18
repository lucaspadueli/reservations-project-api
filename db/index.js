const {connect} = require('mongoose');
const DB_URI = process.env.MONGO_URI;

async function connectDB(){
    console.log('aguardando conexao com o banco de dados');
   if(!DB_URI){
    throw new Error('sem endereco do banco de dados')
   }
    try {
        const x = await connect(DB_URI);
        console.log(`conectado ao banco de dados ${x.connections[0].name}`)
    } catch (error) {
        console.log('falha ao conectar ao banco de dados.', error);
        process.exit();
    }
}

connectDB();