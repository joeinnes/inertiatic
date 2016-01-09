Template.toDoList.helpers({
     /**
     * @function
     * @summary Looks up the todos for this day
     * @returns {Array} An array of objects for this day's todos
     */
    todos: function () {   
        var query = new Date(this.toString());
        var oldToDos = [];
        
        /* Validate the parameter to check it's a date */
        if ( !(Object.prototype.toString.call(query) === "[object Date]")) {
            throw Helper.Error('Unacceptable argument', 'Something went wrong and the this reference for today couldn\'t be converted to a date');
        } else {
            if ( isNaN( query.getTime() ) ) {
                throw Helper.Error('Unacceptable argument', 'The this value for today could be converted into a date, but somehow the date created was not valid');
            }
        }
        
        // Create an array of todos matching this date
        var results = ToDos.find({ date: query }, { sort: { done: 1}}).fetch();
        var thisDate = query;
        var toDoList = [];
        var todos = results.map(function (result) {
            // For each result from the query, map it to the correct priority value
            toDoList[result.prio] = result;
        });
        toDoList = toDoList.filter(function(n){ return n != undefined }); 
        
        /* TODO: old to dos should fill the list for today */
        if (query.valueOf() == (new Date()).setUTCHours(0,0,0,0).valueOf()) {
            var beforeStart = new Date(Session.get('startDate'));
            beforeStart.setDate(beforeStart.getDate() - 1);

            
            oldToDos = ToDos.find({
                $and: [{
                    date: { 
                        $lt: thisDate 
                    } 
                }, {
                    date: { 
                        $lt: beforeStart
                    } 
                }, {
                    done: { 
                        $not: true 
                    } 
                }]
            }, {
                $sort: {
                    prio: 1
                }                    
            }).fetch();

        }
        
        // Now iterate through the list and fill the holes with empty todos
        var j = 0;
        for (var i = toDoList.length; i < 15; i++) {
            if(!toDoList[i]) {
                if (oldToDos[j]) {
                    toDoList[i] = oldToDos[j];
                    j++;
                } else {
                    toDoList[i] = {prio: i, todo: "", date: thisDate};
                }
            }
        }
        toDoList.sort(function(a, b) {
            if (!a.done && a.todo.length) {
                return -1;
            } else {
                return 1;
            }
        });
        return toDoList;
    },
    /**
     * @function
     * @summary Checks if this is before today
     * @returns {Boolean} A boolean - true means this is before today, false means this is today or later.
     */
    'beforeToday' : function() {
        var displayedDate = new Date(this.toString());
        
        /* Validate the parameter to check it's a date */
        if ( !(Object.prototype.toString.call(displayedDate) === "[object Date]")) {
            throw Helper.Error('Unacceptable argument', 'Something went wrong and the this reference for today couldn\'t be converted to a date');
        } else {
            if ( isNaN( displayedDate.getTime() ) ) {
                throw Helper.Error('Unacceptable argument', 'The this value for today could be converted into a date, but somehow the date created was not valid');
            }
        }
        
        var today = new Date().setUTCHours(0,0,0,0).valueOf();
        
        if (displayedDate < today) {
            return true;
        }
        return false;
    },
     /**
     * @function
     * @summary Returns this day's name
     * @returns {String} A string value for this day's name
     */
    dayName: function () {
        var today = new Date(this.toString());
        
        /* Validate the parameter */
        if ( !(Object.prototype.toString.call(today) === "[object Date]")) {
            throw Helper.Error('Unacceptable argument', 'The this reference for this list could not be converted into a date');
        } else {
            if ( isNaN( today.getTime() ) ) {
                throw Helper.Error('Unacceptable argument', 'The this reference for this list is weird enough to be parsed as a date, but not a valid one');
            }
        }
        return Helper.dateToDayString(today.getDay());
    },
    /**
     * @function
     * @summary Returns this day's date as a formatted string
     * @returns {String} A string value for this day's date
     */
    dateFormat: function () {
        var thisDate = new Date(this.toString());
        
        /* Validate the parameter */
        if ( !(Object.prototype.toString.call(thisDate) === "[object Date]")) {
            throw Helper.Error('Unacceptable argument', 'The this reference for this list could not be converted into a date');
        } else {
            if ( isNaN( thisDate.getTime() ) ) {
                throw Helper.Error('Unacceptable argument', 'The this reference for this list is weird enough to be parsed as a date, but not a valid one');
            }
        }
        
        return Helper.dateFormat(thisDate);
    }
}); 