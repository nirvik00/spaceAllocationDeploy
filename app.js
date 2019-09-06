const express=require('express');
const exphbs=require('express-handlebars');
const app=express();

process.env.PWD=process.cwd();
app.use('/public', express.static(process.env.PWD+'/public'));

app.engine('handlebars', exphbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

app.get('/',(req, res)=>{
    res.render("Index");
});

var port=5000 || process.env.PORT;
app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
});