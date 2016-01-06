Template.toDoList.helpers({
    todos: function() {
        var results = ToDos.find({ date: { $in: query } }).fetch();
        
        /* Ensure that there are 15 values */
        while (results.length < 16) {
            results.push({ todo: "", done: false })
        }

        function getNextFive(date) {
            var start = new Date(date);
            var allDates = [start];
            for (var i = 1; i < 5; i++) {
                allDates.push(parseADate(start.setDate(start.getDate() + i)));
            }
        }
    }
});