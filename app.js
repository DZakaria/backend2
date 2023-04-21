const express = require('express');
const courseRoutes = require('./routes/courses.routes')
const categoriesRoutes = require('./routes/categories.routes')
const articlesRoutes = require('./routes/articles.routes')


const app = express();
const bodyParser = require('body-parser')



app.use(express.static('public'))


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
 
app.set('view engine','ejs')
app.set('views', 'template')  // veux dire a la place de chercher le dossier views il cherche le dossier template
app.use(courseRoutes)
app.use(categoriesRoutes)

app.use(articlesRoutes)

// let title = "new formation about Mean Stack"



// app.get('/', (req, res) => res.render("index.ejs",{
//     MyTitle:title
// }))

app.listen(5000, () => {
    console.log("The serve is running")
})  

