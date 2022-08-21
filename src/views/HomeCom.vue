<template>
  <div class="home-com">
    <XtxHeader></XtxHeader>
    <XtxInfo :covidInfo="covidInfo"></XtxInfo>
    <XtxCase :covidNum="covidNum"></XtxCase>
    <XtxMap></XtxMap>
  </div>
</template>

<script>
import api from '@/api/index.js'
import XtxHeader from '@/components/Header/XtxHeader.vue'
import XtxInfo from '@/components/Info/XtxInfo.vue'
import XtxCase from '@/components/Case/XtxCase.vue'
import XtxMap from '@/components/Map/XtxMap.vue'

export default {
  name: 'HomeCom',
  components: { XtxHeader, XtxInfo, XtxCase, XtxMap },
  data() {
    return {
      // 疫情信息
      covidInfo: {},
      covidNum: {}
    }
  },
  mounted() {
    api.getNcov({ key: '516509c3491e63519d5a4038ea9f8649' }).then(res => {
      if (res.status === 200) {
        this.covidInfo = res.data.newslist[0].news
        this.covidNum = res.data.newslist[0].desc
        console.log(this.covidNum)
      }
    })
  }
}
</script>
