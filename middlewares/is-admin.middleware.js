function isAdmin (req,res,next){
    const user = req.payload;
    console.log(req.payload);
    try {
        if(user.role === "Admin"){
            next()
        }
    } catch (error) {
       res.status(500).json("Apenas Admins podem fazer essa ação");
    }
}

module.exports = {isAdmin};