<template>
  <div class="xtx-info">
    <div class="info">
      <p class="title" v-if="covidInfo[0]">
        <i></i>
        {{ covidInfo[0].title }}
      </p>
      <div class="content" v-if="covidInfo[0]">
        详情：
        <p>{{ covidInfo[0].summary }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XtxInfo',
  props: {
    covidInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.info {
  padding: 0.16rem;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
}
.title {
  font-size: 0.17rem;
}

.title i {
  display: inline-block;
  width: 0.04rem;
  height: 0.16rem;
  margin-right: 0.03rem;
  vertical-align: middle;
  background: #4169e2;
}
.content {
  padding: 0.06rem 0.16rem;
}

.content p {
  font-size: 13px;
  margin: 5px 0;
}
</style>
