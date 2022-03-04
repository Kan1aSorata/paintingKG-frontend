<template>
    <div class="detail-container">
        <!-- 两栏布局 -->
        <div class="painting-cnt">
            <div class="left-cnt">
                <img :src="painterDetail.image" class="pic" alt="pic1" />
            </div>
            <div class="right-cnt">
                <el-card class="box-card">
                    <div class="title"><i class="el-icon-reading"></i> Painter </div>
                    <div class="item"> <el-tag>name</el-tag> <span class="font">{{painterDetail.name}}</span></div>
                    <div class="item"> <el-tag type="success">Country</el-tag> <span class="font">{{painterDetail.country}}</span></div>
                    <div class="item"> <el-tag type="warning">Birth</el-tag> <span class="font">{{painterDetail.birth}}</span></div>
                    <div class="item"> <el-tag type="danger">Death</el-tag> <span class="font">{{painterDetail.death}}</span></div>

                    <el-divider content-position="center" class="divider">Painter Description</el-divider>

                    <div class="painting-description-cnt">
                        <div class="empty-cnt" v-if="false">
                            <img src="../../assets/empty.png" alt="empty" class="empty"/>
                            <p class="empty-text">Description is currently empty</p>
                        </div>

                        <div class="desc">
                          {{painterDetail.description}}
                        </div>
                    </div>

                </el-card>
            </div>
        </div>

        <div class="painting-drawer-cnt" id="painting-drw-cnt">
            <div class="swipe-cnt">
                <div class="item" @click="routeToPainting(item.id)" v-for="item in madeList" :key="item.id">
                    <img :src="item.picture" class="background" alt="img1" />
                    <span class="title">{{item.name}}</span>
                </div>
            </div>
        </div>


        <div id="test-canvas" style="width:100%; height: 500px;"></div>
    </div>
</template>

