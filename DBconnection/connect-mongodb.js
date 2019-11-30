var mongoose = require("mongoose");
function connectToDB(callback) {
    var mongodb_response = {
        status: null,
        statusText: null,
        failedReason: null

    };
    mongoose.connect('mongodb+srv://captivators:admin@cluster0-no1r4.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
        .then(function () {
            mongodb_response.status="success";
            mongodb_response.statusText="successfully connected to db";
            console.log("---------------------DB Connected------------------------");
            callback(mongodb_response);
        })
        .catch(function (error) {
            mongodb_response.status="Failed";
            mongodb_response.statusText="Failed to connect to db";
        mongodb_response.failedReason=error;
        console.log("---------------------DB Connection Failed------------------------");
        callback(mongodb_response);

        });

}

module.exports.connectToDB=connectToDB;




