<template>
  <div id="app">
    <h1>Dailies</h1>
    <button class="add" @click="onAddClick">➕</button>
    <template v-for="todo in todos">
      <ToDo
        class="todo"
        :todo="todo"
        :key="todo.id"
        @change="updateTodo($event)"
        @deleted="deleteTodo($event)"
      />
    </template>
    <div class="status">
      {{ statusEmoji }}
    </div>
    <template v-for="todo in doneTodos">
      <ToDo
        class="todo done"
        :todo="todo"
        :key="todo.id"
        @change="updateTodo($event)"
        @deleted="deleteTodo($event)"
      />
    </template>
    <h1>Alex Middeleer © {{ new Date().getFullYear() }}</h1>
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
    return { todos: [], doneTodos: [] };
  },
  created() {
    const stored = JSON.parse(localStorage.getItem("storedTodos")) || [];
    const todos = stored.map(deserializeTodoPojo);
    this.todos = todos.filter(t => !t.isDone);
    this.doneTodos = todos.filter(t => t.isDone);
  },
  methods: {
    $log: console.log,
    onUpdate() {
      localStorage.setItem(
        "storedTodos",
        JSON.stringify(this.todos.concat(this.doneTodos))
      );
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
      this.doneTodos = this.doneTodos.filter(t => t.id !== todo.id);
      this.onUpdate();
    },
    updateTodo() {
      const todos = [...this.todos, ...this.doneTodos];
      this.todos = todos.filter(t => !t.isDone);
      this.doneTodos = todos.filter(t => t.isDone);
      this.onUpdate();
    }
  },
  computed: {
    statusEmoji() {
      const middleOptions = ["☝️", "🙂", "👍"];
      const total = this.doneTodos.length + this.todos.length;
      const doneCount = this.doneTodos.length;
      if (doneCount === 0) return "😴";
      if (doneCount === total) return "💪";
      return middleOptions[
        Math.floor(((this.doneTodos.length / total) * 100) / 33)
      ];
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  font-size: 20px;
  box-sizing: border-box;
  paddin: 10px;
}
.todo,
.status {
  border-top: 1px solid #ddd;
}
.status {
  padding: 10px 0;
}
.add {
  margin-bottom: 10px;
}
h1 {
  font-size: 14px;
}
</style>
