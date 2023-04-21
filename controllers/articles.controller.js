
const  connection = require('../config/db')
const Joi = require('joi');

const createArticles = async (req ,res)=>{

    let message = null;
    let patch =null;

    // const [categorie] = await connection.query(`SELECT * FROM categories`);


    res.render('article/create.ejs',{
        error:{
            patch,message
        }
        // , categorie : categorie

    })
}

/******   get AllArticles      *****/

const getAllarticles = async (req, res) => {
    try {
        const [result] = await connection.query('SELECT * FROM articles');        
        res.render('article/index.ejs',{articles:result})
       
        
    } catch (error) {
        res.status(500).json({ //
            message:"server is down !"
        })
        
    }
}

/******   Save AllArticle      *****/


const saveArticle = async(req, res) => {
    console.log('ici')
    const schema = Joi.object({
                title:Joi.string().trim().min(3).max(70).required(),
                content:Joi.string().trim().alphanum().min(3).required(),
                // url:Joi.string().trim(),
                categorie_id:Joi.number().integer().positive().required(),
            })

        const {value , error} =  schema.validate(req.body);
        
        if(error){
            const {path, message} = error.details[0]

              return  res.render('article/create.ejs' ,{
                    error: {
                        path : path[0], message
                    }
                });
        }



    let { title, content, url, categorie_id } = value;

    
    try {
        const result = await connection.query("INSERT INTO articles (title, content, url, categorie_id) VALUES (?, ?, ?, ?)", [title, content, url, categorie_id]);        
        // res.send(result)

       res.redirect('/articles');
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }
}

/******   One Article      *****/

const oneArticle = async (req, res) => {
    const id = req.params.id;

    try {
        // const [result] = await connection.query(`SELECT * FROM article where id = ?`,[id] );
        const [result] = await connection.query(`SELECT * FROM articles WHERE id = ?`, [id]);
        if(result.length==0){
            return res.status(404).json({
                message : " is not found"
            })
        }
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }
}

/******   Put Article      *****/

const EditArticles = async (req, res) => { 

    let id = req.params.id
    // let { title, content, url, category_id } = req.body

    const [[data]] =  await connection.query(`SELECT * FROM articles where id = ?`,[id] )
    // const [categorie] = await connection.query(`SELECT * FROM categories`);


    let message = null;
    let patch =null;
    res.render('article/update.ejs',{
        article : data, 
        error:{
            patch,message
        }
    })
}

/******   Patch Article      *****/

const putArticles = async (req, res) => {

    let id = req.params.id

    const schema = Joi.object({
        title:Joi.string().uppercase().trim().alphanum().min(3).max(70).required(),
        content:Joi.string().trim().alphanum().min(3).required(),
        url:Joi.string().trim().alphanum(),
        categorie_id:Joi.number().integer().positive().required(),
    })

    const {value , error} =  schema.validate(req.body);

    if(error){
        const {path, message} = error.details[0]
        const [[data]] =  await connection.query(`SELECT * FROM articles where id = ?`,[id] )

        return  res.render('article/update.ejs' ,{
                error: {
                    path : path[0], message
                },
                article:data
            });
    }

    
    let { title, content, url, categorie_id } = req.body;


    try {
        const [result] = await connection.query("UPDATE articles SET title = IFNULL(?, title), content = IFNULL(?, content), url = IFNULL(?, url), categorie_id = IFNULL(?, categorie_id) WHERE id = ?", [title, content, url, categorie_id, id]);

        res.redirect('/articles')
            
         
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }

}
   
/******   Patch Article      *****/

const patchArticles = async (req, res) => {
let id = req.params.id
    // let{smartphone,description,category_id}=req.body; 
    let { title, content, url, categorie_id } = req.body;

    try {
        // const [result] = await connection.query("UPDATE article set smartphone =  IFNULL (?,smartphone) , description = IFNULL (?,description), category_id = IFNULL (?,category_id) where id = ?" ,[smartphone,description,category_id,id] );
        const [result] = await connection.query("UPDATE articles SET title = IFNULL(?, title), content = IFNULL(?, content), url = IFNULL(?, url), categorie_id = IFNULL(?, categorie_id) WHERE id = ?", [title, content, url, categorie_id, id]);

        if(result.affectedRows==0){
            return res.status(400).send({

                message : "bad ....."
            })
        }
            
        
        res.status(200).send(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }
}

/******   Delete Article      *****/

const deleteArticles = async (req, res) => {
    let id = req.params.id
        try {
            const [data] = await connection.query("DELETE FROM articles where id =?",[id] );
            // const [result] = await connection.query("DELETE FROM articles WHERE id = ?", [id]);


               return res.redirect('/articles');
            
        } catch (error) {
            res.status(500).json({
                message:"server is down !"
            })
            
        }
}

exports.getAllarticles = getAllarticles
exports.oneArticle = oneArticle
exports.putArticles = putArticles
exports.saveArticle =saveArticle
exports.patchArticles =patchArticles
exports.deleteArticles =deleteArticles
exports.createArticles =createArticles
exports.EditArticles =EditArticles