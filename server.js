// import
const express = require('express');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { query } = require('express');
const e = require('express');
let path=require("path")
//app
let app =express();

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname,"./client/build")));
app.use(cookieParser())
// db
// mongoose.connect('mongodb://localhost:27017/FawTubeMERN');
mongoose.connect('mongodb+srv://Fawad:QqfgVdAqJGQoY9zE@cluster0.2sico1z.mongodb.net/?retryWrites=true&w=majority');
// schema


let userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribedUsers:{
        // type:[String]
        type:Array,
        default:[]
    },
    token:{
        type:String
    },
},{timestamps:true}
)
userSchema.methods.generateAuthToken=async function(e) {
    let token=await jsonwebtoken.sign({_id:this._id},'fawadisagoodboyyes');
    this.token=token;
    return token;
}

let videoSchema=new mongoose.Schema({

    userId:{
        type:String,
        // required:true
    },
    videoTitle:{
        type:String,
        unique:true
    },
    videoDescription:{
        type:String,
    },
    imageUrl:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    views:{
        type:Number,
        default:0
    },
    likes:{
        type:[String],
        default:[]
    },
    dislikes:{
        type:[String],
        default:[]
    },
},{timestamps:true})

let commentSchema=new mongoose.Schema({
    userId:{
        type:String,
        // required:true,
    },
    videoId:{
        type:String,
        // required:true,
    },
    desc:{
        type:String,
        // required:true,
    },
},{timestamps:true}
)


//Model
let UserModel=new mongoose.model('user',userSchema);
let videoModel=new mongoose.model('video',videoSchema);
let commentModel=new mongoose.model('comment',commentSchema);


//Authentication
let Auth=(async (req,res,Next)=>{
    // let token=await jsonwebtoken.verify()
    try {
        if (req.cookies.FawTubeUser) {
            headertoken=req.cookies.FawTubeUser;
            // console.log('req.cookies.FawTubeUser',req.cookies.FawTubeUser);
        }
        else if (req.headers.token) {
            headertoken=req.headers.token;
            // console.log('req.headers.token',req.headers.token);
        }
        // console.log('headertoken',headertoken);
        jsonwebtoken.verify(headertoken,'fawadisagoodboyyes',async(err,user)=>{
            if(err)
            {
                
                // console.log('headertokenend0',headertoken);
                // console.log('err',err);
                // console.log('user',user);
                return res.status(404).send('err');
            }
            // console.log('headertokenend',headertoken);
            
            req.user=user;    
            // console.log('req.user',req.user);
            Next();
            // res.status(200).send(req.user);
        })
    } catch (error) {
        res.status(404).send('error');
    }
})


// api


// post
app.post('/user',async(req,res)=>{
    try {
        // console.log('runnign')
        let val=await UserModel(req.body);
        let e=await bcryptjs.hash(req.body.password,10);
        val.password=e;
        // console.log('runnign')
        await val.generateAuthToken();
        val.save();
        res.status(200).send(val);
    } catch (error) {
        res.status(404).send('error');
    }
})
app.post('/login',async(req,res)=>{
    try {
    let val =await UserModel.findOne({email:req.body.email});
    let e=bcryptjs.compare(val.password,req.body.password)
    if (e) {
         let token=await val.generateAuthToken();
         res.cookie('FawTubeUser',token);
         res.status(200).send('Valid user')
        }
        else{
            res.status(404).send('Please check your email and password')       
        }
    } catch (error) {
    res.status(404).send('Not authenticated!')       
        
}
})
app.post('/video',Auth,async(req,res)=>{
    let val=await videoModel({userId:req.user._id,...req.body});
    try {
        val.save();
        res.status(200).send(val);
    } catch (error) {
        res.status(404).send(error);
    }
})
app.post('/comment',Auth,async(req,res)=>{
    try {

        // console.log('comment body',req.body)
        if (req.user._id) {
            
            let val=await commentModel({...req.body,userId:req.user._id});
            // Lumber 1 title
            // console.log('comment val',val)
            val.save();
            res.status(200).send(val);
        }
        else
        {
            res.status(403).send('not authenticated');

        }
    } catch (error) {
        res.status(404).send('error');
    }
})

