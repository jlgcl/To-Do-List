/* THE ODIN PROJECT - JAVASCRIPT - TO DO LIST PROJECT

METHOD/APPROACH: refer to design.txt file
- pToDo's priority/dates would be functions.
- REMEMBER: use Object.create() for FF inhertiances.

FILES:
    1. index.js
    - starts with parent first, then consider if others can be separate module.

LEARNED: learned lessons commented throughout the code - see forms.js
    - onclick & getElementById for openForm/closeForm don't work - querySelector works.
    - childNode.remove(): removes element from DOM tree.
    - if page still reloads even with event.preventDefault(), then the code preceding it is not executing properly.
    - getElement is a LIVE HTMLCollection vs. querySelector, which is static.
    - getElementById ONLY returns one element (so can't Array.from) - use getElementsByClassName returns multiple elements.

STATUS:
    - create HTML skeleton (use JS later) - COMPLETE
    - create input forms & get data. - COMPLETE
    - organize CSS - COMPLETE
    - HARDEST PART: when project is clicked, add/categorize/show to-do items.
        - show/hide items by project category.
        - currently: submitting item changes the rest of the items.

    //PERSISTING PROBLEM: still only recognizes whatever project already existing - tried querySelector -> getElements for live HTMLCollections
    //ONLY works when toDo is inside .pBtn eventListener callback.
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
    });
    
}

function test() {
    /*ISSUE: 
        if outside .pBtn eventListener, doesn't recognize latest DOM tree after project appendChild.
        if inside .pBtn eventListener, a is multiplied depending on the project's DOM position - because project submit (.pBtn) is clicked again.
        
        next steps:
            1) try to find way to expose document.getElementsByClassName("project") from inside .pBtn eventListener
            2) find a way to obtain live HTML & why document.getElementsByClassName("project") doesn't return live HTML.
            3) connect inside of project eventListener to outside.
    */

    
    Array.from(element2).map(a => {
        a.addEventListener("click", function(e) {
            e.preventDefault();

            console.log(Array.from(document.getElementsByClassName("project"))) //works
            console.log(e.target.innerHTML);

            a.className = a.className + " active";
            a.id = a.innerHTML;

            /*
            Array.from(document.getElementsByClassName("project active")).map(b=>{
                b.className.replace(" active", "");
                b.id.replace("current", "");
            })
            */

            //show/hide to-dos
            Array.from(document.getElementsByClassName("item")).map(b=>{
                b.style.display = "none";
            })
            Array.from(document.getElementsByClassName("item")).map(b=>{
                if (b.id == a.id) {
                        b.style.display = "block";
                    } else {
                        b.style.display = "none";
                    }
            })

            //check if project is "active" then add to-dos.
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
                newTDiv.id = a.id;

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

                delT.addEventListener("click", function(e) {
                    //tArray.splice(pArray.length-1, 1);
                    newTDiv.remove();
                })
                    
            })  
        })
    })
}

renderControl();
test();