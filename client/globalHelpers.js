Helpers = {
    'parseADate': function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (("" + month).length < 2) {
            month = "0" + month;
        } else {
            month = "" + month;
        }
        if (("" + day).length < 2) {
            day = "0" + day;
        } else {
            day = "" + day;
        }
        return year + "-" + month + "-" + day;
    },
    'dateToDayString': function (day) {
        switch (day) {
            case 0:
                return "Sunday";
                break;
            case 1:
                return "Monday";
                break;
            case 2:
                return "Tuesday";
                break;
            case 3:
                return "Wednesday";
                break;
            case 4:
                return "Thursday";
                break;
            case 5:
                return "Friday";
                break;
            case 6:
                return "Saturday";
                break;
            default:
                return "Something went wrong...";
                console.error('Couldn\'t find a day of the week for this');
                break;
        }
    },
    'getNextFive': function (date) {
        console.log(date);
        var start = new Date(date);
        var allDates = [Helpers.parseADate(start)];
        for (var i = 0; i < 4; i++) {
            allDates.push(Helpers.parseADate(new Date(start.setDate(start.getDate() + 1))));
        }
        return allDates;
    },
    'dateFormat': function(date) {
        // var format = 'DD/MM/YYYY'; format will be user defined in future.
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (("" + month).length < 2) {
            month = "0" + month;
        } else {
            month = "" + month;
        }
        if (("" + day).length < 2) {
            day = "0" + day;
        } else {
            day = "" + day;
        }
        return day + "/" + month + "/" + year;  
    }
};