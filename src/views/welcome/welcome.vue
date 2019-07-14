<template>
    <div class="wecome">
        <img src="../../assets/images/welcome.jpg" alt="">
    </div>
</template>

<script>
export default {
//   created () {
//     this.$ajax.get('articles').then(res => console.log(res.data))
//   }
}
</script>

<style lang='less'>
    .wecome{
        img{
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%,16%);
    }
    }
</style>
