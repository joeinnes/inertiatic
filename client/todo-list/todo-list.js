Template.toDoList.helpers({
    todos: function () {
        var query = new Date(this.toString())
        var results = ToDos.find({ date: query }).fetch();
        var toDoList = [];
        var todos = results.map(function (result) {
            toDoList[result.prio] = result;
        });
        
        for (var i = 0; i < 15; i++) {
            if (!toDoList[i]) {
                thisDate = new Date(this.toString());
                toDoList[i] = {date: thisDate, prio: i, todo: ""};
            }
        }
        
        return toDoList;
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