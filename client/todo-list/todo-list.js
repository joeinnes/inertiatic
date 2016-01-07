Template.toDoList.helpers({
    todos: function () {
        var query = [];
        var results = ToDos.find({ date: { $in: query } }).fetch();
        
        /* Ensure that there are 15 values */
        while (results.length < 16) {
            results.push({ todo: "", done: false, prio: results.length, date: new Date(this.toString())})
        }

        return results;
    },
    dayName: function () {
        var today = new Date(this.toString());
        return Helpers.dateToDayString(today.getDay());
    },
    dateFormat: function () {
        var thisDate = new Date(this.toString());
        return Helpers.dateFormat(thisDate);
    }
});