<script>
    import Chart from 'roc-charts';
    export default {
        name: "Painter",
        data() {
            return {
                madeList: [],
                painterDetail:{},
                painterId:1,
                chart: null,
                chartData: {
                    nodes: [
                        {
                            id: '1',  // 节点的 id (必选)
                            name: '测试节点1',  // 图谱中显示在节点下面的文字
                            extend: false, // 节点是否可扩展。隐藏节点相关功能，为 true 时右上角显示可扩展+号图标
                            selected: false,  // 是否处于选中状态。选中时会显示边框
                            degree: 0,  // 节点度数，主要用于层级类图
                            style: {  // 节点样式
                                image: this.imgTest,  // 节点图标 dataURI
                                hide: false,  // 是否隐藏节点
                                // 节点的半径，优先级高于 size
                                r: 30,
                            }
                        },
                        {
                            id: '2',  // 节点的 id (必选)
                            name: '测试节点2',  // 图谱中显示在节点下面的文字
                            extend: false, // 节点是否可扩展。隐藏节点相关功能，为 true 时右上角显示可扩展+号图标
                            selected: false,  // 是否处于选中状态。选中时会显示边框
                            degree: 0,  // 节点度数，主要用于层级类图
                            style: {  // 节点样式
                                image: this.imgTest,  // 节点图标 dataURI
                                hide: false,  // 是否隐藏节点
                                // 节点的半径，优先级高于 size
                                r: 30,
                            }
                        },
                        {
                            id: '3',  // 节点的 id (必选)
                            name: '测试节点3',  // 图谱中显示在节点下面的文字
                            extend: false, // 节点是否可扩展。隐藏节点相关功能，为 true 时右上角显示可扩展+号图标
                            selected: false,  // 是否处于选中状态。选中时会显示边框
                            degree: 0,  // 节点度数，主要用于层级类图
                            style: {  // 节点样式
                                image: this.imgTest,  // 节点图标 dataURI
                                hide: false,  // 是否隐藏节点
                                // 节点的半径，优先级高于 size
                                r: 30,
                            }
                        },
                        {
                            id: '4',  // 节点的 id (必选)
                            name: '测试节点4',  // 图谱中显示在节点下面的文字
                            extend: false, // 节点是否可扩展。隐藏节点相关功能，为 true 时右上角显示可扩展+号图标
                            selected: false,  // 是否处于选中状态。选中时会显示边框
                            degree: 0,  // 节点度数，主要用于层级类图
                            style: {  // 节点样式
                                image: this.imgTest,  // 节点图标 dataURI
                                hide: false,  // 是否隐藏节点
                                // 节点的半径，优先级高于 size
                                r: 30,
                            }
                        }
                    ],
                    links: [
                        {
                            from: '1',  // 起始 node 节点 id（必选）
                            to: '2',  // 目标 node 节点 id （必选）
                            text: '父子',  // 线上的文字
                            directionless: false,  // 是否为无向线（没有箭头的直线）
                            style: {
                                dashed: false,  // 是否为虚线，默认为 false
                            }
                        },
                        {
                            from: '2',  // 起始 node 节点 id（必选）
                            to: '3',  // 目标 node 节点 id （必选）
                            text: '父母',  // 线上的文字
                            directionless: false,  // 是否为无向线（没有箭头的直线）
                            style: {
                                dashed: false,  // 是否为虚线，默认为 false
                            }
                        },
                        {
                            from: '1',  // 起始 node 节点 id（必选）
                            to: '3',  // 目标 node 节点 id （必选）
                            text: '女儿',  // 线上的文字
                            directionless: false,  // 是否为无向线（没有箭头的直线）
                            style: {
                                dashed: false,  // 是否为虚线，默认为 false
                            }
                        },
                        {
                            from: '3',  // 起始 node 节点 id（必选）
                            to: '4',  // 目标 node 节点 id （必选）
                            text: '测试',  // 线上的文字
                            directionless: false,  // 是否为无向线（没有箭头的直线）
                            style: {
                                dashed: false,  // 是否为虚线，默认为 false
                            }
                        }
                    ]
                }
            }
        },
        created() {
          this.painterId = this.$route.params.id;
        },
        mounted() {
            this.bindMouseRoll();
            this.getPainterInfo();
            this.getMadeList();
            this.getNodeList();
        },
        methods: {
          async getNodeList() {
            let data = await this.$axios.get('http://localhost:8080/id-graph?type=1&id=' + this.painterId);
            this.chartData = data.data;
            // eslint-disable-next-line no-console
            console.log(data.data);
            this.initGraph();
          },
          async getMadeList() {
            let data = await this.$axios.get('http://localhost:8080/made-list?id=' + this.painterId);
            this.madeList = data.data;
            // eslint-disable-next-line no-console
            console.log(data.data);
          },
          async getPainterInfo() {
            let data = await this.$axios.get('http://localhost:8080/type-id', {
              headers: {
                type: '1',
                id: this.painterId
              }
            })
            this.painterDetail = data.data;
            // eslint-disable-next-line no-console
            console.log(data.data)
          },
            /**
             * @description 初始化知识图谱
             * @returns {boolean}
             */
            initGraph() {


                const config = {
                    core: {
                        // animation: false,
                        initPlugin: true
                    },
                    plugin: {
                        rightKey: {
                            keys: [
                                {
                                    name: '隐藏节点',
                                    click: (params) => {
                                        const node = params.target.source;
                                        this.chart1.util.hideNodes([node.id]);
                                    },
                                    isShow(params) {
                                        if (params.isNode) {
                                            return true;
                                        }
                                    }
                                },
                                {
                                    name: '删除节点',
                                    click: (params) => {
                                        const node = params.target.source;
                                        this.chart1.util.deleteNodes([node.id]);
                                    },
                                    isShow(params) {
                                        if (params.isNode) {
                                            return true;
                                        }
                                    }
                                },
                                {
                                    name: '复位',
                                    click(params) {
                                        // params.$chart.reset();
                                        // 调用插件的方法，被调用的插件必须被实例化
                                        params.plugins.reset.onClick();
                                    },
                                },
                            ]
                        }
                    }
                };

                const chart = new Chart({
                    id: 'test-canvas',  // 绘制图谱 dom 的 id
                    type: 'force',  // 图谱类型
                    data: this.chartData,  // 图谱数据
                });
                chart.init(config);  // 调用 init 方法绘图，配置项可选
                Chart.changeConfig({
                    text: {
                        align: 'center',
                        verticalAlign: 'middle',
                        color: '#FFF',
                        fontSize: 12,
                    }
                });

                document.getElementsByClassName('searchNodeContainer-roc')[0].remove();

            },
            /**
             * @description 绑定画作鼠标滚动事件
             */
            bindMouseRoll() {
                let scrollDiv = document.getElementById("painting-drw-cnt");

                document.addEventListener('DOMMouseScroll',handler,false);
                document.addEventListener('mousewheel',handler,false);
                function handler(event){
                    let detail = event.wheelDelta || event.detail;
                    let moveForwardStep = 1;
                    let moveBackStep = -1;
                    let step = 0;
                    if(detail > 0){
                        step = moveForwardStep*100;
                    }else{
                        step = moveBackStep * 100;
                    }

                    scrollDiv.scrollLeft += step;

                }
            },
            /**
             * @description 跳转到画作详情页面
             * @param paintingId
             */
            routeToPainting(paintingId) {
                // eslint-disable-next-line
                console.log(paintingId);
                this.$router.push('/paintingDetail/'+paintingId);
            }
        }
    }
