<template>
  <div class="container">
    <img src="@/assets/img/headPhoto.jpg" alt="">
    <p>姓名:{{student.name}} <br> 班级:{{student.grade}}</p>
  </div>
  <div class="grade">
    <img src="@/assets/img/title.jpg" alt="">
    <span>{{student.exam}}</span>
  </div>
</template>
<script setup>
import {reactive} from 'vue'
//许哥，我看到你给的demo才想起来学生信息也不能写死，所以偷个懒在这模拟一下数据嘿嘿^-^
const student = reactive({
  name:'梁祥杰',
  grade:'19物联网1班',
  exam:'四年级模拟考试'
})

</script>
<style>
.container{
    width: 82%;
    height: 15%;
    background-color: #ffffff;
    border-radius: 15px;
    margin:5% 0 0 10%;
    position: relative;
}
.container img{
    margin:9% 0 0 10% ;
}
.container p{
    position: absolute;
    top: 18%;
    left: 42%;
    font-size: 22px;
}
.grade{
    margin-top:4%;
    position: relative;
}
.grade span{
    position: absolute;
    top: 28%;
    left: 35%;
    color: #4084b8;
    font-size: 20px;
}
</style>