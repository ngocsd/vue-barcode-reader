<template>
  <div>
    <div class="scanner-container">
      <div class="camera">
        <video poster="data:image/gif,AAAA" ref="scanner" autoplay playsinline muted id="video"/>
        <!--        <div class="overlay-element"></div>-->
        <div class="laser center" />
        <div class="laser left" />
        <div class="laser right" />
      </div>
    </div>
    <button @click="onSnap()" class="button"> snap</button>
    {{ msgs }}
    <hr>
  </div>
</template>

<script>
import {qr} from '../service/decoder';

export default {
  name: 'stream-barcode-reader',
  data() {
    return {
      msgs: '',
      histories: [],
      stream: null
    };
  },
  async mounted() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 640,
        height: 480,
        facingMode: {
          ideal: 'environment'
        }
      }
    });
    this.$refs.scanner.srcObject = this.stream;
  },
  methods: {
    async onSnap() {
      Array.from(document.querySelectorAll('img')).forEach(item => item.remove())
      const data = qr.decode(this.$refs.scanner);
      this.msgs = data.map(item => item?.text)
      console.log(data);
    }
  }
};
</script>

<style scoped>
video {
  max-width: 100%;
  max-height: 100%;
}

.camera {
  position: relative;
}
.button {
  position: fixed;
  top: 5%;
}

.scanner-container {
  display: flex;
  justify-content: center;
}

.overlay-element {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
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
      0 0,
      0 100%,
      100px 100px,
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
  width: 2px;
  position: absolute;
  z-index: 2;
  /*-webkit-animation: scanning 2s infinite;*/
  /*animation: scanning 2s infinite;*/
}

.laser.center {
  margin-left: calc(50% - 1px);
  background-color: tomato;
  height: 49%;
  top: calc(51%/2);
}
.laser.left {
  margin-left: calc(100%/3 - 1px);
  background-color: yellow;
  height: 33%;
  top: calc(67%/2);
}
.laser.right {
  margin-left: calc(100%/3*2 - 1px);
  background-color: yellow;
  height: 33%;
  top: calc(67%/2);
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