// get
app.get('/user',Auth,async(req,res)=>{
    try {
        if(req.user._id)
        {
            // console.log(req.user._id);
        let val=await UserModel.findOne({_id:req.user._id});
        // let val2=await ,UserModel.findOne({_id:val.userId});
        // let e=bcryptjs.compare()
        res.status(200).send(val);
        }
        else
        {
            res.status(403).send('error');
        }
    } catch (error) {
        res.status(404).send(error);
    }  
})
app.get('/user/:id',Auth,async(req,res)=>{
    try {
        // console.log(req.user._id);
        // console.log(req.params.id);
        if(req.user._id===req.params.id)
        {
        // console.log(req.user._id);
        let val=await UserModel.findOne({_id:req.user._id});
        // let decodeing= await bcryptjs.decodeBase64(val.password);
        // console.log('decodeing',decodeing);    
        res.status(200).send(val);
        // let val2=await ,UserModel.findOne({_id:val.userId});
        // let e=bcryptjs.compare()
        }
        else
        {
            res.status(403).send('error');
        }
    } catch (error) {
        res.status(404).send(error);
    }  
})
app.get('/use/use/use/use/:email', Auth, async (req, res) => {
    // console.log('req.params.email');
    // console.log(req.params.email);
    let val = await UserModel.findOne({ email: req.params.email })
    try {
        // console.log('running');
        // console.log(val);
        res.status(200).send(val);
        } catch (error) {
        res.status(404).send(error);
    }
})
app.get('/users/:id',Auth,async(req,res)=>{
    try {
        let val=await videoModel.findOne({_id:req.params.id});
        let val2=await UserModel.findOne({_id:val.userId});
        // let e=bcryptjs.compare()
        res.status(200).send(val2);
    } catch (error) {
        res.status(404).send(error);
    }  
})
app.get('/tags',async(req,res)=>{
    try {
        // console.log('params');
        let params=req.query.tags.split(",");
        // console.log('params',params);
        let val =await videoModel.find({tags:{$in:params}})
        // console.log('val ',val );
        res.status(200).send(val);
    } catch (error) {
        res.status(404).send('error');
    }
    })
app.get('/userss/:id',async(req,res)=>{
    try {
        // let val=await videoModel.findOne({_id:req.params.id});
        // console.log('userssid: ',req.params.id)
        let val2=await UserModel.findOne({_id:req.params.id});
        // console.log('userssid: ',val2)

        // let e=bcryptjs.compare()
        res.status(200).send(val2);
    } catch (error) {
        res.status(404).send(error);
    }  
})
app.get('/user/:email',async(req,res)=>{
    try {
        let val=await userModel.findOne({email:req.params.email});
        // let e=bcryptjs.compare()
        res.status(200).send(val);
    } catch (error) {
        res.status(404).send(error);
    }  
})
app.get('/subscribedUsers',async(req,res)=>{
    try {
        let val=await userSchema.findOne({email:req.params.email});

        // let e=bcryptjs.compare()
        res.status(200).send(val);
    } catch (error) {
        res.status(404).send(error);
    }  
})

