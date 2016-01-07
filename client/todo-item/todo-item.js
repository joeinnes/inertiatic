Template.toDoItem.helpers({
    'test': function() {
        // console.log(this);
        return 1;
    },
    'dateStr': function() {
        return Helpers.parseADate(this.date);
    }
});

Template.toDoItem.events({
    'dblclick .todo-item': function (e) {
        var docId = e.target.id;
        var doc = ToDos.findOne(docId);
        if (doc) {
            if (!!doc.done) {
                console.log('Update this doc with \'done: false\'');
            } else {
                console.log('Update this doc with \'done: true\'');
            }
        }
    },
    'keypress .todo-item': function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            e.target.blur();
        }
    },
    'blur .todo-item': function (e) {
        if (e.target.innerHTML !== "") {
            var toDo = e.target.innerHTML;
            var editedToDo = e.target.id.split('_');
            var date = new Date(editedToDo[0]);
            var prio =  editedToDo[1];
            console.log('I will insert the following... {date: ' + date + ', prio: ' + prio + ', todo: ' + toDo + '}' );
        }
    }
});