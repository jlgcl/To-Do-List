/* THE ODIN PROJECT - JAVASCRIPT - TO DO LIST PROJECT

METHOD/APPROACH: refer to design.txt file
- pToDo's priority/dates would be functions.
- REMEMBER: use Object.create() for FF inhertiances.

FILES:
    1. index.js
    - starts with parent first, then consider if others can be separate module.

LEARNED:
    - onclick & getElementById for openForm/closeForm don't work - querySelector works.
    - childNode.remove(): removes element from DOM tree.

STATUS:
    - create HTML skeleton (use JS later) - COMPLETE
    - create input forms & get data. - COMPLETE
    - work: when project is clicked, add/categorize/show to-do items.
    - organize CSS
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
    const tArray = [];  //stores to-dos
    forms(projectControl, pArray, projClicked, tArray);  //MUST pass through these as arguments.

}

renderControl();