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
<style scoped>
div {
  justify-content: space-between;
  display: flex;
}

label {
  display: flex;
  align-items: center;
}

.goalName {
  text-align: left;
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
</style>
