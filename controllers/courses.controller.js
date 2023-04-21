


const  connection = require('../config/db')

const getAllCourses = async (req, res) => {

    try {
        const [result] = await connection.query('SELECT * FROM courses ');
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }
}


const saveCourse = async(req, res) => {
    let{title,content}=req.body; 
    
    try {
        const result = await connection.query('INSERT INTO courses (title,content) VALUES (?,?) ',[title,content] );
        
            
        
        res.send(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }
}

const oneCourse = async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await connection.query(`SELECT * FROM courses where id = ?`,[id] );
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


const putCourse = async (req, res) => {
    let id = req.params.id
    let{title,content}=req.body; 
    if(title ==''|| content ==''){
        return res.status(400).send({

            message : "bad requeqt"
        })
    

    }
    try {
        const [result] = await connection.query("UPDATE courses set title = ?, content = ? where id = ?" ,[title,content,id] );
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
   

const patchCourse = async (req, res) => {
let id = req.params.id
    let{title,content}=req.body; 
    
    try {
        const [result] = await connection.query("UPDATE courses set title =  IFNULL (?,title) ,content = IFNULL (?,content) where id = ?" ,[title,content,id] );
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

const deleteCourse = async (req, res) => {
    let id = req.params.id
        
        
        try {
            const [result] = await connection.query("DELETE FROM courses where id =?",[id] );
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

exports.getAllCourses = getAllCourses
exports.oneCourse = oneCourse
exports.putCourse = putCourse
exports.saveCourse =saveCourse
exports.patchCourse =patchCourse
exports.deleteCourse =deleteCourse