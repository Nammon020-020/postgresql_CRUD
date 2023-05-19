const { query } = require('express')
const pool = require('../db')

exports.ListAllUser = async (req,res) => {
    try{
        pool.query('SELECT * FROM users',(error,results) =>{
        if(!error){
            return res.status(200).send({
                data: results.rows,
                massage: "Success to get data",
                success: true
            })
        }
        else{
            return res.status(500).send({
                error: error,
                massage: "Fail to get data",
                success: false
            })
        }
       })
    }
    catch(error) {
        return res.status(500).send({
            error: error,
            massage: "Server error",
            success: false
        })
    }
}

exports.ListUserById = async (req,res) => {
    try{
        let id = req.params.id
        pool.query(`SELECT * FROM users WHERE user_id = ${id}`,(error,results)=>{
            if(!error){
                return res.status(200).send({
                    data: results.rows[0],
                    massage: "Success to get data",
                    success: true
                })
            }
            else{
                return res.status(500).send({
                    error: error,
                    massage: "Fail to get data",
                    success: false
                })
            }
        })
    }
    catch(error){
        return res.status(500).send({
            error: error,
            massage: "Server error",
            success: false
        })
    }
}

exports.AddUser = async (req,res) => {
    try{
        let {username,password,first_name,last_name,gender,email} = req.body
        let AddQuery = `INSERT INTO users (username,password,first_name,last_name,gender,email) 
        VALUES ($1,$2, $3, $4, $5, $6)`
        pool.query(AddQuery,[username,password,first_name,last_name,gender,email],(error,results)=>{
            if(!error){
                return res.status(201).send({
                    data: results.rows,
                    massage: "Create success",
                    success: true
            })}else{
                console.log(error)
                return res.status(500).send({
                    error: error,
                    massage: "Create Fail",
                    success: false
            })
            }
        })
    }
    catch(error){
        return res.status(500).send({
            error: error,
            massage: "Server error",
            success: false
        })
    }
}

exports.UpdateUser = async (req,res) => {
    try{
        let id = req.params.id
        let {username,password,first_name,last_name,gender,email} = req.body
        let queryFind = `SELECT username,password,first_name,last_name,gender,email FROM users WHERE user_id = ${id}`;
        let user = await pool.query(queryFind);
        let reqArr = [username,password,first_name,last_name,gender,email]
        let userArr = []
        for(let key in user.rows[0]){
            userArr.push(user.rows[0][key])
        }
        let newReqArr = reqArr.map((item,index)=>{
            return item == undefined ? userArr[index] : item
        })
        let queryUpdate = `UPDATE users 
                            SET username=$1 ,password=$2 ,first_name=$3 ,last_name=$4 ,gender= $5 ,email= $6 
                            WHERE user_id = ${id}`;
        pool.query(queryUpdate,newReqArr, async (error,_)=>{
            if(!error){
                let queryShowUpdate = `SELECT * FROM users WHERE user_id = $1`
                let users = await pool.query(queryShowUpdate,[id])
                return res.status(200).send({
                    data: users.rows[0],
                    massage: "Update success",
                    success: true
                })
            }else{
                return res.status(500).send({
                    error: error,
                    massage: "Update fail",
                    success: true
                })
            }
        })
    }
    catch (error){
        return res.status(500).send({
            error: error,
            massage: "Server error",
            success: true
        })
    }
}
exports.DeleteUser = async(req,res) => {
    try{
        let id = req.params.id
        let queryDelete = `DELETE FROM users WHERE user_id = $1`
        queryFind = `SELECT * FROM users`
        pool.query(queryDelete,[id], async (error,_)=>{
            if(!error){
                let users = await pool.query(queryFind)
                return res.status(200).send({
                    data:users.rows,
                    massage:"Delete success",
                    success: true
                })
            }else{
                return res.status(400).send({
                    error: error,
                    massage: "Delete fail",
                    success: false,
                })
            }
        })
    }
    catch (error){
        return res.status(500).send({
            error : error,
            massage: "Server Error",
            success:false
        })
    }
}

exports.AddColumn = async(req,res)=>{
    let {tbName,columnName,datatype} = req.body
    queryAddCol = `ALTER TABLE`
}