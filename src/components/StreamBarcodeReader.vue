<template>
  <div>
    <div class="scanner-container">
      <div class="camera">
        <video poster="data:image/gif,AAAA" ref="scanner" autoplay playsinline muted id="video"/>
        <!--        <div class="overlay-element"></div>-->
        <div class="laser"></div>
      </div>
    </div>
    <button @click="onSnap()" style="position: fixed"> snap</button>
    <img ref="img1">
    <img ref="img2" style="margin-left: 1em">
  </div>
</template>

<script>
import {qr} from '../service/decoder';

export default {
  name: 'stream-barcode-reader',
  data() {
    return {
      img: '',
      histories: [],
      stream: null
    };
  },
  async mounted() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: {
          ideal: 'environment'
        }
      }
    });
    this.$refs.scanner.srcObject = this.stream;
  },
  methods: {
    async onSnap() {
      const data = qr.decode(this.$refs.scanner, [this.$refs.img1, this.$refs.img2]);
      if (data) {
        // context.drawImage(binaryBitmap, 0, 0, canvas.width, canvas.height);
        console.log(data);
      }
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
  width: 1px;
  margin-left: calc(50% - 1px);
  background-color: tomato;
  height: 100%;
  position: absolute;
  top: 0px;
  z-index: 2;
  box-shadow: 0 0 4px red;
  /*-webkit-animation: scanning 2s infinite;*/
  /*animation: scanning 2s infinite;*/
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
