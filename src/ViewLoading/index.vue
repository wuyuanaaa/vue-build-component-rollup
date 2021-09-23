<template>
  <div class="ycb-view-loading">
    <template v-if="status==='loading'">
      <slot v-if="$scopedSlots.loading" name="loading" />
      <div v-else class="ycb-view-loading__loading">
        <span class="ycb-view-loading-spinner">
          <svg class="ycb-view-loading-circular" viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20" fill="none" />
          </svg>
        </span>
        <span class="ycb-view-loading-text">
          加载中...
        </span>
      </div>
    </template>

    <template v-if="status==='success'">
      <slot />
      <div class="_empty" />
    </template>

    <template v-if="status==='fail'">
      <slot v-if="$scopedSlots.fail" name="fail" />
      <div v-else class="ycb-view-loading__fail" @click="reload">
        加载失败，点击重试。
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'YcbViewLoading',
  props: {
    load: {
      type: Function,
      required: true,
      validator: val => {
        if (!Object.prototype.toString.call(val) === '[object Function]') {
          console.error('ViewStatus props load Must be Function')
          return false
        }
        return true
      }
    }
  },
  data() {
    return {
      status: 'loading'
    }
  },
  mounted() {
    this.handleLoad()
  },
  methods: {
    handleLoad() {
      if (!this.load || typeof this.load !== 'function') {
        return
      }

      const p = this.load()

      if (p && p.then) {
        p.then(() => {
          this.status = 'success'
        })
          .catch(e => {
            console.log(`YcbViewLoading err ${e}`)
            this.status = 'fail'
          })
      }
    },
    reload() {
      this.status = 'loading'
      this.handleLoad()
    }
  }
}
</script>

<style lang="scss">
.ycb-view-loading {
  .ycb-view-loading__loading, .ycb-view-loading__fail {
    position: relative;
    margin-top: 10px;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    z-index: 1;
  }

  .ycb-view-loading__loading {
    color: #c8c9cc;
  }

  .ycb-view-loading-spinner {
    position: relative;
    display: inline-block;
    width: 16px;
    max-width: 100%;
    height: 16px;
    max-height: 100%;
    vertical-align: middle;
    animation: rotate 2s linear infinite;
    .ycb-view-loading-circular {
      display: block;
      width: 100%;
      height: 100%;

      circle {
        animation: circular 1.5s ease-in-out infinite;
        stroke: currentColor;
        stroke-width: 3;
        stroke-linecap: round;
      }
    }
  }

  .ycb-view-loading-text {
    display: inline-block;
    margin-left: 8px;
    vertical-align: middle;
    color: #969799;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
  @keyframes circular {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40;
    }

    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120;
    }
  }
}

</style>