app.get('/videos/:id',async(req,res)=>{
    try {
        // console.log('req.params.id',req.params.id);
        console.log(req.params.id)
        let val =await videoModel.findOne({_id:req.params.id})
        console.log('/videos/val',val)

        // console.log(req.params.id)
        // if(val.userId===req.user.id)
        // {
        //     let val2=await videoModel.findOneAndDelete({_id:req.params.id})
            res.status(200).send(val);
        // }
        // else
        // {
        //     res.status(404).send(error);
        // }
    } catch (error) {
        res.status(404).send('error');
    }
    })
    // ,Auth
    app.get('/random',async(req,res)=>{
        try {
            
            let val =await videoModel.aggregate([{$sample:{size:15}}])
            res.status(200).send(val);
        } catch (error) {
            res.status(404).send('error');
        }
        })
    
    app.get('/trend',async(req,res)=>{
        try {
            
            let val =await videoModel.find({$sort:({views:-1})});
            res.status(200).send(val);
        } catch (error) {
            res.status(404).send('error');
        }
        })
    
    app.get('/subs',Auth,async(req,res)=>{
        try {
            
            let val =await UserModel.findOne({_id:req.user._id})
            // console.log('val ',val );
            // let val2=await UserModel.findOne({_id:req.user});
            // let email=val2.email;
            let subChannels=val.subscribedUsers;
            // console.log('subChannels',subChannels);
            let list=await Promise.all(
                subChannels.map((id)=>{
                    // console.log('id',id);
                    let value=videoModel.find({userId:id})
                    // console.log('value',value);
                    return value;
                    // console.log('id');
                    // return videoModel.findOne({email:id})
                })
            )
            // console.log('list',list);
            res.status(200).send(list.flat());
        } catch (error) {
            res.status(404).send('error');
        }
        })
    
        
    app.get('/signout',Auth,async(req,res)=>{
        try {
            res.clearCookie('FawTubeUser');
            res.status(200).send('loggedout successfully');
        } catch (error) {
            res.status(404).send('error');
        }
        })
        // ,Auth
    app.get('/search',async(req,res)=>{
            try {
                let params=req.query.q;
                // console.log('params',params);
                let val =await videoModel.find({
                    videoTitle: { $regex:params ,$options:"i" }}).limit(40)
                // console.log('val ',val );
                res.status(200).send(val);
            } catch (error) {
                res.status(404).send('error  err');
            }
            })
            // ,Auth
    app.get('/comment/:id',async(req,res)=>{
        try {
            // console.log('val');
            // console.log(req.params.id);
            let id=req.params.id
            let val=await commentModel.find({videoId:id});
            // console.log('val',val);
            // let val3=await userModel.find({_id:val.userId});
            // console.log(val3);
            // let val2={val:val,val3:val3}
            // console.log(val2);
            res.status(200).send(val);
        } catch (error) {
            res.status(404).send(error);
        }
    })
    

            

// update
app.put('/user/:id',Auth,async(req,res)=>{
    try {
        
        let val;
        // console.log(req.user._id);
        // console.log(req.params.id);
        if(req.user._id===req.params.id){
            if (req.body.password) {
                // console.log('req.body.password',req.body.password);
                let e=await bcryptjs.hash(req.body.password,10);
            val=await UserModel.findOneAndUpdate({_id:req.params.id},{
                name:req.body.name,
                email:req.body.email,
                password:e
            })
            // val.save();
        }
        else
        {
            val=await UserModel.findOneAndUpdate({_id:req.params.id},req.body);
        }
        // console.log(val);
        res.status(200).send(val);
    }
    else
    {
        res.status(402).send('error');
    }
    } catch (error) {
        res.status(404).send('error');
    }  
}
)
app.patch('/user/:email/:follow',Auth,async(req,res)=>{
    try {
            let paramsid=req.params.email;
            // console.log('paramsid',paramsid);
            // let bodyid=req.body.email;
            let video=await videoModel.findOne({_id:paramsid});
            let paramsidUser=await UserModel.findOne({_id:video.userId});
            // let bodyidUser=await UserModel.findOne({_id:bodyid});
            // console.log(paramsidUser);
            if(req.params.id!==req.user._id){
                if(!paramsidUser.subscribedUsers.includes(req.user._id))
                {
                // console.log('paramsidUser.subscribedUsers',paramsidUser );
               await paramsidUser.updateOne({$push:{subscribedUsers:req.user._id}});
               await paramsidUser.updateOne({$inc:{subscribers:1}});
            //    await bodyidUser.updateOne({$push:{following:req.params.id}})
                res.status(200).send('Successfully Followed!'); 
            }
            else
            {
                res.status(402).send("You are already a follower"); 
            }}
            else
            {
                res.status(403).send("You can not follow yourself"); 
            }
            } catch (error) {
                res.status(404).send(error);
            }
        
})
app.patch('/views/:email',Auth,async(req,res)=>{
    try {
            let paramsid=req.params.email;
            // console.log('paramsid',paramsid);
            let video=await videoModel.findOne({_id:paramsid});
            // console.log('video.subscribedUsers',video );
            await video.updateOne({$inc:{views:1}});
            res.status(200).send('Successfully Followed!'); 

            } catch (error) {
                res.status(404).send(error);
            }
        
})

