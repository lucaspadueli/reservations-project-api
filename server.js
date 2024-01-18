const app = require('./app');

PORT = process.env.PORT || 2000
app.listen(PORT,()=>{
    console.log(`servidor rodando na porta ${PORT}`);
})

