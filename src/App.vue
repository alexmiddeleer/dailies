<template>
  <div id="app">
    Dailies <button>Add</button>
    <ToDo name="foo" @change="$log($event)" @deleted="$log('deleted')" />
    <ToDo name="bar" :doneAt="new Date('9-15-1989')" @change="$log($event)" />
    <ToDo name="baz" :doneAt="new Date()" @change="$log($event)" />
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

export default {
  name: "App",
  components: {
    ToDo
  },
  methods: {
    $log: console.log
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
