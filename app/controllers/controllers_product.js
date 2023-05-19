// const pool = require('../db')
// const Product = require('../models/productsModel')
// const fs = require('fs')
// const upload_product = require('../public/javascript/productImgUploader')
// ////Product Handle
// exports.GetProduct = async (req,res) =>{
//     try{
//         pool.query("SELECT")
//     }catch(error){
//         return res.status(500).send({
//             data: error,
//             massage: "server error",
//             success: false
//         })
//     }
// }

// exports.GetProductById = async (req,res) => {
//     try{
//         let id = req.params.id
//         let product = await Product.findById(id)
//         return res.status(200).send({
//             data: product,
//             massage : "Read success",
//             success : true

//         })
//     }
//     catch(error){
//         return res.status(500).send({
//             massage : "Server error",
//             success: false
//         })

//     }
// }

// exports.AddProduct = async (req,res) => {
//     try{
//         let {product_name,amount,price,detail} = req.body
//         let p_image = "null"
//         if(req.file){
//             console.log(typeof req.file)
//             p_image = req.file.filename
//             upload_product.single('img_file')
//         }
//         let newProduct = new Product({
//             product_name,
//             amount,
//             price,
//             detail,
//             product_image: p_image
//         })
//         await newProduct.save()
//         return res.status(200).send({
//             data: newProduct,
//             massage : "Create success",
//             success : true

//         })
//     }
//     catch(error){
//         return res.status(500).send({
//             error : error,
//             massage : "Server error",
//             success : false

//         })
//     }
// } 

// exports.UpdateProduct = async (req,res) => {
//     try{
//         let id = req.params.id
//         let {product_name,amount,price,detail} = req.body
//         if(!mongoose.Types.ObjectId.isValid(id)){
//             return res.status(400).send({
//                 massage:"Id Invalid",
//                 success: false,
//                 error:["Id is not a ObjectId"]
//             })
//         }
//         let product = await Product.findById(id)
//         let p_image = product.product_image
//         if(req.file){
//             let old_p_name = p_image
//             console.log(`${__dirname} Image name ${old_p_name}`)
//             if(old_p_name != "null"){
//                 fs.unlinkSync(`./api/public/images/product/${old_p_name}`)
//             }
//             p_image = req.file.filename
//             upload_product.single('img_file')
//         }
//         let updateProduct = await Product.findByIdAndUpdate(id,
//             {
//                 product_name,
//                 amount,
//                 price,
//                 detail,
//                 product_image: p_image
//             }
//         )
//         product = await Product.findById(id)
//         return res.status(200).send(
//             {
//                 massage: "success",
//                 success: true
//             }
//         )
//     }
//     catch(error){
//         return res.status(500).send(
//             {
//                 error : error,
//                 massage: "Server error",
//                 success: false
//             }
//         )
//     }
// }