// app.patch('/aa/:email',Auth,async(req,res)=>{
//     try {
//             let paramsid=req.params.email;
//             console.log(paramsid);
//             let video=await BlogModel.findOne({_id:paramsid}) ; 
//             console.log(video);
//             let paramsidUser=await userModel.findOne({_id:video.userId});
//             console.log(paramsidUser);
//             if(req.params.id!==req.user._id){
//                 console.log(req.user._id);
//                 // if(!paramsidUser.subscribedUsers.includes(req.user._id))
//                 if(!video.subscribedUsers.includes(req.user._id))
//                 {
//             //    await paramsidUser.updateOne({$push:{subscribedUsers:req.user._id}});
//             //    await paramsidUser.updateOne({$inc:{subscribers:1}});
//             //    await paramsidUser.updateOne({$inc:{view:1}});
//             console.log('not included');
//                await video.updateOne({$push:{subscribedUsers:req.user._id}});
//             //    await video.updateOne({$inc:{subscribers:1}});
//                await video.updateOne({$inc:{view:1}});
//                 res.status(200).send('Successfully Followed!'); 
//             }
//             else
//             {
//                 res.status(402).send("You are already a follower"); 
//             }}
//             else
//             {
//                 res.status(403).send("You can not follow yourself"); 
//             }
//             } catch (error) {
//                 res.status(404).send(error);
//             }
        
// })
app.patch('/user/:email/:follow/:unfollow',Auth,async(req,res)=>{
    try {
        // console.log('fawad');
            let paramsid=req.params.email;
            let bodyid=req.body.email;
            let paramsidUser=await UserModel.findOne({_id:paramsid});
            let bodyidUser=await UserModel.findOne({_id:bodyid});
            // console.log('paramsidUser',req.params.email); 
            // console.log('bodyidUser',req.body.email); 
            if(req.params.id!==req.body._id){
                if(paramsidUser.subscribedUsers.includes(req.body._id))
                {
                    await paramsidUser.updateOne({$pull:{subscribedUsers:req.body._id}});
                    await paramsidUser.updateOne({$inc:{subscribers:-1}});
                    //    await bodyidUser.updateOne({$pull:{following:req.params.id}})
                    res.status(200).send('Successfully UnFollowed!'); 
                }
                else
                {
                res.status(404).send("You are already a Unfollower"); 
            }}
            else
            {
                res.status(404).send("You can not follow or Unfollow yourself"); 
            }
            } catch (error) {
                res.status(404).send(error);
            }
        
})
app.put('video/:id',async(req,res)=>{
    try {
        
        let val =await videoModel.findOne({_id:req.params.id})
        if(val.userId===req.user.id)
        {
            let val2=await videoModel.findOneAndUpdate({_id:req.params.id},req.body)
            res.status(200).send(val2);
        }
        else
        {
            res.status(404).send(error);
        }
    } catch (error) {
        res.status(404).send(error);
    }
    })
app.put('view/:id',async(req,res)=>{
    try {
        
        let val =await videoModel.findOne({_id:req.params.id})
        if(val.userId===req.user.id)
        {
            let views=req.body.views;
            req.body.views=views+1;
            let val2=await videoModel.findOneAndUpdate({_id:req.params.id},req.body)
            res.status(200).send(val2);
        }
        else
        {
            res.status(404).send(error);
        }
    } catch (error) {
        res.status(404).send(error);
    }
    })

