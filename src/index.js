/* THE ODIN PROJECT - JAVASCRIPT - TO DO LIST PROJECT

METHOD/APPROACH: refer to design.txt file
- pToDo's priority/dates would be functions.
- REMEMBER: use Object.create() for FF inhertiances.

FILES:
    1. index.js
    - starts with parent first, then consider if others can be separate module.

LEARNED: learned lessons commented throughout the code - see forms.js
    - LOTS OF LEARNING; READ CAREFULLY THROUGH THE CODE FOR COMMENTED "LEARNED" SECTIONS FOR DETAILED INFO.
    - onclick & getElementById for openForm/closeForm and other cases don't work - querySelector works.
    - childNode.remove(): removes element from DOM tree.
    - if page still reloads even with event.preventDefault(), then the code preceding it is not executing properly.
    - getElement is a LIVE HTMLCollection vs. querySelector, which is static.
    - getElementById ONLY returns one element (so can't Array.from) - use getElementsByClassName returns multiple elements.
    - correct situations to use addEventListeners vs. onclick; latter prevents confusion with getElements' latest DOM acquisition (doesn't work).
        - in JS, GlobalEventHandlers.onclick = functionName; - don't use functionName() or "functionName".
    - target.removeEventListener() - require the callback function to be exactly the same name as addEventListener.
    - using event listener, can choose parent node & child node OR use querySelector to choose childNode's id.

STATUS:
    - create HTML skeleton (use JS later) - COMPLETE
    - create input forms & get data. - COMPLETE
    - organize CSS - COMPLETE
    - HARDEST PART: when project is clicked, add/categorize/show to-do items. - COMPLETE
        - show/hide items by project category.
        - currently: submitting item changes the rest of the items.
        ***PERSISTING PROBLEM: still only recognizes whatever project already existing - tried querySelector -> getElements for live HTMLCollections
        ONLY works when toDo is inside .pBtn eventListener callback - but this creates multiple events when project is clicked since the project eventListener is inside pBtn eventListener.
        SOLUTION: USE onclick instead of addEventListener to access latest DOM elements appended after .pBtn callback scope - this also prevents eventListener multiples.

    - show all to-do items when click default - COMPLETE
    - allow edit of each to-do item - 

    - PROJECT NOT COMPLETE: still need to organize code & make functions to modules.
    
*/

import { forms } from "./forms.js"

//parent to-do FF
function pToDo(name, note) {
    const names = () => name;
    const notes = () => note;
    let priority = function(choice) {
        if (choice == "true") {
            //check/display priority
        }
    }
    return priority, names, notes;
}

//FF for projects; don't use Object.create for these cases due to arguments - creating instances directly is easier.
function projectControl(name) {
    return {name};
    //REMEMBER(put in notes): "this.something" belongs to a constructor function; return {} used more in FF.
}

//function to control render & actions
function renderControl() {
    //must create input form.
    //let project1 = Object.create(projectControl(name of project)) OR create function inside the FF that takes in all arguments.

    //initial click checker: false - unless project is "clicked", then activated to "true".
    var projClicked = false;

    //const pArray = [];  //stores projects
    forms();  //handles input forms


    document.querySelector(".pBtn").addEventListener("click", function(e) {
        e.preventDefault();

        let projInput = document.getElementById("pTitleIn").value;
        let newProject = projectControl(projInput);
        //pArray.push(newProject);

        let newDiv = document.createElement("div");
        let projParent = document.querySelector(".projects");   //again, getElementsByClassNames doesn't work here (IDK why?)
        projParent.appendChild(newDiv); //STUCK: appendChild not a function?? in console - answer: use querySelector instead.
        newDiv.className = "project";
        newDiv.innerHTML = newProject.name;
        newDiv.name = newDiv.innerHTML;
        newDiv.onclick = projectClick;

        //LEARNED: use buttons instead of adding event listener to an innerHTML
        let delP = document.createElement("button");
        newDiv.appendChild(delP);
        delP.id = "deleteP";
        delP.textContent = "X";
        delP.type = "button";

        //NOTE: since under parent "submit" function, any delete will delete that element.
        delP.addEventListener("click", function(e) {
            //pArray.splice(pArray.length-1, 1);
            newDiv.remove();
        })

        document.getElementById("myProject").style.display = "none";
    });
    
}

//LEARNED: necessary to have this step: simple addition onclick to projectClick(e) in HTML doesn't work; addEventListener to "item" then style.display="block" <- querySelector/getElements doesn't work (undefined).
document.querySelector("#default").addEventListener("click", function(){
    //get rid of any onclick added from previous click, then add function again.
    if (document.getElementById("default").onclick=projectClick) {
        document.getElementById("default").onclick="";
    }
    document.getElementById("default").onclick=projectClick;
})

