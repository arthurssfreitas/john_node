
module.exports = {
    productPage: (req, res) =>{
        res.render('product.ejs',{
            title: "Manager products",
            message:''
        });
    },
    addProduct: (req, res) =>{
        message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
        res.render('add-player.ejs', {
            message,
            title: "Welcome to Socka | Add a new player"
        });


    }
}