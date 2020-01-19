/* THE ODIN PROJECT - JAVASCRIPT - TO DO LIST PROJECT

METHOD/APPROACH: refer to design.txt file
- pToDo's priority/dates would be functions.
- REMEMBER: use Object.create() for FF inhertiances.

FILES:
    1. index.js
    - starts with parent first, then consider if others can be separate module.

LEARNED:

STATUS:
*/

//parent to-do FF
function pToDo(name, notes) {
    const name = () => name;
    const notes = () => notes;
    let priority = function(choice) {
        if (choice == "true") {
            //check/display priority
        }
    }
    return priority;
}

//store todo instances to pArray.
function projectControl(projectName) {
    const pArray = [];  //stores to-do
    const projectName = () => projectName;

    return pArray;
}

//function to control render & actions
function renderControl() {
    //must create input form.
    //let project1 = Object.create(projectControl(name of project)) OR create function inside the FF that takes in all arguments.
}