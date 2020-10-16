const path = require("path");
const fs = require("fs");

module.exports = function (app){

    id = 0;

    app.get("/api/notes", function(req, res){
        
        let notes = fs.readFile("./db/db.json", "utf-8", function(err, data){
            if(err){
                return console.log(err);
            }
            res.json(JSON.parse(data));
        })

    });

    app.post("/api/notes", function(req, res){
        var note = req.body;
        let notes = fs.readFile("./db/db.json", "utf-8", function(err, data){
            if(err){
                return console.log(err);
            }
            let notes = JSON.parse(data);
            if (notes.length > 0) {
                note.id = notes.length;
                for (let i = 0; i < notes.length; i++) {
                    if (note.id <= notes[i].id) note.id = notes[i].id + 1;
                }
                notes.push(note);
            } else {
                note.id = 1;
                notes = Array(note);
            }
            fs.writeFile("./db/db.json", JSON.stringify(notes), "utf-8", err => null);

        })
        res.json(null);
    });
    
    app.delete("/api/notes/:id", function(req, res){
        let notes = fs.readFile("./db/db.json", "utf-8", function(err, data){
            if(err){
                return console.log(err);
            }
            let notes = JSON.parse(data);
            notes = notes.filter(i => i.id != req.params.id);
            fs.writeFile("./db/db.json", JSON.stringify(notes), "utf-8", err => null);
        })
        res.json(null);
    });


        app.get("/assets/js/index.js", function(req, res){
            res.sendFile(path.join(__dirname + "/../public/assets/js/index.js"));
        });
        
        app.get("/assets/css/styles.css", function(req, res){
            res.sendFile(path.join(__dirname + "/../public/assets/css/styles.css"));
        });
}