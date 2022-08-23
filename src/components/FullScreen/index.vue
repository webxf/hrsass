<template>
  <div style="margin: 0 8px">
    <SvgIcon
      className="fullscreen"
      iconClass="fullscreen"
      @click="onFullScreen"
    ></SvgIcon>
  </div>
</template>

<script>
import SvgIcon from '../SvgIcon/index.vue'
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },
  created() {},
  methods: {
    onFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    },
  },
  components: { SvgIcon },
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
}
</style>
