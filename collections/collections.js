ToDos = new Mongo.Collection('todos');


/* Doc design:

{ 
    date: <date of to do, as defined by user, or by date task completed>,
    todo: <text of to do>,
    prio: <priority of to do (ie: in list of 15, where it is shown)>,
    id: <id>,
    createdBy: <creator>,
    
}

*/