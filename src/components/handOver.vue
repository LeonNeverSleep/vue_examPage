<template>
  <div class="handover">
    <div class="top">
      <img src="../assets/img/time.jpg" alt="" />
      <h1 id="resttime"></h1>
      <button :disabled="endFlag === 1 ? true : false" @click="handleSubmit()">
        交卷
      </button>
    </div>
  </div>
  <teleport v-if="endFlag === 1" to="body">
      <div class="freeze"></div>    
  </teleport>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  questionInfo: {
    type: [null, Object],
    default: () => ({})
  }
})
let isCompleted = true;
let restTime = 3600;
let endFlag = ref(0);
let timing;
let getList = props.questionInfo


function showTime() {
  timing = setInterval(() => {
    countDown()
  }, 1000);
}
function countDown() {
  let List = getList
  if (restTime > 0) {
    restTime--;
    var hours = Math.floor(restTime / 60 / 60);
    var minutes = Math.floor(restTime / 60);
    var seconds = restTime % 60;
    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes };
    if (seconds < 10) { seconds = "0" + seconds };
    document.getElementById('resttime').innerHTML = hours + ":" + minutes + ":" + seconds;
  } else {
    clearInterval(timing);
    alert("考试时间到，已自动交卷!");
    endFlag.value = 1;
    console.log(List);
  }
}

const handleSubmit = () => {
  let List = getList
  let musicNum = 0
  let artNum = 0
  for (let i in List) {
    List[i].forEach(item => {
      if (!item.answer) {
        i === 'music' || i === 'musicChuang' ? musicNum++ : artNum++
      }
    })
  }
  for (let i in List) {
    if (List[i].some(item => !item.answer)) {
      isCompleted = false
      let flag = confirm(`${musicNum > 0 ? '音乐题还有' + musicNum + '题未完成' : ''}${artNum > 0 ? '、美术题还有' + artNum + '题未完成' : ''}，确认提交吗?`)
      if (flag == true) {
        break
      } else {
        return
      }
    }
  }
  console.log(List)
  clearInterval(timing);
  document.getElementById('resttime').innerHTML = "00" + ":" + "00" + ":" + "00";
  alert('交卷成功!')
  endFlag.value = 1;
}
onMounted(() => {
  showTime()
})
</script>

<style>
.handover{
  margin-top: 2%;
}
.top img {
  width: 10%;
  height: 10%;
  margin: 6% 0 0 7%;
}
.top {
  position: relative;
}
.top h1 {
  color: #ff812d;
  font-size: 37px;
  width: 40%;
  height: 10%;
  float: right;
  position: absolute;
  top: -5%;
  left: 20%;
}
.top button {
  position: absolute;
  width: 148px;
  height: 62px;
  background-color: #1ac36e;
  text-align: center;
  line-height: 63px;
  font-size: 25px;
  border-radius: 15px;
  color: #ffffff;
  border: none;
  top: 15%;
  left: 62%;
}
.freeze{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ff812d;
  opacity: 0;
}
</style>