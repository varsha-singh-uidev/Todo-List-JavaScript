//sound effect loading 
let submitSound = new Audio("sounds/submit-button.mp3");
submitSound.volume = 0.1; //50%volume of the submit sound
let deleteSound = new Audio("sounds/delete-button.mp3");
let editSound = new Audio("sounds/edit-button.mp3");

//creating the element of input button and submit button
let key1 = document.querySelector(".task1");
let submit = document.querySelector(".submit");

document.addEventListener("DOMContentLoaded", function(){
    let savedTask = JSON.parse(localStorage.getItem("todos")) || []; //get all the task
    savedTask.forEach((task) => {
        addTasktoDom(task);//display each task on the page
    });
});

submit.addEventListener("click", function () {
    let key_value = key1.value.trim();//get the todo from the input field

    if (key_value === "") {//if the input field is empty and user press the submit

        key1.placeholder = "Please enter something here!";
        key1.style.color = "#693d3d"
        return;
    }
    
    submitSound.play();//adding the sound effect
    
    key1.placeholder = "Enter your task";//default msg show on the submit
    
    let tasks = JSON.parse(localStorage.getItem("todos")) || []; //get existing tasks or create empty array
    tasks.push(key_value);//add the new todo task in the array
    localStorage.setItem("todos",JSON.stringify(tasks));//save update array back into the localStorage

    key1.value = "";//clear the input field

    addTasktoDom(key_value);//add the new todo to the dom(display on the screen)
});

function addTasktoDom(taskText){

        let div = document.createElement("div")//creatiing the div container that store all the element                 
        div.classList.add("task-item-container");
    
        let delete_b = document.createElement("button")
        delete_b.textContent = "Delete"
        delete_b.classList.add("delete-button")//applying the class with the delete button
    
        let checkbox = document.createElement("input")
        checkbox.type = "checkbox";
        checkbox.classList.add("check-button")//adding the class with the checkbox
        
        let edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.classList.add("edit-button");//adding thr class to the edit button
    
        let p = document.createElement("p");
        p.textContent = taskText;
        p.classList.add("task-item");//adding class with the p
        
        checkbox.addEventListener("click", function(){ //applying the function with the checkbox
            if(checkbox.checked){
                    editSound.play();//this sound is play when the box is checked
                    p.style.textDecoration = "line-through";
                } 
                else{
                    submitSound.play();//this sound is play when the box is unchecked
                    p.style.textDecoration = "none";
                }
        });
    
        delete_b.addEventListener("click", function(){//applying the function with the delete button
               deleteSound.play();//apply the delete sound effect
               
               let tasks = JSON.parse(localStorage.getItem("todos")) || []; //get all the task or an empty array
               tasks = tasks.filter((task) => task!== taskText);//remove the specific task from the array so we can delete them
               localStorage.setItem("todos",JSON.stringify(tasks));//save the updated array that is not containing the deleted todo
               div.remove();//remove the todo from the page

        })
    
        edit.addEventListener("click", function(){
            
            editSound.play(); //apply the sound when the edit/save button press

            if(edit.textContent === "Edit"){

            let input = document.createElement("input");
            input.type = "text";
            input.value = p.textContent;
            div.replaceChild(input, p);

            edit.textContent = "Save";

            edit.addEventListener("click", function savetask() {
                if(edit.textContent === "Save")
                {
                p.textContent = input.value;
                localStorage.setItem("todo",input.value);
                div.replaceChild(p,input);
                edit.textContent = "Edit";

                edit.removeEventListener("click", savetask);
                }
            });
            }
        });
    
        div.appendChild(checkbox);
        div.appendChild(p);
        div.appendChild(delete_b);
        div.appendChild(edit);
        document.body.appendChild(div);
}
