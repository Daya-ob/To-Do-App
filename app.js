//-------------------------click event-------------------------//
document.querySelector('#addbutton').addEventListener('click', function(){
  const inputName = document.querySelector('#nameInput').value;
  const inputAssignedTo = document.querySelector('#assignedInput').value;
  const inputDes = document.querySelector('#descriptionInput').value;
  const inputDueD = document.querySelector('#dateInput').value;
  const inputStatus = "test";


//----------------------- Validation--------------------------//
  let allChecksPassed = validateForm(inputName, inputAssignedTo, inputDes, inputDueD, inputStatus);

  if(allChecksPassed == true){
      createTaskObject(inputName, inputAssignedTo, inputDes, inputDueD, inputStatus, myTaskManager.allTasks);
      let taskIndex = myTaskManager.allTasks.length-1;
      
      console.log(myTaskManager.allTasks[taskIndex]);
      myTaskManager.addTask(myTaskManager.allTasks[taskIndex])
  }
})

//----------------------- Event listener --------------------//
document.addEventListener('click', function(event){
  const isButton = (event.target.nodeName == 'BUTTON');
  if(isButton) {
      const element = event.target;
      let buttonJob = element.attributes.job.value;
       if (buttonJob == "delete"){
          myTaskManager.deleteTask(element);
      }  
  }  

})


function validateForm(inputName, inputAssignedTo, inputDes, inputDueD, inputStatus) {
  //-------return of this is the answer to 'is the info valid format?'------//
  let isAllValid = false;

  if((inputName.length >= 1) && (inputAssignedTo.length >= 1) && (inputDes.length >=1) && (inputDueD) && (inputStatus != 'Choose...')){
      isAllValid =true;
  }

  return isAllValid;  
}


function createTaskObject(inputName, inputAssignedTo, inputDes, inputDueD, inputStatus, myTaskArray){
  myTaskManager.allTasks.push({
     "Name": inputName,
     "AssignedTo": inputAssignedTo,
     "Des": inputDes,
     "DueD": inputDueD,
     "Status": inputStatus,
     "ID": `${myTaskArray.length < 1 ? 1 : myTaskArray.length+1}`
  })


  localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
  return myTaskManager.allTasks ;
}



class TaskManager {
  constructor(name){
      this.allTasks = [];
      this.name = name;
  }

  getAllTasks(){
      console.log(this.allTasks);
      //----------- Go to local storage----------------//
  }
     //------------- Adding cards --------------------//
  addTask(taskObj){
      let cardHTML =   `<div class="col-md-4 col-12" taskID="${taskObj.ID}">
                      <div class="card cardStyle">
                          <div class="card-header">
                              Task
                          </div>
                          <ul class="list-group list-group-flush">
                              <li class="list-group-item">Name: ${taskObj.Name} </li>
                              <li class="list-group-item">Assigned To: ${taskObj.AssignedTo} </li>
                              <li class="list-group-item">Due Date: ${taskObj.DueD} </li>
                              <li class="list-group-item">Description : ${taskObj.Des} </li>
                              <li class="list-group-item">Status: ${taskObj.Status} </li>
                          </ul>
                          <button type="button" class="btn btn-dark" job="delete" deleteID="${taskObj.ID}">Delete</button>
                      </div>
                  </div>`

      let cardsHTMLrow = document.querySelector('#cardsArea');
      cardsHTMLrow.innerHTML += cardHTML;



      let listHTML = ` <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" taskID="${taskObj.ID}">
                      <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">Assigned To: ${taskObj.AssignedTo} </h5>
                          <small>Due Date: ${taskObj.DueD} </small>
                      </div>
                      <small>Status: ${taskObj.Status}</small>
                      </a>`

      let listHTMLrow = document.querySelector('#tasksList');
      listHTMLrow.innerHTML += listHTML;          

  }

  deleteTask(element){
          
  //------ This Permenatley removes the item from the array ---//

  let thistaskID = element.parentNode.parentNode.attributes.taskID.value;
  for(let i=0; i < this.allTasks.length; i++){
      if(this.allTasks[i].ID == thistaskID){
          this.allTasks.splice(i,1);
          localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
      }
  }

  console.log(this.allTasks);

  //------- This removes card from list --------------------//
  element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode)

  //------- This removes task form list -------------------//
  let elementsA = document.querySelectorAll('a');
  for(let i=0; i < elementsA.length; i++){
      element = elementsA[i];
      if(element.attributes.taskID.value == thistaskID){
          element.parentNode.removeChild(element);
      }
  }

  }

  
}

let myTaskManager = new TaskManager("TaskTask");
//------ This retrieves the data from local storage -------//
let dataReturned = localStorage.getItem("taskArray");

if(dataReturned){
  myTaskManager.allTasks = JSON.parse(dataReturned);
  populatePage(myTaskManager.allTasks)
} else {
  myTaskManager.taskArray = [];
}

function populatePage(array){
  for(let i=0; i < array.length; i++){
      myTaskManager.addTask(array[i]);
  }
}