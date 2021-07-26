var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("search", {page:"home"});
})

// Search The Movie Database  using their API function
app.get("/results", function(req, res){
    var query = req.query.search;
    var apiKey = "ff0a38497fe407668201c3633ebc60f0";
    var flag = "&query="
    var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + flag + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data, page: "results", query: query});
        }    
    });
});


// Pulls information from my favorite movie list on The Movie Database
app.get("/favorites", function(req, res){
    var query = req.query.search;
    var apiKey = "ff0a38497fe407668201c3633ebc60f0";
    var flag = "&query="
    var url = "https://api.themoviedb.org/4/list/44714?page=1&api_key=" + apiKey;
    var data = {};
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            data = JSON.parse(body);
            res.render("favorites", {data: data, page: "favorites"});
        }    
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})