const RESPONSE_OK=4;
const STATUS_OK=200;
const TODOS_LIST_ID="todos_list_div";
const NEW_TODO_INPUT="new_todo_input";
var table=document.createElement("table");
var table1=document.createElement("table1");
var table2=document.createElement("table2");

window.onload=getTodosAJAX();
function  addToDoElements(id,response)
{
    var todos_json=JSON.parse(response);
    var parent=document.getElementById(id);
    table.innerHTML="";
    table1.innerHTML="";
    table2.innerHTML="";
    if(parent)
    {
        Object.keys(todos_json).forEach(
            function(key){
                createTodoElement(key, todos_json[key]);
                // parent.appendChild(element);
            }
        )
    }
}

function createTodoElement(key, todo_object){

    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;



    if (todo_object.status == "ACTIVE"){

        var active=document.getElementById("active");
        var row=document.createElement("tr");

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.setAttribute("onclick", "completeTodoAJAX("+key+")");
        checkbox.setAttribute("class", "breathHorizontal");
        row.append(checkbox);



        var cell=document.createElement("td");
        cell.innerHTML=todo_object.title;
        cell.setAttribute(
            "data-id", key
        );
        // cell.setAttribute(
        //     "class", "todoStatus"+ todo_object.status
        // );
        cell.setAttribute("id","active_data");
        row.appendChild(cell);

        var delete_button1 = document.createElement("button");
        delete_button1.innerText = "";
        delete_button1.setAttribute("onclick", "deleteAJAX("+key+")");
        delete_button1.setAttribute("class", "breathHorizontal");
        delete_button1.setAttribute("id","delete1");
        row.appendChild(delete_button1);

        table.appendChild(row);
        active.appendChild(table);
    }

    if(todo_object.status=="COMPLETE")
    {
        var complete=document.getElementById("completed");
        var row=document.createElement("tr");

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked="checked";
        checkbox.setAttribute("onclick", "incompleteTodoAJAX("+key+")");
        checkbox.setAttribute("class", "breathHorizontal");
        row.append(checkbox);

        var cell=document.createElement("td");
        cell.innerHTML=todo_object.title;
        cell.setAttribute(
            "data-id", key
        );
        // cell.setAttribute(
        //     "class", "todoStatus"+ todo_object.status + " " + "breathVertical"
        // );
        cell.setAttribute("id","completed_data");
        row.appendChild(cell);

        var delete_button = document.createElement("button");
        delete_button.innerText = "";
        delete_button.setAttribute("onclick", "deleteAJAX("+key+")");
        delete_button.setAttribute("class", "breathHorizontal");
        delete_button.setAttribute("id","delete1");
        row.appendChild(delete_button);
        table1.appendChild(row);
        complete.appendChild(table1);
    }
    if (todo_object.status == "DELETED"){

        var deleted=document.getElementById("deleted");
        var row=document.createElement("tr");
        var cell=document.createElement("td");
        cell.innerHTML=todo_object.title;
        cell.setAttribute(
            "data-id", key
        );


        cell.setAttribute("id","deleted_data");
        row.appendChild(cell);
        table2.appendChild(row);
        deleted.appendChild(table2);

    }

}

function getTodosAJAX()
{
    var xhr=new XMLHttpRequest();
    xhr.open('GET','/api/todos',true);

    xhr.onreadystatechange=function() {
        if ((xhr.readyState ==RESPONSE_OK)&&(xhr.status==STATUS_OK))
        {
            console.log(xhr.responseText);
            addToDoElements(TODOS_LIST_ID,xhr.responseText);
        }
    }
    xhr.send(data=null);
}

function addTodosAJAX(){
    var todo_value=document.getElementById(NEW_TODO_INPUT).value;
    var xhr=new XMLHttpRequest();
    xhr.open('POST','/api/todos',true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data="todo_title="+encodeURI(todo_value);
    xhr.onreadystatechange=function() {
        if ((xhr.readyState ==RESPONSE_OK)&&(xhr.status==STATUS_OK))
        {
            console.log(xhr.responseText);
            addToDoElements(TODOS_LIST_ID,xhr.responseText);
        }
        else
            console.log(xhr.responseText);
    }

    xhr.send(data);
}
function completeTodoAJAX(id) {

    // Make a AJAX Request to update todo with the above id
    // If Response is 200 : refreshTodoElements


    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=COMPLETE";

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_OK) {
            if (xhr.status == STATUS_OK) {
                addToDoElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }


    xhr.send(data);
}
function incompleteTodoAJAX(id) {

    // Make a AJAX Request to update todo with the above id
    // If Response is 200 : refreshTodoElements


    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=ACTIVE";

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_OK) {
            if (xhr.status == STATUS_OK) {
                addToDoElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }


    xhr.send(data);
}

function deleteAJAX(id){

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=DELETED";

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_OK) {
            if (xhr.status == STATUS_OK) {
                addToDoElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }


    xhr.send(data);
}
function hide1(){
    var show=document.getElementById("hide1");
    var x=document.getElementById("completed");
    if (x.style.display === 'none') {
        show.innerHTML="Hide";
        console.log("in hiding");
        x.style.display = 'block';
    } else {

        show.innerHTML="Show";
        x.style.display = 'none';
    }
}
function hide2(){
    var show=document.getElementById("hide2");
    var x=document.getElementById("deleted");
    if (x.style.display === 'none') {
        show.innerHTML="Hide";
        console.log("in hiding");
        x.style.display = 'block';
    } else {

        show.innerHTML="Show";
        x.style.display = 'none';
    }
}
