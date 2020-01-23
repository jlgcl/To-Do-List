import { toDo } from "./index.js"

export function forms(projectControl, pToDo, pArray, projClicked, elements2) {
    document.querySelector(".add").addEventListener("click", function(){
        document.getElementById("myForm").style.display = "block";
    })
    document.querySelector(".btn_cancel").addEventListener("click", function(){
        document.getElementById("myForm").style.display = "none";
    })
    document.querySelector(".addP").addEventListener("click", function(){
        document.getElementById("myProject").style.display = "block";
    })
    document.querySelector(".pBtn_cancel").addEventListener("click", function(){
        document.getElementById("myProject").style.display = "none";
    })
    
    /*
    document.querySelector(".btn").addEventListener("click", function(e) {
        e.preventDefault();
    })
    */
    elements2 = document.getElementsByClassName("project");
    document.querySelector(".pBtn").addEventListener("click", function(e) {
        e.preventDefault();

        let projInput = document.getElementById("pTitleIn").value;
        let newProject = projectControl(projInput);
        pArray.push(newProject);

        let newDiv = document.createElement("div");
        let projParent = document.querySelector(".projects");   //again, getElementsByClassNames doesn't work here (IDK why?)
        projParent.appendChild(newDiv); //STUCK: appendChild not a function?? in console - answer: use querySelector instead.
        newDiv.className = "project";
        newDiv.textContent = newProject.name;

        //LEARNED: use buttons instead of adding event listener to an innerHTML
        let delP = document.createElement("button");
        newDiv.appendChild(delP);
        delP.id = "deleteP";
        delP.textContent = "X";
        delP.type = "button";

        elements2 = document.getElementsByClassName("project");
        toDo(elements2);

        //NOTE: since under parent "submit" function, any delete will delete that element.
        delP.addEventListener("click", function(e) {
            pArray.splice(pArray.length-1, 1);
            newDiv.remove();
        })
    });

    /*
    MODULE: To-Do item update by project category.
    LEARNED: querySelector("#project") can't be mapped; must use Array.from to make array from HTMLelements.
    LEARNED:having below module outside the .Btn eventListener only allows element variable to index to whatever the DOM has,
    which is the default or none. the element variable must retrieve #project AFTER appendChild of projects, not BEFORE.
    PROBLEM: only recognizes the first element inside map ("default")
    */

    /* IMPORTANT! approach failed: tried to check if any project tab is clicked, then add form listener inside each project element.
    If element.map() (which is a map of document.querySelectorAll("#project")) is to be outside the .pBtn eventlistener, then:
    access variable inside callback function: return (FF) through function & privileged methods (Constructor) & module pattern (inputs) don't work.
    ANSWER) mutate the original array variable inside callback function...

    only way for element to recognize the latest state of #project DOM condition is to store element.map() inside .pBtn eventlistener.
    */
    
}
