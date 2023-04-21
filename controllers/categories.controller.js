


const  connection = require('../config/db')

const getAllCategories = async (req, res) => {

    try {
        const [result] = await connection.query('SELECT * FROM categories ');
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }
}


const saveCategories = async(req, res) => {
    let{type}=req.body; 
    
    try {
        const result = await connection.query('INSERT INTO categories (type) VALUES (?,?) ',[type] );
        
            
        
        res.send(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }
}

const oneCategorie = async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await connection.query(`SELECT * FROM categories where id = ?`,[id] );
        if(result.length==0){
            return res.status(404).json({
                message : "course is not found"
            })
        }
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }
}


const putCategories = async (req, res) => {
    let id = req.params.id
    let{type}=req.body; 
    if(type ==''){
        return res.status(400).send({

            message : "bad requeqt"
        })
    

    }
    try {
        const [result] = await connection.query("UPDATE categories set type = ? where id = ?" ,[type,id] );
        if(result.affectedRows==0){
            return res.status(400).send({

                message : "bad requeqt"
            })
        }
            
        
        res.status(200).send(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }
}
   

const patchCategories = async (req, res) => {
let id = req.params.id
    let{type}=req.body; 
    
    try {
        const [result] = await connection.query("UPDATE categories set type =  IFNULL (?,type)  where id = ?" ,[type,id] );
        if(result.affectedRows==0){
            return res.status(400).send({

                message : "bad requeqt"
            })
        }
            
        
        res.status(200).send(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }
}

const deleteCategories = async (req, res) => {
    let id = req.params.id
        
        
        try {
            const [result] = await connection.query("DELETE FROM categories where id =?",[id] );
            if(result.affectedRows==0){
                return res.status(404).send({
    
                    message : "object not found"
                })
            }
                
            
            res.status(200).send(result)
            
        } catch (error) {
            res.status(500).json({
                message:"server is down !"
            })
            
        }
    }

exports.getAllCategories = getAllCategories
exports.oneCategorie = oneCategorie
exports.putCategories = putCategories
exports.saveCategories =saveCategories
exports.patchCategories =patchCategories
exports.deleteCategories =deleteCategories