function projectClick(e) {
    /*ISSUE: 
        if outside .pBtn eventListener, doesn't recognize latest DOM tree after project appendChild.
        if inside .pBtn eventListener, a is multiplied depending on the project's DOM position - because project submit (.pBtn) is clicked again.
        
        next steps (SOLVED - see status notes above):
            1) try to find way to expose document.getElementsByClassName("project") from inside .pBtn eventListener
            2) find a way to obtain live HTML & why document.getElementsByClassName("project") doesn't return live HTML.
            3) connect inside of project eventListener to outside.
            SOLUTION: assign onclick with function when project is created.
    */

    e.preventDefault();

    Array.from(document.getElementsByClassName("project active")).map(a=>{
        a.className.replace(" active", "");
    })

    e.target.className = e.target.className + " active";
    if (e.target.className == "project active active"){
        e.target.className = "project active";
    };

    e.target.id = e.target.name;
    //let elementTargetId = e.target.id;

    //check if project is "active" then add to-dos.



    //show/hide to-dos; MUST initialize with all to show none.
    Array.from(document.getElementsByClassName("item")).map(b=>{
        
        b.style.display = "none";
        document.querySelector("#default").addEventListener("click", function(){
            b.style.display = "block";
        })
    })
    Array.from(document.getElementsByClassName("item")).map(b=>{
        if (b.id == e.target.id) {
                b.style.display = "block";
        }else {
                b.style.display = "none";
        }
    })
}

//below callback MUST NOT be inside test(e) function, or it will assign new item to both projects for some reason.
document.querySelector(".btn").addEventListener("click", function(e) {  //to-do submit
    e.preventDefault();
        
    //if project is active, then add to-do
    //assign value to each to-do parent item as a.textContent to categorize each item under the chosen project.
    let tTitle = document.querySelector("#titleIn").value;
    let tNotes = document.querySelector("#notesIn").value;
    //let tPriority = document.querySelector("#priorityIn").value;

    //do title & notes first, then figure out priority & dates later.
    let newToDo = pToDo(tTitle, tNotes);
    //tArray.push(newToDo);

    let tParent = document.querySelector(".todo");
    let newTDiv = document.createElement("div");
    tParent.appendChild(newTDiv);
    newTDiv.className = "item";
    Array.from(document.getElementsByClassName("project active")).map(a=>{
        newTDiv.id = a.name;
    })

    let title = document.createElement("div");
    title.id = "title";
    title.textContent = tTitle;
    newTDiv.appendChild(title);

    let notes = document.createElement("div");
    notes.id = "notes";
    notes.textContent = tNotes;
    newTDiv.appendChild(notes);

    let delT = document.createElement("button");
    newTDiv.appendChild(delT);
    delT.id = "deleteI";
    delT.textContent = "X";

    let edit = document.createElement("button");
    newTDiv.appendChild(edit);
    edit.innerHTML = "edit";
    edit.onclick = editF;

    delT.addEventListener("click", function(e) {
        //tArray.splice(pArray.length-1, 1);
        newTDiv.remove();
    })

    document.getElementById("myForm").style.display = "none";
})

//Edit to-do list function
function editF(e) {
    document.getElementById("myEdit").style.display = "block";


    /* DON'T DECLARE VARIABLES LIKE THIS AND USE INSIDE BELOW CALLBACK!
    let eTitle = document.querySelector("#titleE").value;
    let eNotes = document.querySelector("#notesE").value;
    let titleIndex = e.target.parentNode.childNodes[0].innerHTML;
    let notesIndex = e.target.parentNode.childNodes[1].innerHTML;
    */

    document.querySelector(".eBtn").addEventListener("click", function(event){
        event.preventDefault();
        console.log(e.target.parentNode);
        e.target.parentNode.childNodes[0].innerHTML = document.querySelector("#titleE").value;
        e.target.parentNode.childNodes[1].innerHTML = document.querySelector("#notesE").value;
        document.getElementById("myEdit").style.display = "none";
        e = ""; //LEARNED: re-initialize after each click to prevent "e" to accumulate previous events.
    })
}

/* To show all to-do items, push every new to-do item to an array, then display using eventListener:
document.getElementsByClassName("item").map is not a function; querySelector and onclick also don't work.
SOLVED BY ADDING onclick=function SEPARATELY (SEE ABOVE).

document.querySelector("#default").addEventListener("click", function(e){
    e.preventDefault();

    let pArray = [];
    document.getElementsByClassName("item").map(a=>{
        pArray.push(a);
        pArray.map(b=>{
            b.style.display = "block";
        })
    })
})
*/

renderControl();