<template>
  <div>
    <label>
      <input type="checkbox" v-model="isDone" />
      <span class="goalName" v-show="!editing">
        {{ name }}
      </span>
      <input
        v-show="editing"
        type="text"
        ref="textInput"
        v-model="name"
        placeholder="Take three deep breaths"
        @blur="editing = false"
      />
    </label>
    <span class="buttons">
      <button @click="editing = true" v-if="!editing">
        ✍️
      </button>
      <button @click="$emit('deleted', todo)">
        🗑
      </button>
    </span>
  </div>
</template>
<script>
import ToDo from "../ToDo";

export default {
  props: {
    todo: ToDo
  },
  data() {
    return {
      isDone: false,
      name: "",
      editing: false,
      intrvl: -1
    };
  },
  created() {
    const { name, isNew, isDone } = this.todo;
    this.name = name;
    this.editing = isNew;
    this.isDone = isDone;
    this.intrvl = setInterval(() => {
      return (this.isDone = this.todo.isDone);
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intrvl);
  },
  watch: {
    isDone(newVal) {
      this.todo.done = newVal;
      this.$emit("change", this.todo);
    },
    name(newVal) {
      this.todo.name = newVal;
      this.$emit("change", this.todo);
    },
    editing(newVal) {
      if (newVal) {
        this.$nextTick(function() {
          this.$refs.textInput.focus();
        });
      }
    }
  }
};
</script>
<style scoped>
div {
  justify-content: space-between;
  display: flex;
}

label {
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 10px 0;
}

.goalName {
  text-align: left;
  flex-grow: 1;
  padding-left: 10px;
}

.buttons {
  white-space: nowrap;
  display: flex;
  margin-left: 10px;
  align-items: center;
}
.buttons button:not(:last-child) {
  margin-right: 10px;
}
input[type="checkbox"] {
  width: 20px;
  min-width: 20px;
  height: 20px;
}
</style>
