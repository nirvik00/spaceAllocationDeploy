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
    res.render("index");
});

const port=process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
});