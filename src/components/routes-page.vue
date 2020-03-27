<template>
    <div>
        <el-row>
            <el-col :span="4">
                <h1>Search Flight</h1>
            </el-col>
            <el-col :span="4" :offset="5">
                <el-date-picker
                        v-model="datatime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="pick Date">
                </el-date-picker>
            </el-col>
            <el-col :span="4">
                <el-row>
                    <span style="letter-spacing:2px;display:inline-block;padding-left: 10px;">Departure</span>
                </el-row>
                <el-row>
                    <span style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 5px;color: #42b983">{{dep}}</span>
                </el-row>
            </el-col>
            <el-col :span="1">
                <el-button type="primary" icon="el-icon-refresh" circle v-on:click="myswitch()"></el-button>
            </el-col>
            <el-col :span="4">
                <el-row>
                    <span style="letter-spacing:2px;display:inline-block;padding-left: 10px;">Arrival</span>
                </el-row>
                <el-row>
                    <span style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 5px;color: #ff7a14">{{arr}}</span>
                </el-row>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" v-on:click="query()">Search</el-button>
            </el-col>
        </el-row>
        <el-table :data="routes"
                  height="500"
                  border
                  style="width: 100%">
            <el-table-column
                    prop="name"
                    label="Flight Number">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="Date">
            </el-table-column>
            <el-table-column
                    prop="company"
                    label="Airline Company">
            </el-table-column>
            <el-table-column
                    prop="dep"
                    label="Departure Airport">
            </el-table-column>
            <el-table-column
                    prop="arr"
                    label="Arrival Airport">
            </el-table-column>
            <el-table-column
                    prop="depTime"
                    label="Estimate Departure Time">
            </el-table-column>
            <el-table-column
                    prop="arrTime"
                    label="Estimate Arrival Time">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'routes-page',
        data(){
            return{
                datatime:"",
                dep:"BeiJing",//开始地
                arr:"Toronto",//目的地
                routes:[]
            }
        },
        methods: {
            //切换目的地
            myswitch() {
                let temp = this.arr;
                this.arr = this.dep;
                this.dep = temp;
            },
            query(){
                let url = "http://lilq.cn:8989/query?dep=".concat(this.dep==="BeiJing"?"BJS":"YTO","&arr=",this.arr==="Toronto"?"BJS":"YTO","&date=",this.datatime);
                console.log(url)
                let that = this;
                this.$axios.get(url)
                    .then(function (response) {
                        if (response.data.reason==="成功"){
                            console.log("SUCCESS")
                            that.routes=response.data.routes
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        margin: 10px 0px 10px 40px;
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
