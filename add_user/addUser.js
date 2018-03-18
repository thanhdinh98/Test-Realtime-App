const User = require(`../models/user`);
const userInfos = require(`../ADD_YOUR_USER_HERE`);
const mongoose = require(`mongoose`);

mongoose.connect(userInfos.db_string, {}, (err)=>{
    if(err){
        console.log(err);
    }else{
        const user = new User();

        user.username = userInfos.username;
        user.password = userInfos.password;
    
        user.save((err, user)=>{
            if(err){
                console.log(err);
            }else{
                console.log(`A user is added`);
            }

            mongoose.disconnect();
        });
    }
});
