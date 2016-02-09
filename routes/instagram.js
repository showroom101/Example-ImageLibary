var express     = require('express');
var router      = express.Router();
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var DB          = require('../DB');
var CG          = require('../CG');
var async       = require('async');
var moment      = require('moment');
var unirest     = require('unirest');
var schedule    = require('node-schedule');
var _           = require('underscore');
var fs          = require('fs')
  , gm          = require('gm')

var instagramModel;
CG.getMongoCon(function (conn) {
    var db = conn;
    instagramModel = db.model('instagram',DB.instagram);
});

// schedule 
var backupdashboard = schedule.scheduleJob({hour: 00, minute: 00},function(){
    var req     = {};
    req.body    = {};
    router.backupdashboardMT(req, function(cb){
        console.log("---- backupdashboard Success ----");
        console.log("this time : ", new Date());
        console.log("---------------------------------");
    });
});

router.backupdashboardMT = function(req, cb) {
    cb();
};

router.get('/:filter/:width/:height/:bwater/:x/:y/:w/:h', function(req, res, next) {

    var image = "C:\\project\\boy_fileserver\\public\\images\\watermark_removed.jpg";
    var water = "C:\\project\\boy_fileserver\\public\\images\\Sample-trans.png";
    var param = req.params.x + "," + req.params.y + "," + req.params.w + "," +req.params.h + " ";


    var graphicsmagick = gm(image);
    if(req.params.width != "0" && req.params.height == "0")
    {
        graphicsmagick.resize(Number(req.params.width));
    }else if(req.params.width == "0" && req.params.height != "0")
    {
        graphicsmagick.resize(null, Number(req.params.height));
    }else if(req.params.width != "0" && req.params.height != "0")
    {
        graphicsmagick.resize(Number(req.params.width), Number(req.params.height), "!");
    }

    if((req.params.bwater.toLowerCase()) && (req.params.bwater.toLowerCase() == "true")){
        graphicsmagick.draw(['image Over ' + param  + water]);
    }
    

    switch(req.params.filter){
        case "equalize" : //
            graphicsmagick
            .equalize(); 
            break;
        case "blur" : 
            graphicsmagick
            .blur(30, 20); 
            break;
        case "implode" : 
            graphicsmagick
            .implode(-1.2); 
            break;
        case "contrast" : //
            graphicsmagick
            .contrast(-6);          
            break;
        case "colorize" : 
            graphicsmagick
            .colorize(200, 200, 256); 
            break;
        case "sepia"    : //
            graphicsmagick
            .sepia();
            break;
        case "region"   : 
            graphicsmagick
            .region(101, 112, 90, 87)
            .swirl(200);
        break;
        case "flip"     : 
            graphicsmagick
            .flip()
            .rotate('green')
            .edge(3);
        break;
    }
    
    // .fill('#FFFFFF')
    // .fontSize( '100px' )
    // .draw(['text 0, 0, "from scratch"'])
    
     graphicsmagick


    .font("Arial")
    .fontSize(27)
    .fill("#000000")
    .drawText(1, 27, "Hello Wold", 'North')
    .fill("#ffffff")
    .drawText(0, 27, "Hello Wold", 'North')
    //.gravity("center")
    //.modulate(85, 80)
    //.colorize(200, 155, 255)
    //.gamma(0.8)
    
    // .autoOrient()
    // .quality(100)
    .stream(function (err, streamOut, streamErr) {
        if (!err) {
            console.log("READ IMAGE END")
            streamOut.pipe(res);
        }else
        {
            console.log("ERROR GM")
            res.end(err);
        }
    });
});;


module.exports = router;
