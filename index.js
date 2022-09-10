const express = require('express');

const app = express();
const port = 3000;

//parse json
app.use(express.json());
app.use(express.urlencoded({extended:false}));

let movies = [
    {
    id:'1',
    title:'inception',
    director:'titmi',
    release_date:'2020-07-16'
},
{
    id:'2',
    title:'spiderman',
    director:'doyin',
    release_date:'2040-08-16'
},
];

//get movie list in form of json

app.get("/movie", (req,res)=>{
    res.json(movies);
});

//add mmovie to the list
app.post("/movie",(req,res)=>{

    const movie = req.body;

    console.log(movie);
    
    movies.push(movie);
    
    res.send("movie is added to the list");
});

//search for a movie

app.get("/movie/:id",(req,res)=>{
    const id = req.params.id;

    for(let movie of movies){
        if(movie.id==id){
            res.json(movie);
            return 
        }
    }
});

//delete movie from list

app.delete("/movie/:id",(req,res)=>{
   const id = req.params.id;
   movies = movies.filter((movie)=>{
    if(movie.id !== id){
        return true;
    }
    return false;
   });
   
   res.send("movie is deleted");
   
    // const found = movies.find(movie=>movie.id==req.params.id);
    // if(found){
    //     const index = movies.indexOf(found);
    //     movies.splice(index,1);
    //     res.send("movie is deleted");
    // }
    // else{
    //     res.send("movie not found");
    // }
});

//update movie

app.put("/movie/:id",(req,res)=>{
    const found = movies.find(movie=>movie.id==req.params.id);
    if(found){
        const index = movies.indexOf(found);
        movies[index] = req.body;
        res.send("movie is updated");
    }
    else{
        res.send("movie not found");
    }
});



//set the server

app.listen(port,()=>console.log(`server listening at port ${port}`));