<template>
  <div>
    <div class="scanner-container">
      <div style="position: relative">
        <video poster="data:image/gif,AAAA" ref="scanner" autoplay playsinline muted id="video"/>
        <div class="overlay-element"></div>
        <div class="laser"></div>
      </div>
    </div>
    {{ msg }}<br>
    histories:
    <ul>
      <li v-for="item of histories"> {{ item }}</li>
    </ul>
  </div>
</template>

<script>
import {qr} from '../service/decoder';

export default {
  name: 'stream-barcode-reader',
  data() {
    return {
      msg: '',
      histories: []
    };
  },
  async mounted() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: {
          ideal: 'environment'
        }
      }
    });
    this.$refs.scanner.srcObject = stream;
    setInterval(() => {
      const result = qr.decode(document.getElementById('video'));
      if (!result) return;
      this.msg = result.text;
      this.histories.unshift(result.text);
    }, 500);
  },
  methods: {
    onDecode() {
      this.msg = qr.decode(document.getElementById('video'));
    }
  }
};
</script>

<style scoped>
video {
  max-width: 100%;
  max-height: 100%;
}

.scanner-container {
  display: flex;
  justify-content: center;
}

.overlay-element {
  position: absolute;
  top: 0;
  width: 100%;
  height: 99%;
  background: rgba(30, 30, 30, 0.5);

  -webkit-clip-path: polygon(
      0% 0%,
      0% 100%,
      3% 100%,
      3% 3%,
      97% 3%,
      97% 97%,
      3% 97%,
      3% 100%,
      100% 100%,
      100% 0%
  );
  clip-path: polygon(
      0% 0%,
      0% 100%,
      3% 100%,
      3% 3%,
      97% 3%,
      97% 97%,
      3% 97%,
      3% 100%,
      100% 100%,
      100% 0%
  );
}

.laser {
  width: 94%;
  margin-left: 3%;
  background-color: tomato;
  height: 1px;
  position: absolute;
  top: 40%;
  z-index: 2;
  box-shadow: 0 0 4px red;
  -webkit-animation: scanning 2s infinite;
  animation: scanning 2s infinite;
}

@-webkit-keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}

@keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}
</style>
