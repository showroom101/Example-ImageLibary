var mongoose        = require('mongoose');
var winston         = require('winston');
var mysql           = require('mysql');
var nodemailer      = require('nodemailer');
var smtpTransport   = require('nodemailer-smtp-transport');

var configMongo     = {
    host : 'localhost',
    port : '27017',
    db   : 'myServer'
};
var mongoOptions    = {
    server: { poolSize: 10 }
};

var configMySQL     = {
    connectionLimit: 50,
    host: 'localhost:9090',
    user: 'root',
    password: '',
    database: '',
    charset : 'utf8'
};


var transporter = nodemailer.createTransport(smtpTransport({
    //host: 'smtp.mandrillapp.com',
    //port: 587,
    //auth: {
    //    user: 'worawut@theiconweb.com',
    //    pass: 'R6K_9ZABVLuqIxtfQPstEQ'
    //}
    host: 'smtp.mailchannels.net',
    port: 25,
    auth: {
        user: 'itopplus',
        pass: 'myprBkhmCJAUTHebh0coLKME'
    }
}));

var singleton = function singleton() {
    this.limitPagination = 10;

    var logger = new (winston.Logger)({
        transports: [
            new winston.transports.File({
                level: 'error',
                filename: './logs/error.xml',
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            }),
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true
            })
        ],
        exitOnError: false
    });
    this.logger = logger;


    //=============== Mongo DB Connection ============
    var uri = 'mongodb://' + configMongo.host + ':' + configMongo.port + '/' + configMongo.db;
    var db = mongoose.createConnection(uri, mongoOptions);
    db.on('open', function callback() {
        logger.info("getMongoCon connected successfully");
    });
    db.on('error', function (err) {
        logger.error("DBERROR:" + err);
    });
    this.getMongoCon = function (cb) {
        cb(db);
    };

    //=============== MySQL Connection MySql ============
    // var poolMySQL = mysql.createPool(configMySQL);
    // this.getConnectionMySQL = poolMySQL;


    this.CheckPermissionCase = function (session,typecase) {
        var bAccess = false;
        if(!session.body.authen){
            if(session.session.username=='true' && session.session.password=='true' && session.session.permission.length!=0) {
                session.session.permission.forEach(function (data, index) {
                    if (data.name == typecase.name) {
                        bAccess = true;
                    }
                });
            }
        }else
        {
            bAccess = true;
        }
        return bAccess;
    };

    this.SendMail = function(to,MailHTML,callback){
        var mailOptions = {
            from: "no-reply@itopplus.com", // sender address
            //from: 'pichai@theiconweb.com', // sender address
            to: to, // list of receivers
            subject: 'Username และ Password สำหรับเข้าใช้งาน iTopplusDashboard', // Subject line
            html: MailHTML // html body
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                callback("Error");
            }
            else {
                callback("Success");
            }
        });
    }

};

singleton.instance = null;
singleton.getInstance = function(){
    if(this.instance === null){
        this.instance = new singleton();
    }
    return this.instance;
};

module.exports = singleton.getInstance();