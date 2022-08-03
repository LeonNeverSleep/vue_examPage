<template>
  <div class="left" v-if="data">
    <div v-if="props.type === 'music' || props.type === 'art'">
      <div class="questitle">
        <h1 v-text="data.content"></h1>
      </div>
      <div class="answer">
        <h1>作答:</h1>
        <textarea class="userInput" v-model="data.answer" @input="changeAnswer(data)"></textarea>
      </div>
    </div>
    <div v-else>
      <div class="questitle">
        <h1 v-text="quesChuang.content"></h1>
      </div>
      <div class="answer">
        <h1>作答:</h1>
        <textarea
          v-model="quesChuang.answer"
          @input="changeAnswer(quesChuang)"
        ></textarea>
      </div>
    </div>
    <div class="footer">
      <span>共{{ total }}题</span>
      <button class="lastone" :disabled="props.pos === 0" @click="last">
        上一题
      </button>
      <button class="nextone" :disabled="props.pos + 1 === 14" @click="next">
        下一题
      </button>
    </div>
  </div>
</template>

<script setup>
import emitter from '../utils/eventbus'
import { toRefs } from 'vue'

const props = defineProps({
  data: {
    type: [null, Object],
    default: () => ({})
  },
  quesChuang: {
    type: [null, Object],
    default: () => ({})
  },
  total: Number,
  pos: Number,
  type: String
})
const { pos, type } = toRefs(props)
const emit = defineEmits(['change'])

const last = () => {
  if (pos.value >= 13) {
    emitter.emit('onPreviousChuang', type.value === 'music' || type.value === 'musicChuang' ? 'musicChuang' : 'artChuang')
  } else {
    if (pos.value == 12) {
      emitter.emit('createToContent', type.value === 'music' || type.value === 'musicChuang' ? 'music' : 'art')
    } else {
      emit('change', pos.value == 0 ? 0 : pos.value - 1)
    }
  }
}
const changeAnswer = (data) => {
  if (!data.answer) {
    data.nextBool = false;
  }
}
const next = () => {
  if (pos.value >= 11) {
    emitter.emit('onNextChuang', type.value === 'music' || type.value === 'musicChuang' ? 'musicChuang' : 'artChuang')
  } else {
    emit('change', pos.value + 1)
  }
}
</script>

<style>
.left {
  background-image: url("@/assets/img/bg.jpg");
  width: 78%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.questitle {
  width: 60%;
  height: 10%;
  font-size: 18px;
  margin: 4% 0 0 7%;
  color: #495561;
  z-index: 2;
}
.answer {
  width: 60%;
  height: 10%;
  font-size: 18px;
  margin-left: 7%;
  color: #495561;
  position: relative;
}
.answer textarea {
  width: 125%;
  height: 464px;
  float: right;
  position: absolute;
  top: 4%;
  left: 12%;
  resize: none;
  background-color: #ffffff;
  border-radius: 10px;
  border: solid 1px #dff1e4;
  font-size: 32px;
  font-weight: bold;
  padding: 2% 0 0 2%;
  color: #495561;
  outline: none;
}
.footer span {
  position: absolute;
  top: 93%;
  left: 67%;
  font-size: 25px;
  color: #ffffff;
}
.lastone {
  top: 91%;
  left: 76%;
}
.nextone {
  top: 91%;
  left: 88%;
}
.footer button {
  position: absolute;
  width: 158px;
  height: 66px;
  background-color: #ffffff;
  text-align: center;
  line-height: 63px;
  font-size: 25px;
  border-radius: 15px;
  color: #1ac36e;
  border: none;
}
</style>