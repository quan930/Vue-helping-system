<template>
    <div>
        <el-row>
            <el-col :span="4">
                <h1>Carry Page</h1>
            </el-col>
            <el-col :span="2" :offset="16">
                <el-button type="primary" v-on:click="showadd()">Carry</el-button>
            </el-col>
        </el-row>
        <el-row v-if="show">
            <el-col :span="6">
                <el-input
                        size="small"
                        placeholder="Please Enter The Content"
                        v-model="name"
                        clearable>
                    <template slot="prepend">Flight Number</template>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-input
                        size="small"
                        placeholder="Please Enter The Content"
                        v-model="tel"
                        clearable>
                    <template slot="prepend">PhoneNumber</template>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-date-picker
                        size="small"
                        v-model="datatime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm"
                        placeholder="Pick Date And Time">
                </el-date-picker>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" v-on:click="add()">Add</el-button>
            </el-col>
        </el-row>
        <el-table :data="newData"
                  height="500"
                  border
                  style="width: 100%">
            <el-table-column
                    prop="tel"
                    label="PhoneNumber">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="Flight Number">
            </el-table-column>
            <el-table-column
                    prop="datatime"
                    label="Date And Time">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'help-page',
        props: {
            helpAnds: Array
        },
        data(){
            return{
                newData:[],
                show:false,
                name:"",
                tel:"",
                datatime:"",
            }
        },
        watch: {
            // eslint-disable-next-line no-unused-vars
            helpAnds(val) {
                this.newData = this.helpAnds;
            }
        },
        methods:{
            //同意
            accept(index) {
                let that = this;
                this.$axios.post("http://lilq.cn:8989/accept",{
                    id:that.newData[index].id
                }).then(function (response) {
                    // console.log(response)
                    response.data.errorMsg

                    if (response.data.errorMsg==="SUCCESS"){
                        that.refresh();
                    }else {
                        alert("Server Exception")
                    }

                }).catch(function (error) {
                    console.log(error);
                });
            },
            //页面刷新
            refresh(){
                let that = this;
                this.$axios.get("http://lilq.cn:8989/helpands")
                    .then(function (response) {
                        if (response.data.errorMsg==="SUCCESS"){
                            that.newData=response.data.helpAnds
                        }else {
                            alert("Server Exception")
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            showadd(){
                this.show=!this.show
            },
            // 添加订单
            add(){
                let that = this;
                this.$axios.post("http://lilq.cn:8989/helpand",{
                    name:that.name,
                    tel:that.tel,
                    datatime:that.datatime
                }).then(function (response) {
                    console.log(response)
                    if (response.data.errorMsg==="SUCCESS"){
                        that.refresh()
                    }else {
                        alert("Server Exception")
                    }
                }).catch(function (error) {
                        console.log(error);
                    });
                this.show=false
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
