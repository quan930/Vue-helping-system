<template>
    <div>
        <el-row>
            <el-col :span="4">
                <h1>EasyCarry</h1>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
<!--                <img src="./../assets/home.jpg" alt="" width="100%">-->
                <el-image
                        style="width: 100%;height:600px"
                        :src="url"></el-image>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'home-page',
        data(){
            return{
                url:"/assets/img/home.79f63b6f.jpg"
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
