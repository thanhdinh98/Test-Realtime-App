const User = require(`../models/user`);

const userController = ()=>{

    function isUser(req, res, next){
        if(!req.user){
            res.redirect(`/`);
        }else{
            next();
        }
    }

    function loginGet(req , res){
        res.render(`login`);
    }

    function loginPost(req, res){
        res.redirect(`/home`);
    }

    function home(req, res){
        User.findOne({username: req.user.username}, (err, user)=>{
            if(err){
                console.log(err);
            }else{
                res.render(`index`, {user: user});
            }
        });
    }

    return{
        login_get: loginGet,
        login_post: loginPost,
        is_user: isUser,
        home: home
    }
}

module.exports = userController;