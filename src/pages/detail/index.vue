<template>
    <div class="detail-container">
        <!-- 两栏布局 -->
        <div class="painting-cnt">
            <div class="left-cnt">
                <img :src="paintDetail.picture" class="pic" alt="pic1" />

                <el-card class="box-card">
                    <div class="title"><i class="el-icon-brush"></i> Painter</div>
                    <div class="author-picture-cnt link" @click="routeToPainter(painterDetail.id)">
                        <img :src="painterDetail.image" alt="author" class="author-picture"/>
                    </div>

                  <div class="item"> <el-tag type="success">Country</el-tag> <span class="font">{{ painterDetail.country }}</span></div>
                  <div class="item"> <el-tag type="warning">Birth</el-tag> <span class="font">{{ painterDetail.birth }}</span></div>
                  <div class="item"> <el-tag type="danger">Death</el-tag> <span class="font">{{ painterDetail.death }}</span></div>


                    <el-divider content-position="center" class="divider">description</el-divider>

                    <div class="painter-description-cnt">
                        <div class="empty-cnt" v-if="false">
                            <img src="../../assets/empty.png" alt="empty" class="empty"/>
                            <p class="empty-text">作者描述为空，我们正在努力获取 :)</p>
                        </div>

                        <div class="desc">
                          {{painterDetail.description}}
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="right-cnt">
                <el-card class="box-card">
                    <div class="title"><i class="el-icon-reading"></i> Painting </div>
                    <div class="item"> <el-tag>name</el-tag> <span class="font">{{ paintDetail.name }}</span></div>
                    <div class="item"> <el-tag type="success">museum</el-tag> <span class="font">{{ paintDetail.museum }}</span></div>
                    <div class="item link" @click="routeToPainter"> <el-tag type="warning">painter name</el-tag> <span class="font">{{ paintDetail.maker }}</span></div>
                    <div class="item"> <el-tag type="danger">time</el-tag> <span class="font">{{ paintDetail.createdTime }}</span></div>
                    <div class="item"> <el-tag type="info">type</el-tag> <span class="font">{{ paintDetail.type }}</span></div>

                    <el-divider content-position="center" class="divider">painting description</el-divider>

                    <div class="painting-description-cnt">
                        <div class="empty-cnt" v-if="false">
                            <img src="../../assets/empty.png" alt="empty" class="empty"/>
                            <p class="empty-text">本画作描述为空，邀请您一起来完善！</p>
                            <el-button type="success" @click="openPaintingDescriptionEditor" plain>我要完善 ^_^ </el-button>
                        </div>

                        <div class="desc">
                          "Madonna del Prato" (Madonna del Prato), also known as "Virgin and Child and Saint John", was created by Raphael between 1505 and 1506. It is now in the Kunsthistorisches Museum in Viana, Austria. "The Madonna on the Grass" is a wood engraving created by a mixture of tempera and oil painting. The hem of the Virgin's dress indicates the year when the painting was completed: 1506. This painting for the chapel of the monks in the Basilica of San Mar in Florence is one of many paintings of the Virgin and Child and St. John the Little by Raphael during his Florentine period. Since the 16th century, when creating portraits, many painters have abandoned the idealized expressions they used in drawing religious subjects, and adopted realistic techniques to faithfully reproduce the appearance and spiritual world of the expressing objects. The founder of this expression is Raphael. During this period, Raphael lived in Florence for a long time, which facilitated his close study of the works of Leonardo da Vinci and Michelangelo. The appearance of the Virgin and Child with St. John the Little is very common in 15th-century Italian paintings, and Raphael's later paintings on this theme also achieved great success.
                        </div>
                    </div>

                </el-card>

                <div id="test-canvas" style="width:100%; height: 500px;"></div>
            </div>
        </div>

        <el-dialog title="完善作品信息" :visible.sync="paintingVisible" width="30%">
            <span>感谢您为我们完善该幅画作的信息 ^_^ </span>
            <el-input
                    type="textarea"
                    class="painting-description-textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="updatePaintingDescriptionForm.description">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="paintingVisible = false">取 消</el-button>
                <el-button type="primary" @click="paintingVisible = false">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Chart from 'roc-charts';
    export default {
        name: "index",

        data() {
            return {
                paintingId: 1,
                chart: null,
                paintingVisible: false,
                updatePaintingDescriptionForm: {
                    description: ''
                },
                paintDetail: {},
                painterDetail: {},
                chartData: {
                    nodes: [
                        {
                            id: '1',  // 节点的 id (必选)
                            name: 'St. Sebastian',  // 图谱中显示在节点下面的文字
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
                            name: 'The Holy Trinity',  // 图谱中显示在节点下面的文字
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
                            name: 'Madonna del Prato',  // 图谱中显示在节点下面的文字
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
                            name: 'The Madonna and Child ',  // 图谱中显示在节点下面的文字
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
                            text: 'same era',  // 线上的文字
                            directionless: false,  // 是否为无向线（没有箭头的直线）
                            style: {
                                dashed: false,  // 是否为虚线，默认为 false
                            }
                        },
                        {
                            from: '2',  // 起始 node 节点 id（必选）
                            to: '3',  // 目标 node 节点 id （必选）
                            text: 'same era',  // 线上的文字
                            directionless: false,  // 是否为无向线（没有箭头的直线）
                            style: {

                                dashed: false,  // 是否为虚线，默认为 false
                            }
                        },
                        {
                            from: '1',  // 起始 node 节点 id（必选）
                            to: '3',  // 目标 node 节点 id （必选）
                            text: 'same era',  // 线上的文字
                            directionless: false,  // 是否为无向线（没有箭头的直线）
                            style: {
                                dashed: false,  // 是否为虚线，默认为 false
                            }
                        },
                        {
                            from: '3',  // 起始 node 节点 id（必选）
                            to: '4',  // 目标 node 节点 id （必选）
                            text: 'similar type',  // 线上的文字
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
          this.paintingId = this.$route.params.id;
        },
      mounted() {
            this.getPaintingInfo();
            this.getGraph();
        },
        methods: {
            async getPaintingInfo() {
              let data = await this.$axios.get('http://localhost:8080/type-id', {
                headers: {
                  type: '2',
                  id: this.paintingId
                }
              })
              this.paintDetail = data.data;
              await this.getPainterInfo();
            },
          async getGraph() {
            let data = await this.$axios.get('http://localhost:8080/id-graph?type=2&id=' + this.paintingId);
            this.chartData.nodes = data.data.nodes
            this.chartData.links = data.data.links
            this.initGraph();
          },

          async getPainterInfo() {
              //http://localhost:8080/type-name?name=莱昂纳多·达·芬奇&type=1
              let data = await this.$axios.get('http://localhost:8080/type-name?type=1&name=' + this.paintDetail.maker);
              this.painterDetail = data.data[0];
            // eslint-disable-next-line no-console
            //   console.log(data.data[0])
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
             * @description 打开画作编辑器
             */
            openPaintingDescriptionEditor() {
                this.paintingVisible = true;
            },
            /**
             * @description 跳转到作者详情页
             * @param painterId
             */
            routeToPainter(painterId) {
                // eslint-disable-next-line
                console.log(painterId);
                this.$router.push('/painterDetail/'+painterId);
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

                .box-card {
                    margin-top: 20px;
                    .title {
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 20px;
                        text-align: center;
                    }

                    .item {
                        font-weight: bold;
                        margin-bottom: 20px;

                        .font {
                            margin-left: 20px;
                            color: #F2F8FE;
                        }
                    }

                    .link {
                        cursor: pointer;
                    }

                    .author-picture-cnt {
                        text-align: center;
                        margin-bottom: 20px;

                        .author-picture {
                            width: 100px;
                            border-radius: 6px;
                        }
                    }

                    .divider {
                        margin-top: 30px;
                        background: #606266;
                        .el-divider__text {
                            background: #606266;
                        }
                    }

                    .painter-description-cnt {

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

            .right-cnt {
                margin-left: 300px;
                padding-left: 30px;
                padding-right: 30px;

                .box-card {

                    .link {
                        cursor: pointer;
                    }

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

                #test-canvas {
                    margin-top: 15px;
                    margin-bottom: 15px;
                    border-radius: 6px;
                    background: #27262F;
                }

            }
        }
    }
</style>
