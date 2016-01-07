Template.toDoList.helpers({
    todos: function () {
        var query = new Date(this.toString())
        
        // console.log(query);
        var results = ToDos.find({ date: query }).fetch();
        
        // console.log(results);
        /* Map out results to todos */
        var toDoList = [];
        var todos = results.map(function (result) {
            // todos[parseInt(result.prio)] = result;
            toDoList[result.prio] = result;
        });
        
        for (var i = 0; i < 15; i++) {
            if (!toDoList[i]) {
                thisDate = new Date(this.toString());
                toDoList[i] = {date: thisDate, prio: i, todo: ""};
            }
        }
        
        console.log(toDoList)
        
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