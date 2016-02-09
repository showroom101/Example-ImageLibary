var CG = require('./CG');
var DB = require('./DB');

var singleton = function singleton() {

    var sampleModel = {};

    CG.getMongoCon(function (conn) {
        sampleModel = conn.model('findnamedb', DB.sampleSchema);
        adwordsModel = conn.model('adwordspends', DB.adwordspend);
    });

    this.sampleModel = sampleModel;
    this.adwordsModel = adwordsModel;
};

singleton.instance = null;
singleton.getInstance = function(){
    if(this.instance === null){
        this.instance = new singleton();
    }
    return this.instance;
};

module.exports = singleton.getInstance();