    var todos = {
        "2016-01-06": [{todo: "testObj", done: false}, {todo: "testObj done", done: true}],
        "Monday" : [{todo: "testObj", done: false}, {todo: "testObj done", done: true}],
        "Tuesday": ["Test", "Test 2", "Test 3"],
        "Wednesday": ["Do this on Weds", "Test 2", "Test 3"],
        "Thursday": ["Be in love with Ada", "Do this on Thurs", "Test 3"],
        "Friday": ["Test", "Test 2", "Do this on Fri"],
    };
    /* Create the template */
    function toDo(item, done) {
        var elTemplate = document.createElement('li');
        var toDoItem = document.createElement('span');
        toDoItem.contentEditable = "true";
        toDoItem.className = "todo-item";
        toDoItem.innerHTML = item;
        if (done) {
            toDoItem.className = toDoItem.className + " done"; 
        }
        var icons = document.createElement('span');
        icons.className = "item-icons pull-right";
        var emove = document.createElement('i');
        emove.className = "glyphicon glyphicon-emove";
        icons.appendChild(emove);
        elTemplate.appendChild(toDoItem);
        elTemplate.appendChild(icons);
        return elTemplate;
    }

    
    for (day in todos) {    
        for (var i = 0, len = 15; i < len; i++) {
            if (document.getElementById(day)) {
                if (todos[day][i]) {
                    var thisToDo = new toDo(todos[day][i].todo, todos[day][i].done);
                    document.getElementById(day).appendChild(thisToDo);
                } else {
                    var thisToDo = new toDo("", false);
                    document.getElementById(day).appendChild(thisToDo);
                }
            }
        }
    }
    
    var todoEls = document.getElementsByClassName('todo-item');
    for (var i = 0, len = todoEls.length; i < len; i++ ) {
        /*todoEls[i].addEventListener('input', function(e) {
            console.log('Text value in span ' + e.target.id + ' is ' + e.target.innerHTML);
        });*/
        todoEls[i].addEventListener('blur', function(e) {
            if (e.target.innerHTML !== "") {
                console.log('Text value in span ' + e.target.id + ' is ' + e.target.innerHTML);
            }
        });
        todoEls[i].addEventListener('keypress', function(e) {
            var key = e.which || e.keyCode;
            if (key === 13) {
                this.blur();
            }
        });
        todoEls[i].addEventListener('dblclick', function(e) {
            if ( this.className == "todo-item done" ) {
                this.className = "todo-item";
            } else {
                this.className += " done";
            }
        });
    }
    
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var day = today.getDate();
    
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
    
    var todaysDate = year + "-" + month + "-" + day;
    console.log(today);
    console.log(dayToDayString(today.getDay()));
    console.log(todaysDate);
    
    
    function dayToDayString(day) {
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
    }