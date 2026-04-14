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

  describe("findById()", () => {
    it("should return correct task by id", () => {
      const created = taskService.create({ title: "Find me" });
      const found = taskService.findById(created.id);

      expect(found).toBeDefined();
      expect(found.title).toBe("Find me");
    });

    it("should return undefined if task not found", () => {
      expect(taskService.findById("invalid-id")).toBeUndefined();
    });
  });


  describe("update()", () => {
    it("should update existing task", () => {
      const task = taskService.create({ title: "Old Title" });
      const updated = taskService.update(task.id, { 
        title: "New Title", 
        priority: "high" 
      });

      expect(updated.title).toBe("New Title");
      expect(updated.priority).toBe("high");
    });

    it("should return null if task not found", () => {
      const result = taskService.update("invalid-id", { title: "X" });
      expect(result).toBeNull();
    });
  });

  describe("remove()", () => {
    it("should delete task and return true", () => {
      const task = taskService.create({ title: "Delete me" });
      const result = taskService.remove(task.id);

      expect(result).toBe(true);
      expect(taskService.getAll().length).toBe(0);
    });

    it("should return false if task not found", () => {
      expect(taskService.remove("invalid-id")).toBe(false);
    });
  });

});


