<template>
    <div class="home-container">
        <p class="logo"><img src="../../assets/logo.png" alt="logo"></p>
        <div class="search-bar-cnt">
            <div class="left">
                <el-select v-model="typeValue" placeholder="Select">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="right">
                <el-autocomplete
                        class="inner-left"
                        v-model="searchText"
                        :fetch-suggestions="getSearchListAsync"
                        placeholder="like: 蒙娜丽莎"
                        @select="handleSelect">
                  <template slot-scope="{ item }">
                    <div class="name">节点ID： {{ item.id }}</div>
                    <div class="addr">节点名称： {{ item.name }}</div>
                  </template>
                </el-autocomplete>
                <i class="el-icon-search inner-right"></i>
            </div>

        </div>

        <div class="banner-cnt" id="banner-cnt">
            <div class="swipe-cnt">
                <div class="item" @click="routeToPainting(item.id)" v-for="item in recommendList" :key="item.id">
                    <img :src="item.picture" class="background" :alt="item.name" />
                    <span class="title">{{ item.name }}</span>
                </div>
            </div>
        </div>

      <el-upload
          class="upload-demo"
          action="http://localhost:8080/upload"
          :before-upload="beforeUpload"
          :limit="1">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
</template>

<script>
    /* eslint-disable */

    export default {
        name: "HomeIndex",
        data() {
            return {
                searchText: '',
                searchList: [],
                options: [{
                    value: '2',
                    label: '画作'
                }, {
                    value: '1',
                    label: '作家'
                }],
                typeValue: '',
                recommendList: [],
            }
        },
        mounted() {
            this.restaurants = this.loadAll();
            this.bindMouseRoll();
            this.getRecommendList();
        },
        methods: {

          async getRecommendList() {
            let data = await this.$axios.get('http://localhost:8080/type-limit',{
              headers:{'type': 2, 'limit': 15}
            });
            this.recommendList = data.data;
            console.log(data.data);
          },

          async getSearchList(queryString,cb) {
            let data = await this.$axios.get('http://localhost:8080/type-name?type=' + this.typeValue + "&name=" + queryString );
            this.searchList = data.data;
            console.log(data.data);
            cb(data.data);
          },

          getSearchListAsync(queryString, cb) {
            this.$axios.get('http://localhost:8080/type-name?type=' + this.typeValue + "&name=" + queryString ).then( (res) => {
              cb(res.data);
              console.log(res.data);
            })
          },

            /**
             * @description 搜索数据的函数
             * @param queryString
             * @param cb
             */
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            /**
             * @description 创建一个筛选器
             * @param queryString
             * @returns {function(*): boolean}
             */
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            /**
             * @description 加载动态数据
             * @returns {*[]}
             */
            loadAll() {
                return [
                    { "value": "音乐家肖像", "address": "长宁区新渔路144号" },
                    { "value": "音乐家", "address": "上海市长宁区淞虹路661号" },
                    { "value": "戴草帽的自画像", "address": "上海市长宁区淞虹路661号" },
                ];
            },
            /**
             * @description 选择事件进行选择
             * @param item
             */
            handleSelect(item) {
              if (this.typeValue == 2) {
                this.$router.push('/paintingDetail/' + item.id,)
              }
              if (this.typeValue == 1) {
                this.$router.push('/painterDetail/' + item.id)
              }
            },
            /**
             * @description 画作区域绑定滚动事件
             */
            bindMouseRoll() {
                let scrollDiv = document.getElementById("banner-cnt");

                let element =  document.documentElement;
                if(navigator.userAgent.indexOf("Chrome")>0){
                    element = document.body;
                }

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
                console.log(paintingId);
                this.$router.push('/paintingDetail/'+paintingId);
            },
          /**
           * @description 上传前的操作
           */
          beforeUpload(file) {
            console.log(file.name)
            this.LoadingFullScreen(file)
          },

          LoadingFullScreen(file) {
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
              loading.close();
              this.searchText = file.name.split('.')[0];
            }, 2000);
          }
        }
    }
</script>

<style lang="scss">
    .home-container {
        margin-left: 150px;
        margin-right: 150px;
        margin-top: 150px;

        .logo {
            text-align: center;

            img {
                width: 300px;
            }
        }

        .search-bar-cnt {
            margin:0 auto;

            .left {
                width: 100px;
                float: left;
                height: 50px;
                .el-select {
                    input {
                        height: 50px !important;
                        line-height: 50px;
                    }
                }
            }

            .right {
                margin-left: 110px;
                width: calc(100% - 100px);

                .inner-left {
                    width: calc(100% - 50px);
                    height: 40px;

                    .el-input {
                        input {
                            height: 50px !important;
                            line-height: 50px;
                        }
                    }
                }

                .inner-right {
                    width: 50px;
                    height: 40px;
                    line-height: 50px;
                    float: right;
                    font-size: 24px;
                    text-align: center;
                    color: #ffffff;
                    cursor: pointer;
                }
            }



        }

        .banner-cnt {
            margin-top: 40px;
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
        .banner-cnt::-webkit-scrollbar { width: 0 !important }

    }

</style>
