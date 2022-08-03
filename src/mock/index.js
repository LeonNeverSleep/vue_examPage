import Mock from "mockjs";

function params(url) { 
    let obj = {}
    let reg = /([^?=&]+)=([^?=&]+)/g
    url.replace(reg, (...arg) => {
        obj[arg[1]] = arg[2]
    })
    return obj
}

Mock.setup({
    timeout:'200-600',
})

const List = [
    {
        content:'1.周杰伦的专辑共有几张？',
        answer:'',
        nextBool: false,
        type:'music'
    },
    {
        content:'2.五线谱有哪些基本音符？',
        answer:'',
        nextBool: false,
        type:'music'
    },
    {
        content:'3.我国的音乐国粹是？',
        answer:'',
        nextBool: false,
        type:'music'
    },
    {
        content:'4.贝多芬被称为什么？',
        answer:'',
        nextBool: false,
        type:'music'
    },
    {
        content:'5.唱歌时应该注意哪些问题？',
        answer:'',
        nextBool: false,
        type:'music'
    },
    {
        content:'6.如何实现唱歌自由？',
        answer:'',
        nextBool: false,
        type:'music'
    },
    {
        content:'7.我国传统音乐的特点是什么？',
        answer:'',
        nextBool: false,
        type:'music'
    },
    {
        content:'8.我国传统乐器有哪些？',
        answer:'',
        nextBool: false,
        type:'music'
    },
    {
        content:'9.莫扎特的童年经历了什么？',
        answer:'',
        nextBool: false,
        type:'music'
    },
    {
        content:'10.我国最好的音乐学院是？',
        answer:'',
        nextBool: false,
        type:'music'
    },
    {
        content:'11.周杰伦下次发新专辑要等几年？',
        answer:'',
        nextBool: false,
        type:'music'
    },
    {
        content:'12.中国最伟大的音乐家是？',
        answer:'',
        nextBool: false,
        type:'music'
    },
    {
        content:'1.美术的起源是什么？',
        answer:'',
        nextBool: false,
        type:'art'
    },
    {
        content:'2.美术领域的爱因斯坦是指？',
        answer:'',
        nextBool: false,
        type:'art'
    },
    {
        content:'3.我国的美术国粹是？',
        answer:'',
        nextBool: false,
        type:'art'
    },
    {
        content:'4.我国最伟大的美术家是？',
        answer:'',
        nextBool: false,
        type:'art'
    },
    {
        content:'5.画画时应该注意哪些问题',
        answer:'',
        nextBool: false,
        type:'art'
    },
    {
        content:'6.如何实现美术自由？',
        answer:'',
        nextBool: false,
        type:'art'
    },
    {
        content:'7.我国传统美术的特点是什么？',
        answer:'',
        nextBool: false,
        type:'art'
    },
    {
        content:'8.我国传统美术作品有哪些？',
        answer:'',
        nextBool: false,
        type:'art'
    },
    {
        content:'9.齐白石的童年经历了什么？',
        answer:'',
        nextBool: false,
        type:'art'
    },
    {
        content:'10.我国最好的美术学院是？',
        answer:'',
        nextBool: false,
        type:'art'
    },
    {
        content:'11.齐白石擅长画什么？',
        answer:'',
        nextBool: false,
        type:'art'
    },
    {
        content:'12.国外美术领域的鼻祖是谁？',
        answer:'',
        nextBool: false,
        type:'art'
    },
    {
        content:'1.这是音乐创编题第一题哈哈哈哈哈哈哈哈哈',
        answer:'',
        nextBool: false,
        type:'musicChuang'
    },
    {
        content:'2.这是音乐创编题第二题嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿',
        answer:'',
        nextBool: false,
        type:'musicChuang'
    },
    {
        content:'1.美术创编题第一题哦哦哦哦哦噢噢哦哦',
        answer:'',
        nextBool: false,
        type:'artChuang'
    },
    {
        content:'2.美术创编题第二题wwwwwwwwww',
        answer:'',
        nextBool: false,
        type:'artChuang'
    }
]

Mock.mock('/mock/home','get',()=>{
    return List
})