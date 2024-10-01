let Movies = require('../db/model/model')
let Category = require('../db/model/category');
let language = require('../db/model/language');
const { success_function, error_function } = require('../utils/responsehandler');
const { response, query } = require('express');
const fileUpload = require('../utils/file-upload').fileUpload

exports.Addmovie = async function (req, res) {
    try {
        let body = req.body;
        console.log("body : ", body);

        let Category_Collection = await Category.findOne({ category: body.category });
        console.log("Category_Collection : ", Category_Collection);

        let category_id = Category_Collection._id;
        console.log("category_id : ", category_id);

        body.category = category_id;

        let language_Collection = await language.findOne({ language: body.language });
        console.log("language_Collection : ", language_Collection);

        let language_id = language_Collection._id;
        console.log("language_id : ", language_id);

        body.language = language_id;

        let image = body.image;
        console.log("image : ", image)

        let bgimage = body.bgimage;
        console.log("bgimage : ",bgimage)

        if (image) {
            let img_path = await fileUpload(image, "movie");
            console.log("img_path", img_path);
            body.image = img_path
        }
        if (bgimage) {
            let img_path = await fileUpload(bgimage, "movie");
            console.log("img_path1", img_path);
            body.bgimage = img_path
        }

        let name = body.name;

        //validation
        let count = await Movies.countDocuments({ name });
        console.log("count : ", count);

        if (count > 0) {
            let response = error_function({
                statusCode: 400,
                message: "User already exists",
            });

            res.status(response.statuscode).send(response);
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

exports.Getmovie = async function (req, res) {
    try {

        let category = req.query.category;
        let language = req.query.language;

        let filterArr = [];

        if(category){
            filterArr.push({category})
            console.log("category :",category)
        }

        if(language){
            filterArr.push({language})
        }
        console.log("filterArr : ",filterArr)

        let Movie_Data = await Movies.find(filterArr.length > 0 ? {$and : filterArr} : {}).populate("category").populate("language");
        console.log("Movie_Data : ", Movie_Data);

        let response = {
            success: true,
            statuscode: 200,
            message: "Movie Getted Succesfully",
            data: Movie_Data,
        }
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
}

exports.GetSinglemovie = async function (req, res) {
    try {

        let _id = req.params.id;
        console.log("_id : ", _id);

        let Single_MovieData = await Movies.find({ _id }).populate("category").populate("language");
        console.log("SingleMovieData : ", Single_MovieData)

        let response = {
            success: true,
            statuscode: 200,
            message: "Single Movie Getted Succesfully",
            data: Single_MovieData,
        }
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
        return;
    }
}

exports.Updatemovie = async function (req, res) {
    try {

        let body = req.body;
        console.log("body : ", body);

        let _id = req.params.id;
        console.log("_id : ", _id);

        let Category_Collection = await Category.findOne({ category: body.category }).populate("category");
        console.log("Category_Collection : ", Category_Collection);

        let category_id = Category_Collection._id;
        console.log("category_id : ", category_id);

        body.category = category_id;

        let language_Collection = await language.findOne({ language: body.language }).populate("language");
        console.log("language_Collection : ", language_Collection);

        let language_id = language_Collection._id;
        console.log("language_id : ", language_id);

        body.language = language_id;

        let image = body.image;
        console.log("image :", image);

        let bgimage = body.bgimage;
        console.log("bgimage :", bgimage);

        const regexp = /^data:/;
        const result = regexp.test(image);
        console.log("result : ", result);

        const regexp1 = /^data:/;
        const result1 = regexp1.test(bgimage);
        console.log("result1 : ", result1);

        if (result === true) {

            let img_path = await fileUpload(image, "movie");
            console.log("img_path", img_path);
            body.image = img_path
        }

        if (result1 === true) {

            let img_path = await fileUpload(bgimage, "movie");
            console.log("img_path", img_path);
            body.bgimage = img_path
        }

        let Update_Movie = await Movies.updateOne({ _id }, { $set: body });
        console.log("Update_Movie : ", Update_Movie);

        let response = {
            success: true,
            statuscode: 200,
            message: "Movie Updated Succesfully",
            data: Update_Movie,
        }
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        console.log("error : ", error)
        let response = {
            success: false,
            statuscode: 400,
            message: "Movie Updation Failed",
        }
        res.status(response.statuscode).send(response);
    }
}

exports.Deletemovie = async function (req, res) {
    try {

        let _id = req.params.id;
        console.log("_id : ", _id);

        let Delete_Movie = await Movies.deleteOne({ _id });
        console.log("Delete_Movie : ", Delete_Movie);

        let response = {
            success: true,
            statuscode: 200,
            message: "Movie Deleted Succesfully",
            data: Delete_Movie,
        }
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        console.log("error : ", error)
        let response = {
            success: false,
            statuscode: 400,
            message: "Movie Deletion Failed",
        }
        res.status(response.statuscode).send(response);
    }
}

exports.Getcategories = async function (req, res) {

    try {
        let categories = await Category.find();

        let response = {
            success: true,
            statuscode: 200,
            message: "Movie categories Getted Succesfully",
            data: categories,
        }
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
}

exports.Getlanguages = async function (req, res) {
    try {
        let languages = await language.find();

        let response = success_function({
            success: true,
            statusCode: 200,
            message: "Movie languages getted",
            data: languages
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
}

