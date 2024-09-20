const app = express();

app.get('/', (req,res)=>{
    res.send("Server is running.")
})

app.listen(4000, ()=>{
    console.log("Server is runnig on port 4000");
    
})