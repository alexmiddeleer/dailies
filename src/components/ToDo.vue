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
    </label>
  </div>
</template>
<script>
import ToDo from "../ToDo";

export default {
  props: {
    doneAt: String,
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
    this.isDone = !!this.doneAt;
  },
  computed: {
    tdDoneAt() {
      return this.dirty ? (this.isDone ? new Date() : "") : this.isDone;
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
