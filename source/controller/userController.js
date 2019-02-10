const User = require(`../models/user`);
const Message = require(`../models/message`);

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

    function homeGet(req, res){
        res.render(`index`, {user: req.user});
    }

    function homePost(req, res){
        User.findOne({username: req.user.username}, (err,user)=>{
            if(err){
                console.log(err);
            }else{
                Message.findOne({user: user._id}, (err, message)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.json(message);
                    }
                });
            }
        });
    }

    return{
        login_get: loginGet,
        login_post: loginPost,
        is_user: isUser,
        home_get: homeGet,
        home_post: homePost
    }
}

module.exports = userController;