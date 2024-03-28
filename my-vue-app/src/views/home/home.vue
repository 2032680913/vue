<template>
  <el-row class="home" :gutter="20">
    <el-col :span="6" style="margin-top:20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../asssets/images/dog.gif" alt="">
          <div class="user-info">
            <p class="name">admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2024-03-21</span></p>
          <p>上次登录地点:<span>上海</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top:20px" height="450px">
        <el-table :data="dataList" style="width: 100%">
          <el-table-column v-for="(item,key) in tableLabel" header-align="center" align="center" :key="key" :prop="key" :label="item">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top:20px" height="400px">
      <div class="num">
        <el-card :body-style="{display:'flex',padding:0}" v-for="(itemCount,index) in countData" :key="index">
          <!-- <component class="icons" :is="item.icon" :style="{background:item.color}"></component> -->
          <div class="detail">
            <p class="num">￥{{itemCount.value}}</p>
            <p class="txt">{{itemCount.name}}</p>
          </div>
          <div></div>
        </el-card>
      </div>
      <el-card style="height:280px">
        <div ref="echart" style="height:280px">
        </div>
        <div></div>
      </el-card>
      <div class="graph">
        <el-card style="height:260px">
          <div ref="Uechart" style="height:240px">
          </div>
        </el-card>
        <el-card style="height:260px">
          <div ref="Pechart" style="height:240px">
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>

</template>
<script>
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import axios from 'axios';
import * as echarts from 'echarts';

export default defineComponent({
  setup() {
    // const dataList = [
    //   {
    //     name:'三星8',
    //     todayBuy:20000,
    //     mouthBUy:2345,
    //     totalBuy:288888
    //   },
    //   {
    //     name:'三星9',
    //     todayBuy:20000,
    //     mouthBUy:2345,
    //     totalBuy:288888
    //   },
    //   {
    //     name:'三星7',
    //     todayBuy:20000,
    //     mouthBUy:2345,
    //     totalBuy:288888
    //   },
    //   {
    //     name:'三星5',
    //     todayBuy:20000,
    //     mouthBUy:2345,
    //     totalBuy:288888
    //   },
    //   {
    //     name:'三星5',
    //     todayBuy:20000,
    //     mouthBUy:2345,
    //     totalBuy:288888
    //   },
    //   {
    //     name:'三星1',
    //     todayBuy:20000,
    //     mouthBUy:2345,
    //     totalBuy:288888
    //   },
    //   {
    //     name:'三星2',
    //     todayBuy:20000,
    //     mouthBUy:2345,
    //     totalBuy:288888
    //   }
    // ]
    const tableLabel = {
      name: '课程',
      todayBuy: '今日购买',
      mouthBUy: '本月购买',
      totalBuy: '本月购买'
    }
    let dataList = ref([]);
    let countData = ref([]);
    const { proxy } = getCurrentInstance()

    let getTableList = async () => {
      await axios.get('/home/getData').then((res) => {
        console.log(res, 'res');
        dataList.value = res.data.data.dataList;

      })
      //二次封装的
      // let res = await proxy.$api.getTableData();
      //  dataList.value = res;
    }
    let getCountData = async () => {
      await axios.get('/home/getCount').then((res) => {
        countData.value = res.data.data.dataCount
        console.log(res, '===res');
      })
    }
    //关于echarts表格渲染部分
    let XOptions = reactive({
      //图例文字颜色
      textStyle: {
        color: '#333',
      },
      gird: {
        left: '20%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        backgroundColor: '#fff', // 悬浮框背景色
        borderColor: '#000', // 悬浮框边框颜色
        borderWidth: 1, // 悬浮框边框宽度
        textStyle: { // 悬浮框文字样式
          color: '#000',
          fontSize: 12
        }

      },
      xAxis: {
        type: 'category',
        data: [],
        axisLine: {
          lineStyle: {
            color: '#17b3a3'
          },
        },
        axisLabel: {
          interval: 0,
          color: '#333'
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#17b3a3'
          }
        }
      },
      color: [
        '#91c7ae',
        '#d48265',
        '#c23531',
        '#2f4554',
        '#61a0a8',
        '#d48265',
        '#91c7ae',
        '#749f83',
        '#ca8622',
        '#bda29a',
        '#6e7074',
        '#546570',
        '#c4ccd3'
      ],
      series: []
    })
    let Pieoptions = reactive({
      tooltip: {
        trigger: 'item'
      },
      color: [
        '#c23531',
        '#2f4554',
        '#61a0a8',
        '#d48265',
        '#91c7ae',
        '#749f83',
      ],
      series: []
    })
    let orderData = reactive({
      xData: [],
      series: []
    })
    let userData = reactive({
      xData: [],
      series: []
    })
    let videoData = reactive({
      series: {}
    })
    let getEhartsList = async () => {
      await axios.get('/home/getChart').then((res) => {
        console.log(res.data.data.videoData, '获取的图标数据');
        let orderRef = res.data.data.orderData;
        let videoRef = res.data.data.videoData;
        let userRef = res.data.data.userData;
        orderData.xData = orderRef.date;
        const keyArray = Object.keys(orderRef.dataType[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: orderRef.dataType.map((item) => item[key]),
            type: 'line'
          })
          orderData.series = series;
          XOptions.xAxis.data = orderData.xData;
          XOptions.series = orderData.series;
          //进行渲染
          let hEharts = echarts.init(proxy.$refs['echart']);
          hEharts.setOption(XOptions);

          //柱状图进行渲染
          userData.xData = userRef.map((item) => item.date);
          userData.series = [
            {
              name: '新增用户',
              data: userRef.map((item) => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: userRef.map((item) => item.active),
              type: 'bar'
            },
          ]
          XOptions.xAxis.data = userData.xData;
          XOptions.series = userData.series
          let UserEchart = echarts.init(proxy.$refs['Uechart'])
          UserEchart.setOption(XOptions)
          //饼状图渲染
          videoData.series = [
            {
              data: videoRef,
              type: 'pie',
            }
          ]
          Pieoptions.series = videoData.series;
          let VideoEchart = echarts.init(proxy.$refs['Pechart']);
          VideoEchart.setOption(Pieoptions)
        })
      })
    }
    //获取数据
    onMounted(() => {
      getTableList();
      getCountData();
      getEhartsList();
    })
    return {
      dataList,
      tableLabel,
      countData
    }
  },
})
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
}
.login-info {
  p {
    line-height: 30px;
    font-size: 14px;
    span {
      color: #666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .num {
      font-size: 30px;
      margin-bottom: 10px;

      .txt {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  .el-card {
    width: 48%;
  }
}
</style>