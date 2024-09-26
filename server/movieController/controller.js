let Movies =require('../db/model/model')
const {success_function,error_function} = require('../utils/responsehandler');

exports.Addmovie = async function (req, res) {
    try {
        let body = req.body;
        console.log("body : ", body);

        let name = body.name;
        console.log("name : ", name);

        //validation
        let count = await Movies.countDocuments({ name });
        console.log("count : ", count);

        if (count > 0) {
            let response = error_function({
                statusCode: 400,
                message: "User already exists",
            });

            res.status(response.statusCode).send(response);
            return
        }

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
        
        let Movie_Data = await Movies.find();
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