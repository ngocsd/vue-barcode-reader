<template>
  <div>
    <div class="scanner-container">
      <div class="camera">
        <video poster="data:image/gif,AAAA" ref="scanner" autoplay playsinline muted id="video"/>
        <div class="overlay-element"/>
      </div>
      <div class="fixed">
        <button @click="onSnap()"> snap</button>
        <input type="text" v-model="pattenStr">
      </div>
    </div>
    <hr>
    <ul :key="key">
      <li v-for="item in msgs" :key="key">
        {{ JSON.stringify(item) }}
      </li>
    </ul>
  </div>
</template>

<script>
import {qr} from '../service/decoder';

export default {
  name: 'stream-barcode-reader',
  data() {
    return {
      key: 0,
      msgs: {},
      pattenStr: '10-50;  50-90; 35-75; 40-70;',
      histories: [],
      stream: null,
      interval: null
    };
  },
  async mounted() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 1024,
        height: 1024,
        facingMode: {
          ideal: 'environment'
        }
      }
    });
    this.$refs.scanner.srcObject = this.stream;
  },
  computed: {
    pattern() {
      return this.pattenStr.split(';')
          .filter(item => !!item)
          .map(str => str.trim().split('-').map(val => Number(val)));
    }
  },
  methods: {
    async onSnap() {
      // Array.from(document.querySelectorAll('img')).forEach(item => item.remove())
      // console.log(this.pattern);
      if (this.interval) {
        clearInterval(this.interval);
        this.msgs = {};
      }
      const $this = this;
      this.interval = setInterval(() => {
        const data = qr.decode(this.$refs.scanner, this.pattern);
        for (const d of data) {
          if (!$this.msgs[d.parity]) {
            $this.msgs[d.parity] = [];
          }
          const p = $this.msgs[d.parity];
          if (!p[d.splitIndex]) {
            p[d.splitIndex] = d.text;
            $this.key++;
          }
        }
      }, 50);
    }
  }
};
</script>

<style scoped>
video {
  max-width: 85vh;
  max-height: 85vw;
}

.camera {
  position: relative;
}

.fixed {
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
  background: rgba(30, 30, 30, 0.7);
  box-sizing: border-box;

  -webkit-clip-path: polygon(
      0% 0%,
      0% 100%,
      10% 67%,
      10% 33%,
      90% 33%,
      90% 67%,
      0% 67%,
      0% 100%,
      100% 100%,
      100% 0%
  );
  clip-path: polygon(
      0% 0%,
      0% 100%,
      10% 67%,
      10% 33%,
      90% 33%,
      90% 67%,
      0% 67%,
      0% 100%,
      100% 100%,
      100% 0%
  )
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
  top: calc(51% / 2);
}

.laser.left {
  margin-left: calc(100% / 3 - 1px);
  background-color: yellow;
  height: 33%;
  top: calc(67% / 2);
}

.laser.right {
  margin-left: calc(100% / 3 * 2 - 1px);
  background-color: yellow;
  height: 33%;
  top: calc(67% / 2);
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
