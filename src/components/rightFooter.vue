<template>
  <div class="rightfooter">
    <p>
      二、创编题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(共2题 40分)
    </p>
    <div class="list">
      <div
        class="listItem"
        @click="
          toQuestion(
            props.type == 'music' || props.type == 'musicChuang'
              ? [13 + index, 'musicChuang']
              : [13 + index, 'artChuang']
          )
        "
        v-for="(item, index) in data"
        :key="index"
        :class="{
          selectCss: props.pos === 12 + index && props.pos > 11,
          completed: item.answer && item.nextBool,
        }"
      >
        {{ index + 1 }}
      </div>
    </div>
  </div>
</template>

<script setup>
import emitter from '../utils/eventbus'
import { ref, toRefs } from 'vue';

const props = defineProps({
  questionInfo: {
    type: [null, Object],
    default: () => ({})
  },
  pos: Number,
  type: String
})

const { questionInfo, type } = toRefs(props)

let musicDone = ref(0)
let artDone = ref(0)
let isClicked = ref('music')
let clickPos = ref(0)
const data = ref(null)

const toQuestion = (n) => {
  emitter.emit('toChuangQuestion', n)
}


emitter.on('updateQuestion', (typeFlag) => {
  let List = questionInfo.value
  if (typeFlag) {
    data.value = questionInfo.value[type.value == 'music' || type.value == 'musicChuang' ? 'artChuang' : 'musicChuang']
  } else {
    type.value == 'music' || type.value == 'musicChuang' ? data.value = questionInfo.value['musicChuang'] : data.value = questionInfo.value['artChuang']
  }
  for (let i in List) {
    if (i == 'music') {
      musicDone.value = List[i].filter((item) => {
        return !!item.answer
      }).length
    } else {
      artDone.value = List[i].filter((item) => {
        return !!item.answer
      }).length
    }
  }
})

</script>

<style>
.rightfooter {
  width: 377px;
  height: 184px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 8% 0 0 8%;
  border-radius: 10px;
  border: solid 1px #dff1e4;
  position: relative;
}
.rightfooter p {
  margin-left: 10px;
  font-size: 20px;
  font-weight: 600;
}
.list {
  width: 375px;
  height: 170px;
  position: absolute;
  top: 32%;
  left: 8%;
}
.listItem {
  width: 75px;
  height: 52px;
  background-color: #dff1e4;
  float: left;
  margin: 2px;
  color: #1ac36e;
  font-size: 30px;
  text-align: center;
  line-height: 52px;
  border:3px solid #ffffff
}
</style>