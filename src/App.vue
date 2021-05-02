<template>
  <div id="app">
    <header>
      <button class="add" @click="onAddClick"><b>+</b></button>
      <h1>Dailies</h1>
    </header>
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
    <footer>Alex Middeleer © {{ new Date().getFullYear() }}</footer>
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
    return {
      todos: [],
      doneTodos: [],
      timeCheckInterval: -1
    };
  },
  created() {
    const stored = JSON.parse(localStorage.getItem("storedTodos")) || [];
    const todos = stored.map(deserializeTodoPojo);
    this.todos = todos.filter(t => !t.isDone);
    this.doneTodos = todos.filter(t => t.isDone);
  },
  mounted() {},
  beforeDestroy() {
    clearInterval(this.timeCheckInterval);
  },
  methods: {
    onUpdate() {
      localStorage.setItem(
        "storedTodos",
        JSON.stringify(this.todos.concat(this.doneTodos))
      );
    },
    onAddClick() {
      this.todos.unshift(new ToDoClass());
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
      if (!confirm(`Delete ${todo.name}?`)) return;
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
body {
  background-color: black;
  color: #ddd;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  font-size: 20px;
  box-sizing: border-box;
  padding: 10px;
}
.todo {
  font-size: 15px;
}
.status {
  padding: 30px 0;
  font-size: 40px;
}
h1 {
  font-size: 14px;
}
footer {
  margin-top: 50px;
  font-size: 14px;
}
header {
  position: relative;
  display: block;
  height: 40px;
  /* border-bottom: 1px solid #444; */
}
header h1 {
  position: absolute;
  text-align: center;
  top: 0;
  width: 100%;
}
header button {
  position: absolute;
  right: 0;
  z-index: 2;
}
button {
  border: 1.5px solid #444;
  text-align: center;
  line-height: 0;
  width: 30px;
  height: 30px;
  outline: none;
  padding: 0;
  font: inherit;
  color: inherit;
  background: none;
}
</style>
