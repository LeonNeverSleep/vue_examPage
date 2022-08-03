<template>
  <div class="right">
    <handOver :questionInfo="props.questionInfo" />
    <mainInfo />
    <questionCart
      :questionInfo="props.questionInfo"
      :pos="props.pos"
      :type="props.type"
    />
    <rightFooter :questionInfo="props.questionInfo" :pos="props.pos" :type="props.type" />
  </div>
</template>

<script setup>
import handOver from '@/components/handOver.vue'
import mainInfo from '@/components/mainInfo.vue'
import questionCart from '@/components/questionCart.vue'
import rightFooter from '@/components/rightFooter.vue'

const props = defineProps({
  questionInfo: {
    type: [null, Object],
    default: () => ({})
  },
  pos: Number,
  type: String
})

</script>

<style>
.right {
  position: fixed;
  left: 78%;
  top: 0%;
  width: 22%;
  height: 100%;
  background-color: #f7f7f7;
  float: right;
}
.right img {
  margin-left: 8%;
}
</style>