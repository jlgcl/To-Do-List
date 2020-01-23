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

    const pArray = [];  //stores projects
    let elements2 = document.getElementsByClassName("project");
    forms(projectControl, pToDo, pArray, projClicked, elements2);  //MUST pass through these as arguments.

}

//create separate MODULE for below:
export function toDo(elements2) {
    const tArray = [];  //stores to-dos
    //put this as separate module later.
    //PERSISTING PROBLEM: still only recognizes whatever project already existing - tried querySelector -> getElements for live HTMLCollections
    //ONLY works when toDo is inside .pBtn eventListener callback.
    //assign "active" to project classNames
    let elements3 = Array.from(elements2);
    elements3.map(a => {
        a.addEventListener("click", function(e) {
            e.preventDefault();
            a.className = a.ClassName + " active";
        })
    })

    //check if project is "active" then add to-dos.
    document.querySelector(".btn").addEventListener("click", function(e) {  //to-do submit
        e.preventDefault();
        //assign value to each to-do parent item as a.textContent to categorize each item under the chosen project.
        let tTitle = document.querySelector("#titleIn").value;
        let tNotes = document.querySelector("#notesIn").value;
        let tPriority = document.querySelector("#priorityIn").value;

        //do title & notes first, then figure out priority & dates later.
        let newToDo = pToDo(tTitle, tNotes);
        tArray.push(newToDo);

        let tParent = document.querySelector(".todo");
        let newTDiv = document.createElement("div");
        tParent.appendChild(newTDiv);
        newTDiv.className = "item";
        newTDiv.name = "current";

        //if project is "active", 
        Array.from(document.getElementsByClassName("project")).map(a => {
            if (a.className == "project active") {
                a.name = "current";
            }
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

        delT.addEventListener("click", function(e) {
            tArray.splice(pArray.length-1, 1);
            newTDiv.remove();
        })

        //FIND A WAY TO DISPLAY/CATEGORIZE FORM IFF PROJECT IS ACTIVE
        Array.from(document.getElementsByClassName("item")).map(b => {
            Array.from(document.getElementsByClassName("project")).map(c=>{
                if (b.name == c.name) {
                    b.style.display = "none";
                } else if (b.name !== c.name) {
                    b.style.display = "block";  //displays twice for each project that meets this else if condition.
                }
            })
        })
    })
}


renderControl();