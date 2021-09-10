<template>
  <div id="app">
    <StreamBarcodeReader />
  </div>
</template>

<script>
import StreamBarcodeReader from './components/StreamBarcodeReader.vue';

export default {
  name: 'App',
  components: {
    StreamBarcodeReader
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>