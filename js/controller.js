class Controller {
    constructor() {
      // console.log("Controller started");
      this.model = new Model();
      this.view = new View();
      this.data = Model.fetchData();
      View.themeSelector();
      document.addEventListener("displayPage_done", (e) => {
        this.addTaskListeners();
        this.addDeleteTaskListeners();
        this.addEditTaskListeners();
      });
      document.addEventListener("deleteConfirmationForm_done", (e) => {
        this.confirmDeleteTask(e);
      });
      document.addEventListener("addTaskForm_done", (e) => {
        this.addFormSubmitListener(e.form, e.listId);
        this.formCancelListener(e.form);
      });
      document.addEventListener("displayNewTask_done", (e) => {
        this.addNewDeleteTaskListener(e);
      });
    }
    //--------------------------------------------------------------------------------------------------
    addTaskListeners() {
      // console.log("addTaskListeners() started");
      const addButtons = document.querySelectorAll(".add-task");
      addButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          View.addTaskForm(e);
        });
      });
      // console.log("addTaskListeners() done");
    }
    //--------------------------------------------------------------------------------------------------
    addFormSubmitListener(taskForm, listId) {
      // console.log("addFormSubmitListener() started");
      document.querySelector(".submit").addEventListener("click", (e) => {
        const requiredFields = document.querySelectorAll("[required]");
        if (Utility.validateForm(requiredFields)) {
          e.preventDefault();
          Model.addTask(listId);
          taskForm.remove();
        }
      });
      // console.log("addFormSubmitListener() done");
    }
    //--------------------------------------------------------------------------------------------------
    formCancelListener(taskForm) {
      // console.log("formCancelListener(taskForm) started");
      document.querySelector(".cancel").addEventListener("click", function () {
        taskForm.remove();
      });
      // console.log("formCancelListener(taskForm) done");
    }
    //--------------------------------------------------------------------------------------------------
    addDeleteTaskListeners() {
      // console.log("addDeleteTaskListeners() started");
      const buttons = document.querySelectorAll(".delete-task");
      buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
          let taskId = e.target.closest(".task").dataset.taskId;
          View.deleteConfirmationForm(taskId);
        });
      });
      // console.log("addDeleteTaskListeners() done");
    }
    //--------------------------------------------------------------------------------------------------
    addNewDeleteTaskListener(e) {
      // console.log("add new delete task listener");
      // console.log(e.taskId);
      let taskId = e.taskId;
      let deleteButton = document
        .querySelector('[data-task-id="' + taskId + '"]')
        .querySelector(".delete-task");
      deleteButton.addEventListener("click", () =>
        View.deleteConfirmationForm(taskId)
      );
    }
    //--------------------------------------------------------------------------------------------------
    confirmDeleteTask(e) {
      // console.log(e.target);
      // console.log("confirmDeleteTask");
      const confirm = document.querySelector(".confirm"),
        cancel = document.querySelector(".cancel");
  
      cancel.addEventListener("click", () => e.form.remove());
      confirm.addEventListener("click", () => {
        Model.deleteTask(e, e.taskId);
        e.form.remove();
      });
    }
    //--------------------------------------------------------------------------------------------------
    // Is there an instance variable attached to the class? If so, don't create. If not, then it's okay to create!
    static getInstance() {
      if (!Controller._instance) {
        Controller._instance = new Controller();
        return Controller._instance;
      } else {
        throw "Singleton has already been created!";
      }
      console.log("getInstance done");
    }
    //--------------------------------------------------------------------------------------------------
  } // End of Controller Class -------------------------------------------------------------------------
  