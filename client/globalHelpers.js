/**
 * @fileOverview Helper functions
 * @author Joe Innes
 */

/** 
 * Helper
 * @namespace 
 */
Helper = {
    /**  
     * Converts a date into a string in format YYYY-MM-DD
     * @param {Date} date A date
     * @returns {String} A string representing the date passed to it in format 'YYYY-MM-DD' 
     */
    'parseADate': function (date) {
        
        /* Validate the parameter */
        if ( !(Object.prototype.toString.call(date) === "[object Date]")) {
            throw Helper.Error('Unacceptable argument', 'You passed something into the parseADate function, but it wasn\'t a date.');
        } else {
            if ( isNaN( date.getTime() ) ) {
                throw Helper.Error('Unacceptable argument', 'You passed a date object into the parseADate function, but it wasn\'t valid');
            }
        }
        
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
    /**  
     * Converts a number representing a day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday) into a string with that day's name
     * @param {Number} day A number from 0-6 
     * @returns {String} A string representing the day of the week 
     */
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
    /**  
     * Takes a date, and returns five days (including this one).
     * @param {String} date A string in format YYYY-MM-DD 
     * @returns {Array} An array of strings in format YYYY-MM-DD 
     */
    'getNextFive': function (date) {
        
        /* Validate the parameter */
        if (typeof date !== 'string') {
            throw Helper.Error('Unacceptable argument', 'You passed something into the getNextFive function, but it wasn\'t a string.');
        }
        
        var start = new Date(date);
        
        /* Validate the parameter now it's a date */
        if ( !(Object.prototype.toString.call(start) === "[object Date]")) {
            throw Helper.Error('Unacceptable argument', 'You passed something into the getNextFive function, but it wasn\'t a date string in the format YYYY-MM-DD.');
        } else {
            if ( isNaN( start.getTime() ) ) {
                throw Helper.Error('Unacceptable argument', 'You passed something weird into the getNextFive function that could be converted into a date, but somehow the date created was not valid');
            }
        }
        
        start = new Date(start.setDate(start.getDate() - 1)); // Show yesterday in the list too... 
        var allDates = [Helper.parseADate(start)];
        for (var i = 0; i < 4; i++) {
            allDates.push(Helper.parseADate(new Date(start.setDate(start.getDate() + 1))));
        }
        return allDates;
    },
    /**  
     * Converts a date into a string of format 'DD/MM/YYYY'
     * @param {Date} date A date 
     * @returns {String} A string representing the date in format DD/MM/YYYY 
     * @todo Allow a format string to be passed in
     */
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
    },
    /**  
     * Homegrown error handler
     * @param {String} message A message to be displayed
     * @param {String} detail Detailed information about the error  
     * @returns {String} A string containing the error message and the details
     * @todo Add some kind of user alerting feature to this
     */
    'Error': function (message, detail) {
        this.message = message;
        this.detail = detail;
        return message + '\n' + detail;
    }
};