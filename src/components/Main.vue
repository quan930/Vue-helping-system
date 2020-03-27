<template>
    <div id="app" style="height: 100vh">
        <el-container id="con">
            <el-aside width="150px">
                <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        @select="showPage">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">Intro Page</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">FLIGHT</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">REQUEST</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">CARRY</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <home-page v-if="view==='1'"></home-page>
                <routes-page v-if="view==='2'"></routes-page>
                <bandfinding-page v-if="view==='3'" v-bind:band-findings="bandFindings"></bandfinding-page>
                <help-page v-if="view==='4'" v-bind:help-ands="helpAnds"></help-page>
<!--                <store-page v-if="view==='4'" v-bind:hotels="hotels"></store-page>-->
            </el-main>
        </el-container>
    </div>
</template>

<script>
    // import './home-page'

    import HomePage from "./home-page";
    import HelpPage from "./help-page";
    import RoutesPage from "./routes-page"
    import BandfindingPage from "./bandfinding-page"

    export default {
        name: 'Main',
        components: {HomePage,HelpPage,RoutesPage,BandfindingPage},
        data () {
            return {
                view:'1',
                //求带信息
                bandFindings:[],
                //店家数据
                helpAnds:[],
            }
        },
        methods:{
            /**
             * 切换视图
             * @param index
             * @param indexPath
             */
            // eslint-disable-next-line no-unused-vars
            showPage(index, indexPath) {
                switch (index) {
                    case '1':
                        // console.log("首页面");
                        break;
                    case '2':
                        break;
                    case '3':
                        // eslint-disable-next-line no-case-declarations
                        let that = this;
                        this.$axios.get("http://lilq.cn:8989/bandfindings")
                            .then(function (response) {
                                if (response.data.errorMsg==="SUCCESS"){
                                    that.bandFindings=response.data.bandFindings
                                }else {
                                    alert("Server Exception")
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        break;
                    case '4':
                        // eslint-disable-next-line no-unused-vars,no-case-declarations
                        let that2 = this;
                        this.$axios.get("http://lilq.cn:8989/helpands")
                            .then(function (response) {
                                console.log(response)
                                if (response.data.errorMsg==="SUCCESS"){
                                    that2.helpAnds=response.data.helpAnds
                                    // console.log(that2.helpAnds)
                                }else {
                                    alert("Server Exception")
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                }
                this.view = index;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-aside {
        background-color: #545c64;
        color: #333;
        height: 100%;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        height: 100%;
    }
    #con{
        height: 100%;
    }
    .el-menu{
        border: 0;
    }
</style>
