<template>
  <div id="app">
    Dailies <button @click="onAddClick">Add</button>
    <template v-for="todo in todos">
      <ToDo
        :name="todo.name"
        :key="todo.id"
        :doneAt="todo.doneAt"
        @change="updateTodo(todo, $event)"
        @deleted="deleteTodo(todo)"
      />
    </template>
    <p>
      Enjoy the journey
    </p>
    <p>
      Have self compassion
    </p>
  </div>
</template>

<script>
import ToDo from "./components/ToDo.vue";
import ToDoClass from "./ToDo";

export default {
  name: "App",
  components: {
    ToDo
  },
  data() {
    return { todos: [] };
  },
  created() {
    const stored = JSON.parse(localStorage.getItem("storedTodos")) || [];
    const todos = stored.map(
      pojo => new ToDoClass(new Date(pojo.doneAt), pojo.name)
    );
    this.todos = todos;
  },
  methods: {
    $log: console.log,
    onUpdate() {
      localStorage.setItem("storedTodos", JSON.stringify(this.todos));
      console.log(JSON.stringify(this.todos));
    },
    onAddClick() {
      this.todos.unshift(new ToDoClass());
      console.log("this.todos: ", this.todos);
      this.onUpdate();
    },
    deleteTodo(todo) {
      this.todos = this.todos.filter(t => t.id !== todo.id);
      this.onUpdate();
    },
    updateTodo(oldTodo, newTodo) {
      oldTodo.name = newTodo.name;
      oldTodo.doneAt = newTodo.doneAt;
      this.onUpdate();
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
