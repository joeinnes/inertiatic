Template.toDoItem.helpers({
    'dateStr': function() {
        return Helpers.parseADate(this.date);
    },
    'done': function() {
        var docId = this._id;
        var doc = ToDos.findOne(docId);
        if (doc) {
            if (!!doc.done) {
                return true;
            }
        }
        return false;
    }
});

Template.toDoItem.events({
    'dblclick .todo-item': function (e) {
        console.log('Hey!!!');
        var docId = e.target.id.split("_")[2];
        var doc = ToDos.findOne(docId);
        if (doc) {
            if (!!doc.done) {
                ToDos.update({
                    _id: docId
                },
                {
                   $set: {
                       done: false
                   }
                });
            } else {
                ToDos.update({
                    _id: docId
                },
                {
                    $set: {
                        done: true
                    }
                });
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
            var docId = editedToDo[2];
            if (!ToDos.findOne(docId)) {
                ToDos.insert({
                    todo: toDo,
                    prio: prio,
                    date: date,
                    createdBy: 'Joe',
                    done: false
                });
            }
        }
    }
});