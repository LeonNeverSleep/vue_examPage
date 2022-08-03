<template>
  <div class="home">
    <leftView
      :data="quesContent"
      :quesChuang="quesChuang"
      :total="total"
      :pos="index"
      @change="updateView"
      :type="type"
    />
    <rightView :questionInfo="questionInfo" :pos="index" :type="type" />
  </div>
</template>

<script setup>
import emitter from '../utils/eventbus'
import leftView from './leftView.vue'
import rightView from './rightView.vue'
import { getQuestions } from '@/http/question.js'
import { ref, onBeforeMount } from 'vue'

let questionInfo = {}
let index = ref(0)
let type = ref("music")
let lastIndex = ref(0);
let lastType = ref("music");
let initValue = ref(0)
const list = ref([])
const quesContent = ref(null)
const quesChuang = ref(null)
const total = ref(0)


const updateView = (nextValue = 0, changeType, typeFlag) => {
  lastIndex.value = index.value;
  lastType.value = type.value;
  type.value = changeType || type.value;
  index.value = nextValue
  if (type.value == 'music' || type.value == 'art') {
    if (questionInfo[type.value]) {
      quesContent.value = questionInfo[type.value][nextValue]
      total.value = questionInfo[type.value].length
    }
  } else {
    if (questionInfo[type.value]) {
      if (questionInfo[type.value == 'musicChuang' ? 'music' : 'art'][11].answer) {
        questionInfo[type.value == 'musicChuang' ? 'music' : 'art'][11].nextBool = true
      } else {
        questionInfo[type.value == 'musicChuang' ? 'music' : 'art'][11].nextBool = false;
      }
      quesChuang.value = questionInfo[type.value][nextValue - 12]
      total.value = questionInfo[type.value].length
    }
  }
  if (initValue.value !== 0) {
    const lastQuestion = questionInfo[lastType.value][
    lastType.value === type.value 
    && lastType.value !== 'musicChuang' 
    && lastType.value !== 'artChuang' ? lastIndex.value : (lastType.value === 'musicChuang'
    || lastType.value === 'artChuang' ? lastIndex.value - 12 : lastIndex.value)
    ]
    if (lastQuestion.answer) {
      lastQuestion.nextBool = true
    } else {
      lastQuestion.nextBool = false;
    }
  }
  if(typeFlag){
    initValue.value = 0;
    questionInfo[lastType.value].forEach(item => {
      if(item.answer){
        item.nextBool = true
      }
    })
  }
  emitter.emit('updateQuestion', typeFlag)
  initValue.value++
}


emitter.on('updateHome', changeType => {
  updateView(0, changeType)
})
emitter.on('changeCurrentType', changeType => {
  updateView(0, changeType[0], changeType[1])
})
emitter.on('onNextChuang', changeType => {
  updateView(index.value + 1, changeType)
})
emitter.on('onPreviousChuang', changeType => {
  updateView(index.value - 1, changeType)
})
emitter.on('createToContent', changeType => {
  updateView(11, changeType)
})
emitter.on('toContentQuestion', (toPos) => {
  updateView(toPos - 1, type.value == 'musicChuang' || type.value == 'music' ? 'music' : 'art')
})
emitter.on('toChuangQuestion', (toPos) => {
  updateView(toPos[0] - 1, toPos[1])
})
onBeforeMount(async () => {
  const { status, data } = await getQuestions()
  if (status === 200) {
    list.value = data
    data.forEach(item => {
      questionInfo[item.type] = [...(questionInfo[item.type] || []), item]
    })
    updateView()
  }
})
</script>
