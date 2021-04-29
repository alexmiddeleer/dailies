<template>
  <div>
    <label>
      <input type="checkbox" v-model="isDone" />
      <span v-show="!editing">
        {{ name }}
      </span>
      <input
        v-show="editing"
        type="text"
        ref="textInput"
        v-model="name"
        @blur="editing = false"
      />
    </label>
    <button @click="editing = true" v-if="!editing">
      Edit
    </button>
    <button @click="$emit('deleted', todo)">
      Delete
    </button>
  </div>
</template>
<script>
import ToDo from "../ToDo";

const MS_IN_DAY = 86400000;

export default {
  props: {
    todo: ToDo
  },
  data() {
    return {
      isDone: false,
      name: "",
      editing: false
    };
  },
  created() {
    const { name, doneAt, isNew } = this.todo;
    this.name = name;
    this.editing = isNew;
    this.isDone =
      doneAt.getDate() >= new Date().getDate() &&
      new Date() - doneAt < MS_IN_DAY;
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
<style></style>
