Template.toDoWeek.helpers({
    days: function () {
        var startDate = "";
        if (Session.get('startDate')) {
            startDate = new Date(Session.get('startDate'));
        } else {
            var today = new Date();
            startDate = Helpers.parseADate(today);
        }

        var days = Helpers.getNextFive(startDate);
        Session.set('daysVisible', days);
        return days;
    },
});
