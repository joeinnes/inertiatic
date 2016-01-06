Template.toDoWeek.helpers({
    days: function () {
        var startDate = "";
        if (Session.get('startDate')) {
            startDate = Session.get('startDate');
        } else {
            var today = new Date();
            startDate = parseADate(today);
        }

        var days = getNextFive(startDate);
        return days;

        function parseADate(date) {
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
        }


        function dayToDayString(day) {
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
        }
    }
});
