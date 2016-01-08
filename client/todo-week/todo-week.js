Template.toDoWeek.helpers({
    /**
     * @function
     * @summary Returns the days to display
     * @returns {Array} An array of strings representing the dates of the days to display
     */
    days: function () {
        var startDate = "";
        if (Session.get('startDate')) {
            startDate = Session.get('startDate');
        } else {
            // I'm calling it today, but really it's yesterday
            var today = (function(){this.setDate(this.getDate()-1); return this}).call(new Date);
            startDate = Helper.parseADate(today);
        }
        
        /* Validate the parameter */
        if (typeof startDate !== 'string') {
            throw Helper.Error('Unacceptable argument', 'I have decided on what we\'re going to start with, but it wasn\'t a string.');
        }

        var days = Helper.getNextFive(startDate);
        Session.set('daysVisible', days);
        return days;
    },
});
