<template>
  <div class="choose">
    <div
      class="musicbtn"
      :class="{ buttonCss: isClicked === 'music' }"
      @click="change('music')"
    >
      <a>音乐{{ musicDone }}/14</a>
    </div>
    <div
      class="artbtn"
      :class="{ buttonCss: isClicked === 'art' }"
      @click="change('art')"
    >
      <a>美术{{ artDone }}/14</a>
    </div>
    <div class="push"></div>
    <div class="music">
      <p>一、简答题  (共12题 60分)</p>
      <div class="list" v-if="data">
        <div
          class="listItem"
          @click="toContentQuestion(index)"
          v-for="(item, index) in data"
          :key="index"
          :class="{
            selectCss: props.pos === index,
            completed: item.answer && item.nextBool,
          }"
        >
          {{ index + 1 }}
        </div>
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

const { questionInfo, pos, type } = toRefs(props)
let musicDone = ref(0)
let artDone = ref(0)
let isClicked = ref('music')
let clickPos = ref(0)

const data = ref(null)
const change = (changeType) => {
  isClicked.value = changeType
  if (type.value === changeType) {
    return
  } else {
    emitter.emit('changeCurrentType', [changeType, 'chan'])
  }
}

const toContentQuestion = (index) => {
  if (index  === pos.value ) return;
  clickPos.value = index + 1
  emitter.emit('toContentQuestion', clickPos.value)
}


emitter.on('updateQuestion', (typeFlag) => {
  let List = questionInfo.value
  if (typeFlag) {
    data.value = questionInfo.value[type.value == 'music' || type.value == 'musicChuang' ? 'art' : 'music']
  } else {
    type.value == 'music' || type.value == 'art' ? data.value = questionInfo.value[type.value] : ''
  }
  for (let i in List) {
    if (i == 'music' || i == 'musicChuang') {
      musicDone.value = List['music'].filter((item) => {
        return !!item.answer
      }).length + List['musicChuang'].filter((item) => {
        return !!item.answer
      }).length
    } else {
      artDone.value = List['art'].filter((item) => {
        return !!item.answer
      }).length + List['artChuang'].filter((item) => {
        return !!item.answer
      }).length
    }
  }
})
</script>

<style>
.push {
  width: 100px;
  height: 100px;
  background-color: #f7f7f7;
  opacity: 0%;
}
.choose {
  position: relative;
}
.musicbtn {
  width: 42%;
  height: 60px;
  background-color: #ffffff;
  text-align: center;
  line-height: 60px;
  font-size: 23px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin: 4% 0 0 8%;
  position: absolute;
  border: 3px solid #1ac36e;
  border-right: none;
}
.musicbtn a {
  text-decoration: none;
  color: #1ac36e;
  font-weight: bold;
}
.artbtn {
  width: 42%;
  height: 60px;
  background-color: #ffffff;
  text-align: center;
  line-height: 60px;
  font-size: 23px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: 4% 0 0 50%;
  position: absolute;
  border: 3px solid #1ac36e;
}
.artbtn a {
  text-decoration: none;
  color: #1ac36e;
  font-weight: bold;
}
.music {
  width: 377px;
  height: 330px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 6% 0 0 8%;
  border-radius: 10px;
  border: solid 1px #dff1e4;
  position: relative;
}
.music p {
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
  overflow-y: auto;
}
.listItem {
  width: 66px;
  height: 50px;
  background-color: #dff1e4;
  float: left;
  color: #1ac36e;
  font-size: 30px;
  text-align: center;
  line-height: 50px;
  box-sizing: border-box;
  border:3px solid #ffffff;
}
.selectCss {
  border: 3px solid orange !important;
}
.completed {
  background-color: #1ac36e !important;
  color: #ffffff !important;
}
.buttonCss {
  width: 42%;
  height: 60px;
  background-color: #1ac36e;
  text-align: center;
  line-height: 60px;
  font-size: 23px;
}
.buttonCss a {
  color: #ffffff;
}
</style>