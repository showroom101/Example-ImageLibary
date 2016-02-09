(function() {
    Date.prototype.addHours = function (h) {
        this.setHours(this.getHours() + h);
        return this;
    };
    app.filter('DateTrick', function () {
        return function (input) {
            if (input !== null) {
                var DateCal = input.addHours(7);
                return DateCal;
            } else {
                return {};
            }
        }
    });

    app.filter('thaiDate', function () {
        return function (val) {
            if (val != undefined) {
                var d = new Date(val);
            } else
            {
                var d = new Date();
            }
            
            var month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
            var res = d.getDate() + " " + month[d.getMonth()] + " " + (d.getFullYear() + 543);
            return res;
        }
    });

    app.filter('thaiMount', function () {
        return function (val) {
            if (val != undefined) {
                var d = new Date(val);
            } else
            {
                var d = new Date();
            }
            
            var month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
            var res = month[d.getMonth()] + " " + (d.getFullYear() + 543);
            return res;
        }
    });
})();