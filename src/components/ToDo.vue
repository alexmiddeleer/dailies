<template>
  <div>
    <label>
      <input type="checkbox" v-model="isDone" @change="dirty = true" />
      <template v-if="!editing">
        {{ tdName }}
      </template>
      <input
        v-if="editing"
        type="text"
        v-model="tdName"
        @change="dirty = true"
      />
      <button @click="editing = !editing">
        {{ editing ? "Done" : "Edit" }}
      </button>
      <button @click="$emit('deleted')">
        Delete
      </button>
    </label>
  </div>
</template>
<script>
import ToDo from "../ToDo";

const MS_IN_DAY = 86400000;

export default {
  props: {
    doneAt: Date,
    name: String
  },
  data() {
    return {
      isDone: false,
      tdName: "",
      dirty: false,
      editing: false
    };
  },
  created() {
    this.tdName = this.name;
    this.isDone =
      this.doneAt &&
      this.doneAt.getDate &&
      this.doneAt.getDate() >= new Date().getDate() &&
      new Date() - this.doneAt < MS_IN_DAY;
  },
  computed: {
    tdDoneAt() {
      return this.dirty ? (this.isDone ? new Date() : "") : this.doneAt;
    }
  },
  watch: {
    tdDoneAt(newVal) {
      if (!this.dirty) return;
      this.$emit("change", new ToDo(newVal, this.tdName));
    },
    tdName(newVal) {
      if (!this.dirty) return;
      this.$emit("change", new ToDo(this.tdDoneAt, newVal));
    }
  }
};
</script>
<style></style>
