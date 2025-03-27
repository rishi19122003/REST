const express=require('express');
const app=express();    // create an instance of express
const port=3000;        // port number  to connect to the server
const path=require('path');  // path module to access the path of the file
const methodoverride=require('method-override');

app.use(express.urlencoded({extended:true}));  // to parse the data from the form
app.use(express.json());  // to parse the data from the form
app.use(methodoverride('_method'));  // to use the method override

app.set('view engine','ejs');  // set the view engine to ejs
app.set('views',path.join(__dirname,'views'));  // set the views directory to the views folder
app.use(express.static(path.join(__dirname,'public')));  // set the static path to the public folder   

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);  // display the message on the console
});

app.get('/',(req,res)=>{
    res.send("Request received");  // display the message on the browser
});

let posts = [
    {
        username:"Rishi",
        content:"This is my first post",
        id:"1a"
    },
    {
        username:"Priya",
        content:"This is my first internship",
        id:"2b"
    },
    {
        username:"Rajat",
        content:"This is my first project",
        id:"3c"
    }

];

app.get("/posts",(req,res)=>{
    res.render('index.ejs',{posts});  // render the index.ejs file
});

app.get("/posts/new",(req,res)=>{
    res.render('new.ejs');  // render the new.ejs file
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    posts.push({username,content});
    res.redirect('/posts');  // redirect to the posts page
});

app.get("/posts/:id",(req,res)=>{
    let post=posts.find(p=>p.id===req.params.id);
    if(!post) return res.sendStatus(404);  // if post not found send a 404 status
    res.render('show.ejs',{post});  // render the show.ejs file
});


app.get("/posts/:id/edit",(req,res)=>{
    let post=posts.find(p=>p.id===req.params.id);
    if(!post) return res.sendStatus(404);  // if post not found send a 404 status
    res.render('edit.ejs',{post});  // render the edit.ejs file
});

app.patch("/posts/:id",(req,res)=>{
    let post=posts.find(p=>p.id===req.params.id);
    let {content}=req.body;
    if(!post) return res.sendStatus(404);  // if post not found send a 404 status
    post.content=content;
    res.redirect('/posts');  // redirect to the posts page

});

app.delete("/posts/:id",(req,res)=>{
    posts=posts.filter(p=>p.id!==req.params.id);
    res.redirect('/posts');  // redirect to the posts page
});