app.patch('/video/:email/:likes',Auth,async(req,res)=>{
    try {
        let paramsid=req.params.email;
        let paramsidUser=await videoModel.findOne({_id:paramsid});
        if(req.params.id!==req.user._id){
            if(!paramsidUser.likes.includes(req.user._id))
            {
            // console.log('paramsidUser.subscribedUsers',paramsidUser );
            // console.log('req.user._id',req.user._id );
            await paramsidUser.updateOne({$push:{likes:req.user._id}});
            res.status(200).send('Successfully'); 
        }
        else if(paramsidUser.dislikes.includes(req.user._id))
        {
            await paramsidUser.updateOne({$pull:{dislikes:req.user._id}});
            res.status(200).send('Successfully'); 
        }
        else
        {
            res.status(402).send("You have already liked"); 
            
        }}
        else
        {
            res.status(403).send("You can not like yourself"); 
        }
        } catch (error) {
            res.status(404).send('error');
        }
    
})
app.patch('/video/:email/:likes/:dislikes',Auth,async(req,res)=>{
    try {
        let paramsid=req.params.email;
        // let bodyid=req.body.email;
        let paramsidUser=await videoModel.findOne({_id:paramsid});
        // console.log(req.body.email);
        if(req.params.id!==req.user._id){
            if(!paramsidUser.dislikes.includes(req.user._id))
            {
            // console.log('paramsidUser.subscribedUsers',paramsidUser );
           await paramsidUser.updateOne({$push:{dislikes:req.user._id}});
           if(paramsidUser.likes.includes(req.user._id))
            {
           await paramsidUser.updateOne({$pull:{likes:req.user._id}});
        }
            res.status(200).send('Successfully DisLiked!'); 
        }
        else
        {
            res.status(402).send("You have already disliked"); 
        }}
        else
        {
            res.status(403).send("You can not dislike yourself"); 
        }
        } catch (error) {
            res.status(404).send('error');
        }
        
})



// delete
app.delete('/user/:id',Auth,async(req,res)=>{
    try {
        // console.log(req.user._id);
        // console.log(req.params.id);
        if(req.user._id===req.params.id){
        let val=await UserModel.findOneAndDelete({_id:req.params.id})
        // console.log(val);
        res.status(200).send(val);
    }
    else
    {
        res.status(404).send('error');
    }
    } catch (error) {
        res.status(404).send('error');
    }  
}
)

app.delete('video/:id',async(req,res)=>{
    try {
        
        let val =await videoModel.findOne({_id:req.params.id})
        if(val.userId===req.user.id)
        {
            let val2=await videoModel.findOneAndDelete({_id:req.params.id})
            res.status(200).send(val2);
        }
        else
        {
            res.status(404).send(error);
        }
    } catch (error) {
        res.status(404).send(error);
    }
    })


    app.delete('/comment/:id',Auth,async(req,res)=>{
        try {
            let val=await commentModel.findOne({_id:req.params.id});
            let val2=await videoModel.findOne({_id:req.params.id});
            if(req.user._id===val.id||req.user._id===val2.id)
            {
                await val.findOneAndDelete(req.params.id);
                res.status(200).send(val);
            }
            else
            {
                res.status(404).send('error');
            }
        } catch (error) {
            res.status(404).send(error);
        }
    })
  
    app.get("*",(req,res)=>{
        // res.sendFile(path.join(__dirname,"./client/build/index.html")),
        //  const index = path.join(__dirname,'client', 'build', 'index.html');
        //  console.log('index',index);
        res.sendFile(path.join(__dirname,'client', 'build', 'index.html')),
        function (err) {
            // console.log(err);
            res.status(500).send(err)
        }
    })
    
let port=process.env.port||8000;
// listen
app.listen(port,()=>{
    console.log(`'Listening to te port ${port}'`);
})