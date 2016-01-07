Template.toDoWeek.helpers({
    days: function () {
        var startDate = "";
        if (Session.get('startDate')) {
            startDate = Session.get('startDate');
        } else {
            var today = new Date();
            startDate = Helpers.parseADate(today);
        }

        var days = Helpers.getNextFive(startDate);
        return days;
    },
});
