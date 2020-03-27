<template>
    <div>
        <div>
            <el-row>
                <el-col :span="4">
                    <h1>Request Page</h1>
                </el-col>
                <el-col :span="2" :offset="16">
                    <el-button type="primary" v-on:click="showadd()">Request</el-button>
                </el-col>
            </el-row>
            <el-row v-if="show">
                <el-col :span="18">
                    <el-row>
                        <el-col :span="12">
                            <el-input
                                    size="small"
                                    placeholder="Please Enter The Content"
                                    v-model="name"
                                    clearable>
                                <template slot="prepend">Requested Item</template>
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input
                                    size="small"
                                    placeholder="Please Enter The Content"
                                    v-model="tel"
                                    clearable>
                                <template slot="prepend">PhoneNumber</template>
                            </el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-input
                                    size="small"
                                    placeholder="Please Enter The Content"
                                    v-model="placeOfPurchase"
                                    clearable>
                                <template slot="prepend">Purchased Place</template>
                            </el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-input
                                    size="small"
                                    placeholder="Please Enter The Content"
                                    v-model="arr"
                                    clearable>
                                <template slot="prepend">Destination</template>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-date-picker
                                    size="small"
                                    v-model="data"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="Pick Date">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="4">
                    <el-row>
                        <el-col :span="4" :offset="4">
                            <el-button type="primary" v-on:click="add()">Add</el-button>
                        </el-col>
                    </el-row>
                </el-col>


            </el-row>
            <el-table :data="newData"
                      height="500"
                      border
                      style="width: 100%">
                <el-table-column
                        prop="name"
                        label="Requested Item">
                </el-table-column>
                <el-table-column
                        prop="tel"
                        label="PhoneNumber">
                </el-table-column>
                <el-table-column
                        prop="placeOfPurchase"
                        label="Purchased Place">
                </el-table-column>
                <el-table-column
                        prop="arr"
                        label="Destination">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="Expected Time">
                </el-table-column>
                <el-table-column label="Status">
                    <template slot-scope="scope">

                        <span v-if="newData[scope.$index].state==='1'">
                            Accepted
                        </span>
                        <el-button v-else size="mini" type="danger" v-on:click="accept(scope.$index)">Online</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'help-page',
        props: {
            bandFindings: Array,
        },
        data(){
            return{
                newData:[],
                show:false,
                name:"",
                tel:"",
                placeOfPurchase:"",
                arr:"",
                data:"",
            }
        },
        watch: {
            // eslint-disable-next-line no-unused-vars
            bandFindings(val) {
                this.newData = this.bandFindings;
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
                        alert("Error")
                    }

                }).catch(function (error) {
                        console.log(error);
                });
            },
            //页面刷新
            refresh(){
                let that = this;
                this.$axios.get("http://lilq.cn:8989/bandfindings")
                    .then(function (response) {
                        if (response.data.errorMsg==="SUCCESS"){
                            that.newData=response.data.bandFindings
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
                this.$axios.post("http://lilq.cn:8989/bandfinding",{
                    name:that.name,
                    tel:that.tel,
                    placeOfPurchase:that.placeOfPurchase,
                    arr:that.arr,
                    date:that.data
                }).then(function (response) {
                        // console.log(response)
                        if (response.data.errorMsg==="SUCCESS"){
                            that.refresh()
                        }else {
                            alert("Server Exception")
                        }
                    })
                    .catch(function (error) {
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
