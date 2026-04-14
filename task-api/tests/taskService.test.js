const taskService = require("../src/services/taskService");

describe("Task Service (Unit Tests)", () => {

  beforeEach(() => {
    taskService._reset();
  });


  describe("create()", () => {
    it("should create task with default values", () => {
      const task = taskService.create({ title: "Test Task" });

      expect(task).toHaveProperty("id");
      expect(task.title).toBe("Test Task");
      expect(task.status).toBe("todo");
      expect(task.priority).toBe("medium");
      expect(task.description).toBe("");
      expect(task.dueDate).toBeNull();
      expect(task.completedAt).toBeNull();
      expect(task.createdAt).toBeDefined();
    });
  });

 
  describe("getAll()", () => {
    it("should return empty array when no tasks", () => {
      expect(taskService.getAll()).toEqual([]);
    });

    it("should return all tasks", () => {
      taskService.create({ title: "Task 1" });
      taskService.create({ title: "Task 2" });

      const tasks = taskService.getAll();
      expect(tasks.length).toBe(2);
    });
  });

});