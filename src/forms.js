export function forms(projectControl, pToDo, pArray, projClicked, tArray) {
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

    document.querySelector(".pBtn").addEventListener("click", function(e) {
        e.preventDefault();

        let projInput = document.getElementById("pTitleIn").value;
        let newProject = projectControl(projInput);
        pArray.push(newProject);

        let newDiv = document.createElement("div");
        let projParent = document.querySelector(".projects");   //again, getElementsByClassNames doesn't work here (IDK why?)
        projParent.appendChild(newDiv); //STUCK: appendChild not a function?? in console - answer: use querySelector instead.
        newDiv.id = "project";
        newDiv.textContent = newProject.name;

        //LEARNED: use buttons instead of adding event listener to an innerHTML
        let delP = document.createElement("button");
        newDiv.appendChild(delP);
        delP.id = "deleteP";
        delP.textContent = "X";

        //NOTE: since under parent "submit" function, any delete will delete that element.
        delP.addEventListener("click", function(e) {
            pArray.splice(pArray.length-1, 1);
            newDiv.remove();
        })

        //MODULE: To-Do item update by project category.
        //LEARNED: querySelector("#project") can't be mapped; must use Array.from to make array from HTMLelements.
        //LEARNED:having below module outside the .Btn eventListener only allows element variable to index to whatever the DOM has,
        //which is the default or none. the element variable must retrieve #project AFTER appendChild of projects, not BEFORE.
        //PROBLEM: only recognizes the first element inside map ("default")
        let element = document.querySelectorAll("#project");
        let elements1 = Array.from(element);
    
        elements1.map(a => {
            a.addEventListener("click", function() {
                console.log(a);
                
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
                    newTDiv.id = "item";
                    newTDiv.value = a.textContent;

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

                    //add below: to-do map, if (a.textContent == to-do.value) {style.display = "block"}
                    let item = document.querySelectorAll("#item");
                    let item1 = Array.from(item);
                    item1.map(b => {
                        if (b.value !== a.textContent) {
                            b.style.display = "none";
                        }//no else statement for b.style.display = "block"; this will show 2 items upon submit.
                    })
                })
            })
        })

    })

}
