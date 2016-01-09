Template.toDoItem.helpers({
    /**
     * @function
     * @summary Returns the date stored with the todo item in YYYY-MM-DD format for use in the ID
     * @returns {String} A string in YYYY-MM-DD format
     */
    'dateStr': function() {
        return Helper.parseADate(this.date);
    },
    /**
     * @function
     * @summary Returns a boolean indicating whether the todo item is done in order to set a class on the item
     * @returns {Boolean} A Boolean indicating whether the todo item is done
     */
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
     /**
     * @function
     * @summary Handles a double click on the item
     * @listens double click on this item
     */
    'dblclick .todo-item': function (e) {
        var docId = this._id;
        var doc = ToDos.findOne(docId);
        var yesterday = (function(){this.setDate(this.getDate()-1); this.setUTCHours(0,0,0,0); return this}).call(new Date);
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
            } else if (!(Session.get('daysVisible').indexOf(ToDos.findOne(docId).date) > -1) ) { // If the date on this doc is not currently visible
                var prio = 0;
                while (ToDos.find({date: new Date(new Date().setUTCHours(0,0,0,0)), prio: prio}).fetch().length) {
                    prio++;
                }
                ToDos.update({
                    _id: docId
                },
                {
                    $set: {
                        done: true,
                        date: new Date(new Date().setUTCHours(0,0,0,0)),
                        prio: prio
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
    /**
     * @function
     * @summary Handles 'enter' to submit, by blurring the item instead 
     * @listens enter key
     */
    'keypress .todo-item': function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            e.preventDefault();
            e.target.blur();
        }
    },
    /**
     * @function
     * @summary Handles submitting the data when the item is blurred 
     * @listens blur this item
     */
    'blur .todo-item': function (e) {
        if (e.target.innerHTML !== "" && e.target.innerHTML !== Session.get('editing')) { // Don't do anything if empty or no change
            var creator = "Joe"; // Set the creator's name
            var toDo = e.target.innerHTML; // Get the text
            var editedToDo = e.target.id.split('_'); // Now for the fun bit... split the ID into its constituent parts... wait, why am I doing this?
            var date = this.date;
                    
            /* Validate the parameter */
            if ( !(Object.prototype.toString.call(date) === "[object Date]")) {
                throw Helper.Error('Unacceptable argument', 'The first part of the id set on this item is not a string in format \'YYYY-MM-DD\'');
            } else {
                if ( isNaN( date.getTime() ) ) {
                    throw Helper.Error('Unacceptable argument', 'The id on this item is weird enough to be parsed as a date, but not a valid one');
                }
            }
            
            var prio =  this.prio;
            
            prio = parseInt(prio, 10);
            
            var docId = this._id;
            
            // Don't waste time checking if there's no docId embedded in this element
            if (docId !== "") {
                // But if there is, check if it's valid
                if (ToDos.findOne(docId)) {
                    doneDate = ToDos.findOne(docId).date; 
                    // And if it is, update it
                    if (ToDos.findOne(docId).hasOwnProperty('displayingOn')) {
                        doneDate = ToDos.findOne(docId).displayingOn;
                    }
                    ToDos.update({
                        _id: docId
                    }, {
                        $set: {
                            todo: toDo,
                            date: doneDate
                        }
                    });
                    e.target.innerHTML = "";
                    Session.set('editing', null)
                    // And return so that you don't insert a new document
                    return;
                }
            }
            
            // If you got here, then you didn't return earlier up, so there's no valid document here. Let's make one.
            ToDos.insert({
                todo: toDo,
                prio: prio,
                date: date,
                createdBy: creator,
                done: false
            });
            e.target.innerHTML = "";
            Session.set('editing', null)
        }
    },
     /**
     * @function
     * @summary Stores the start edit value
     * @listens focus this item
     */
    'focus .todo-item': function (e) {
        Session.set('editing', e.target.innerHTML);
    },
    /**
     * @function
     * @summary Deletes this item
     * @listens click on the delete button for this item
     */
    'click .delete': function (e) {
        console.log (this._id);
        if (this._id) {
            ToDos.remove(this._id);
        }
    }
});