</script>

<style lang="scss" >
    .detail-container {
        margin-left: 150px;
        margin-right: 150px;
        margin-top: 30px;

        .painting-description-textarea {
            margin-top: 15px;
            textarea {
                background: rgba(0,0,0,0.1) !important;

            }
        }

        .painting-cnt {


            .left-cnt {
                width: 300px;
                float: left;

                .pic {
                    width: 100%;
                    border-radius: 4px;
                }

            }

            .right-cnt {
                margin-left: 300px;
                padding-left: 30px;

                .box-card {

                    .title {
                        font-size: 26px;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }

                    .item {
                        font-weight: bold;
                        margin-bottom: 20px;

                        .font {
                            margin-left: 20px;
                            color: #F2F8FE;
                        }
                    }

                    .divider {
                        margin-top: 30px;
                        background: #606266;
                        .el-divider__text {
                            background: #606266;
                        }
                    }

                    .painting-description-cnt {

                        .empty-cnt {
                            text-align: center;
                            .empty {
                                width: 150px;
                                opacity: 0.5;
                            }
                            .empty-text {
                                color: #606266;
                                font-size: 14px;
                            }
                        }

                    }

                }


            }
        }

        .painting-drawer-cnt {
            margin-top: 15px;
            width: 100%;

            height: 315px;

            overflow-x: scroll;
            overflow-y: hidden;
            .swipe-cnt {
                width: 3000px;
                height: 100%;

                .item {
                    width: 200px;
                    height: 300px;
                    overflow: hidden;
                    position: relative;
                    cursor: pointer;
                    border: 1px solid transparent;
                    display: inline-block;
                    box-sizing: border-box;
                    margin-right: 30px;

                    .background {
                        height: 100%;
                        position: absolute;
                    }

                    .title {
                        position: absolute;
                        display: block;
                        bottom: 0;
                        height: 30px;
                        line-height:30px;
                        width: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        color: #FFF;
                        font-weight: bold;
                        text-align: center;
                    }


                }

                .item:hover {
                    border: 1px solid #409EFF;
                    background: rgba(0, 0, 0, 0.8);
                    opacity: 0.3;
                }

                .item-cube {
                    width: 300px;
                    height: 300px;
                    overflow: hidden;
                    position: relative;
                    cursor: pointer;
                    border: 1px solid transparent;
                    display: inline-block;
                    box-sizing: border-box;
                    margin-right: 30px;

                    .background {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                    }

                    .title {
                        position: absolute;
                        display: block;
                        bottom: 0;
                        height: 30px;
                        line-height:30px;
                        width: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        color: #FFF;
                        font-weight: bold;
                        text-align: center;
                    }
                }

                .item-cube:hover {
                    border: 1px solid #409EFF;
                    background: rgba(0, 0, 0, 0.8);
                    opacity: 0.3;
                }

            }

        }
        .painting-drawer-cnt::-webkit-scrollbar { width: 0 !important }

        #test-canvas {
            margin-top: 15px;
            margin-bottom: 15px;
            border-radius: 6px;
            background: #27262F;
          //height: 1000px;
        }
    }
</style>
