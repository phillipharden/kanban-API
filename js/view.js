// View - A visual representation of the model (HTML)
class View {
    constructor() {
      // console.log("View created");
    }
    //--------------------------------------------------------------------------------------------------
    static displayPage(data) {
      data.forEach((list) => {
        // console.log(list.title);
        // console.log(list.id);
        let newList = document.createElement("section");
        newList.className = "task-list";
        newList.dataset.listId = list.id;
  
        newList.innerHTML = `          
          <header>
            <h2>${list.title}</h2>
            <button class="add-task">Add Task</button>
          </header>`;
  
        list.items.forEach((task) => {
          newList.innerHTML += `
            <article class="task" data-task-id="${task.id}">
              <header>
                <h3>${task.title}</h3>
                <button class="delete-task">Delete Task</button>
              </header>
              <p>${task.description}</p>
              <time datetime="${task.dueDate}">${task.dueDate}</time>
            </article>`;
        });
        document.querySelector("main").append(newList);
      });
  
      // console.log("displayPage(data) done");
      let evt = new Event("displayPage_done");
      document.dispatchEvent(evt);
    }
    //--------------------------------------------------------------------------------------------------
    static themeSelector() {
      // console.log("static themeSelector() started");
      const themeSelect = document.querySelector("#theme-select"),
        currentTheme = localStorage.getItem("theme") || "default";
  
      function activateTheme(themeName) {
        if (document.body.className != "") {
          let removeClass = document.body.className;
          document.body.classList.remove(removeClass);
        }
        if (themeName != "default") {
          document.body.classList.add(themeName);
        }
      }
      themeSelect.addEventListener("change", () => {
        activateTheme(themeSelect.value);
        localStorage.setItem("theme", themeSelect.value);
      });
      themeSelect.value = currentTheme;
      activateTheme(currentTheme);
      // console.log("static themeSelector() done");
    }
    //--------------------------------------------------------------------------------------------------
    static deleteConfirmationForm(taskId) {
      let confirmationForm = document.createElement("form");
      confirmationForm.className = "confirm-delete";
      confirmationForm.innerHTML = `
                <legend>Are you sure you want to delete this task?</legend>
                <div class="confirm-buttons">
                    <button type="button" class="confirm">Yes</button>
                    <button type="button" class="cancel">Cancel</button>
                </div>`;
  
      document.querySelector("main").append(confirmationForm);
  
      let evt = new Event("deleteConfirmationForm_done");
      evt.form = confirmationForm;
      evt.taskId = taskId;
      document.dispatchEvent(evt);
      // console.log("deleteConfirmationForm done");
    }
    //--------------------------------------------------------------------------------------------------
    static addTaskForm(e) {
      // console.log("addTaskForm(e) started");
      let button = e.target,
        currentListId = button.closest(".task-list").dataset.listId,
        listTitle = button.closest("header").querySelector("h2").innerText;
      let taskForm = document.createElement("form");
      document.querySelector("main").append(taskForm);
      taskForm.className = "form-add-task";
      taskForm.innerHTML = `
                    <legend>Add New ${listTitle} Task</legend>
                    <div>
                        <label for="title">Title:</label>
                        <input type="text" id="title" placeholder="Task title..." name="Title" required>
                    </div>
                    <div>
                        <label for="description">Description:</label>
                        <textarea name="Description" id="description" cols="30" rows="10" placeholder="Description..."
                            required></textarea>
                    </div>
                    <div>
                        <label for="dueDate">Due Date:</label>
                        <input type="date" id="dueDate" name="Due Date" required>
                    </div>
                    <div class="form-buttons">
                        <button type="submit" class="submit">Submit</button>
                        <button type="button" class="cancel">Cancel</button>
                    </div>`;
  
      // console.log(currentListId);
      // console.log("addTaskForm(e) done");
      let evt = new Event("addTaskForm_done");
      evt.form = taskForm;
      evt.listId = currentListId;
      document.dispatchEvent(evt);
    }
    //--------------------------------------------------------------------------------------------------
    static displayNewTask(title, description, dueDate, currentListId, newTaskId) {
      // console.log("View displayNew Task() started");
      let newTask = document.createElement("article");
      newTask.className = "task";
      newTask.dataset.taskId = newTaskId;
  
      newTask.innerHTML = `
        <header>
          <h3>${title}</h3>
          <button class="delete-task">Delete Task</button>
        </header>
        <p>${description}</p>
          <time datetime="${dueDate}">${dueDate}</time>
      `;
  
      document
        .querySelector('[data-list-id="' + currentListId + '"]')
        .append(newTask);
  
      let evt = new Event("displayNewTask_done");
      evt.taskId = newTaskId;
      document.dispatchEvent(evt);
      // console.log("View displayNewTask() finished");
    }
    //--------------------------------------------------------------------------------------------------
  } // End of View Class -------------------------------------------------------------------------------
  