<template>
  <div id="app">
    Dailies <br /><button @click="onAddClick">➕</button>
    <template v-for="todo in todos">
      <ToDo
        class="todo"
        :todo="todo"
        :key="todo.id"
        @change="updateTodo($event)"
        @deleted="deleteTodo($event)"
      />
    </template>
    <p>
      💪
    </p>
  </div>
</template>

<script>
import ToDo from "./components/ToDo.vue";
import ToDoClass, { deserializeTodoPojo } from "./ToDo";

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
    const todos = stored.map(deserializeTodoPojo);
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
      this.$nextTick(function() {
        if (!(this && this.$el && this.$el.querySelector)) return;
        const input = this.$el.querySelector(".todo input[type=text]");
        if (input && input.focus) {
          input.focus();
        }
      });
    },
    deleteTodo(todo) {
      this.todos = this.todos.filter(t => t.id !== todo.id);
      this.onUpdate();
    },
    updateTodo() {
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
  font-size: 20px;
}
.todo {
  padding: 15px 10px 0;
  border-top: 1px solid #ddd;
  margin-top: 10px;
}
</style>
