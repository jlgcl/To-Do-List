export function forms(projectControl, pArray) {
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
    
    document.querySelector(".btn").addEventListener("click", function(e) {
        e.preventDefault();
    })
    
    document.querySelector(".pBtn").addEventListener("click", function(e) {
        e.preventDefault();

        let projInput = document.getElementById("pTitleIn").value;
        let newProject = projectControl(projInput);

        let newDiv = document.createElement("div");
        let projParent = document.getElementsByClassName("projects");
        newDiv.id = "project";
        newDiv.textContent = newProject.name;
        projParent.appendChild(newDiv); //STUCK: appendChild not a function?? in console.

        pArray.push(newProject);
        console.log(pArray);
    })
}
