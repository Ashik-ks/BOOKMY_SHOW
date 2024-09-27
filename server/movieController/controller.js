let Movies =require('../db/model/model')
let Category = require('../db/model/category');
let language = require('../db/model/language');
const {success_function,error_function} = require('../utils/responsehandler');
const { response, query } = require('express');
const fileUpload = require('../utils/file-upload').fileUpload

exports.Addmovie = async function (req, res) {
    try {
        let body = req.body;
        console.log("body : ", body);

        let Category_Collection = await Category.findOne({category : body.category});
        console.log("Category_Collection : ",Category_Collection);

        let category_id = Category_Collection._id;
        console.log("category_id : ",category_id);

        body.category = category_id;

        let language_Collection = await language.findOne({language : body.language});
        console.log("language_Collection : ",language_Collection);

        let language_id = language_Collection._id;
        console.log("language_id : ",language_id);

        body.language = language_id;

        let image = body.image;
        console.log("image : ",image)

//         if(image){
//             let img_path = await fileUpload(image,"movie");
//             console.log("img_path",img_path);
//             body.image = img_path
//         }

//         validation
//         let count = await Movies.countDocuments({ name });
//         console.log("count : ", count);

//         if (count > 0) {
//             let response = error_function({
//                 statusCode: 400,
//                 message: "User already exists",
//             });

//             res.status(response.statusCode).send(response);
//             return
//         }

        let Add_Movie = await Movies.create(body);
        console.log("Add_Movie : ", Add_Movie)

        if (Add_Movie) {

            let response = {
                success: true,
                statuscode: 200,
                message: "Movie added succesfully",
            }
            res.status(response.statuscode).send(response);
            return;
        } else {
            let response = {
                success: false,
                statuscode: 400,
                message: "Movie not added",
            }
            res.status(response.statuscode).send(response);
        }

    } catch (error) {
        console.log("error : ", error)
        let response = {
            success: false,
            statuscode: 400,
            message: "Movie not added",
        }
        res.status(response.statuscode).send(response);
    }
}

exports.Getmovie = async function (req,res) {
    try {
        
        let Movie_Data = await Movies.find().populate("category").populate("language");
        console.log("Movie_Data : ",Movie_Data);

        let response = {
            success : true,
            statuscode : 200,
            message : "Movie Getted Succesfully",
            data :  Movie_Data,
        }
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        console.log("error : ",error)
        let response = {
            success : false,
            statuscode : 400,
            message : "Movie not Getting",
        }
        res.status(response.statuscode).send(response);
    }
}

exports.Moviefilter = async function (req,res) {
    
    let filter = req.query
    console.log("filter : ",filter);


    if(filter.category) {
        try {
        
            let category = req.query.category;
            console.log("category : ",category);
    
            let category_Field = await Category.findOne({category : filter.category});
            console.log("category_Field :" ,category_Field);
    
            let category_id = category_Field._id;
            console.log("category_id : ",category_id);
    
            let categorized_movie = await Movies.find({category : category_id}).populate("category");
             let response = success_function ({
                statusCode : 200,
                data : categorized_movie
    
             })
             res.status(response.statuscode).send(response);
    
             return;
    
    
        } catch (error) {
            console.log("error : ",error)
            let response = {
                success : false,
                statuscode : 400,
                message : "Movie not Getting",
            }
            res.status(response.statuscode).send(response);
        }
    }else if(filter.language && filter.category){

        try {
            let language = req.query.language;

            let language_Field = await language.findOne({ language});
            console.log("language_Field :", language_Field);

            let language_id = language_Field._id;
            console.log("language_id : ", language_id);


            let category = req.query.category;

            let category_Field = await category.findOne({ category });
            console.log("category_Field :", category_Field);

            let category_id = category_Field._id;
            console.log("category_id : ", category_id);

            let both_movie = await Movies.find({ language: language_id } && { category: category_id }).populate("language");
            let response = success_function({
                statusCode: 200,
                data: both_movie

            })
            res.status(response.statuscode).send(response);

            return;
        } catch (error) {
            console.log("error : ", error)
            let response = {
                success: false,
                statuscode: 400,
                message: "Movie not Getting",
            }
            res.status(response.statuscode).send(response);
        }
    }else if(filter.language) {
        try {
        
            let languages = req.query.language;
            console.log("languages : ",languages);
    
            let language_Field = await language.findOne({language : languages});
            console.log("language_Field :" ,language_Field);
    
            let language_id = language_Field._id;
            console.log("language_id : ",language_id);
    
            let categorized_movie = await Movies.find({language : language_id}).populate("language");
             let response = success_function ({
                statusCode : 200,
                data : categorized_movie
    
             })
             res.status(response.statuscode).send(response);
    
             return;
    
    
        } catch (error) {
            console.log("error : ",error)
            let response = {
                success : false,
                statuscode : 400,
                message : "Movie not Getting",
            }
            res.status(response.statuscode).send(response);
        }
    }
}

exports.GetSinglemovie = async function (req,res) {
    try {
        
        let _id = req.params.id;
        console.log("_id : ",_id);
        
        let Single_MovieData = await Movies.find({_id });
        console.log("SingleMovieData : ",Single_MovieData)

        let response = {
            success : true,
            statuscode : 200,
            message : "Single Movie Getted Succesfully",
            data :  Single_MovieData,
        }
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        console.log("error : ",error)
        let response = {
            success : false,
            statuscode : 400,
            message : "Movie not Getting",
        }
        res.status(response.statuscode).send(response);
    }
}

exports.Updatemovie = async function (req,res) {
   try {

    let body = req.body;
    console.log("body : ",body);

    let _id = req.params.id;
    console.log("_id : ",_id);

    let Category_Collection = await Category.findOne({category : body.category});
        console.log("Category_Collection : ",Category_Collection);

        let category_id = Category_Collection._id;
        console.log("category_id : ",category_id);

        body.category = category_id;

        let language_Collection = await language.findOne({language : body.language});
        console.log("language_Collection : ",language_Collection);

        let language_id = language_Collection._id;
        console.log("language_id : ",language_id);

        body.language = language_id;

    let Update_Movie = await Movies.updateOne({_id} , {$set : body});
    console.log("Update_Movie : ",Update_Movie);

    let response = {
        success : true,
        statuscode : 200,
        message : "Movie Updated Succesfully",
        data :  Update_Movie,
    }
    res.status(response.statuscode).send(response);
    return;

   } catch (error) {
    console.log("error : ",error)
        let response = {
            success : false,
            statuscode : 400,
            message : "Movie Updation Failed",
        }
        res.status(response.statuscode).send(response);
   }
}

exports.Deletemovie = async function (req,res) {
    try {
        
        let _id = req.params.id;
        console.log("_id : ",_id);

        let Delete_Movie = await Movies.deleteOne({_id});
        console.log("Delete_Movie : ",Delete_Movie);

        let response = {
            success : true,
            statuscode : 200,
            message : "Movie Deleted Succesfully",
            data :  Delete_Movie,
        }
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        console.log("error : ",error)
        let response = {
            success : false,
            statuscode : 400,
            message : "Movie Deletion Failed",
        }
        res.status(response.statuscode).send(response);
    }
}