//import { toDo } from "./index.js"

export function forms() {
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

    /* for project & to-do items:

    MODULE: To-Do item update by project category.
    LEARNED: querySelector("#project") can't be mapped; must use Array.from to make array from HTMLelements.
    LEARNED:having below module outside the .Btn eventListener only allows element variable to index to whatever the DOM has,
    which is the default or none. the element variable must retrieve #project AFTER appendChild of projects, not BEFORE.
    PROBLEM: only recognizes the first element inside map ("default")
    */

    /* IMPORTANT! approach failed: tried to check if any project tab is clicked, then add form listener inside each project element.
    If element.map() (which is a map of document.querySelectorAll("#project")) is to be outside the .pBtn eventlistener, then:
    access variable inside callback function: 
    ATTEMPTED (FAILED): return (FF) through function & privileged methods (Constructor) & module pattern (inputs) & parameters.
    ANSWER) mutate the original array variable inside callback function...

    only way for element to recognize the latest state of #project DOM condition is to store element.map() inside .pBtn eventlistener.
    */
    
}
