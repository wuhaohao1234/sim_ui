<template>
    <div class="vehicles-box">
        <div class="main">
            <div class="myVideo-video" style="position: absolute;left:20%;z-index: 10000;">
                <div>ssss</div>
    <div  id="videoContainer"></div>
    </div>
    <!-- <div data-vjs-player style="position: absolute;
        z-index: 99999;left: 27%;">
      <video id="videoNode" class="video-js vjs-default-skin">
        抱歉，您的浏览器不支持
      </video>
    </div> -->
    <div style="position: absolute;left: 27%;">
        <video-player :options="playerOptions">

        </video-player>
    </div>
            <audio controls id="audio" style="    position: absolute;
        z-index: 99999;opacity: 0;">
                <source src="/static/audio/music.mp3" type="audio/ogg">
                <source src="/static/audio/music.mp3" type="audio/mpeg">
                您的浏览器不支持 audio 元素。
            </audio>
            <img class="sandBg" src="../../assets/images/sand-left.png" :style="{ height: documentHeight + 'rem' }">
            <img class="sandBg-two" src="../../assets/images/sand-left-two.png" :style="{ height: documentHeight + 'rem' }">
            <ul class="configItem">
                <template v-for="(item, key) in configImgList" :key="key">
                    <li class="child">
                        <span class="inc" @click="startCar(item.title)">
                            <span class="homImg" style="display: inline-block;">
                                <img :src="item.srchome" />
                                <div class="title">{{ item.title }}</div>
                            </span>
                            <img class="leftImg" :src="item.srcBox" />
                        </span>
                        <div style="display: inline-block;" class="intoHover">
                            <img class="rightImg" :src="item.src" />
                        </div>

                    </li>
                </template>
            </ul>
            <div style="position: absolute;top:47%;left: 60%;    width: 4%;
    height: 20%;">
                <div :style="cross_style">
                    <span>{{ traffic_light.cross_road }}</span>

                </div>
                <img v-show="traffic_light.cross_road_color == '#096'" src="../../assets/images/traffic_light.png" style="    width: 100%;
    height: 100%;" />
                <img v-show="traffic_light.cross_road_color == 'red'" src="../../assets/images/light_red.png" style="    width: 100%;
    height: 100%;" />
                <img v-show="traffic_light.cross_road_color == 'yellow'" src="../../assets/images/light_yellow.png" style="    width: 100%;
    height: 100%;" />
                <img v-show="traffic_light.cross_road_color == 'green'" src="../../assets/images/light_green.png" style="    width: 100%;
    height: 100%;" />
            </div>

            <div style="position: absolute;top:77%;left: 46%;transform: rotate(180deg);width: 4%;
    height: 20%;">
                <div :style="outer_style">
                    <span>{{ traffic_light.outer_ring }}</span>

                </div>
                <img v-show="traffic_light.outer_ring_color == '#096'" src="../../assets/images/traffic_light.png" style="    width: 100%;
    height: 100%;" />
                <img v-show="traffic_light.outer_ring_color == 'red'" src="../../assets/images/light_red.png" style="width: 100%;
    height: 100%;" />
                <img v-show="traffic_light.outer_ring_color == 'yellow'" src="../../assets/images/light_yellow.png" style="width: 100%;
    height: 100%;" />
                <img v-show="traffic_light.outer_ring_color == 'green'" src="../../assets/images/light_green.png" style="width: 100%;
    height: 100%;" />
            </div>

            <div style="position: absolute;top:47%;left: 6.5%;width: 4%;
    height: 20%;">
                <div :style="outer_style_index">
                    <span>{{ traffic_light.outer_ring }}</span>

                </div>
                <img v-show="outlight_color == '#096'" src="../../assets/images/traffic_light.png" style="    width: 100%;
    height: 100%;" />
                <img v-show="outlight_color == 'red'" src="../../assets/images/light_red.png" style="width: 100%;
    height: 100%;" />
                <img v-show="outlight_color == 'yellow'" src="../../assets/images/light_yellow.png" style="width: 100%;
    height: 100%;" />
                <img v-show="outlight_color == 'green'" src="../../assets/images/light_green.png" style="width: 100%;
    height: 100%;" />
            </div>

            <div style="position: absolute;top:47%;left: 89.5%;width: 4%;
    height: 20%;">
                <div :style="outer_style_index">
                    <span>{{ traffic_light.outer_ring }}</span>

                </div>
                <img v-show="outlight_color == '#096'" src="../../assets/images/traffic_light.png" style="    width: 100%;
    height: 100%;" />
                <img v-show="outlight_color == 'red'" src="../../assets/images/light_red.png" style="width: 100%;
    height: 100%;" />
                <img v-show="outlight_color == 'yellow'" src="../../assets/images/light_yellow.png" style="width: 100%;
    height: 100%;" />
                <img v-show="outlight_color == 'green'" src="../../assets/images/light_green.png" style="width: 100%;
    height: 100%;" />
            </div>
            <div id="carA" data-deg="deg" class="optionItem newcarBox" style="display: block;top: 89%;left: 33%;" ref="A">
                <div :style="{ display: tip }">
                    <span class="">
                        <img class="" :src="wran_bg.A" alt="默认" />
                    </span>
                    <p class="">我是A车</p>
                </div>
                <img class="car" :src="carA" />
            </div>
            <div id="carB" data-deg="90" class="optionItem newcarBox" style="display: block;top: 89%;left: 52%;" ref="B">
                <div :style="{ display: tip }">
                    <span :class="message_deg.message_B">
                        <img class="" :src="wran_bg.B" alt="默认" />
                    </span>
                    <p :class="message_deg.tooltip_B">我是B车</p>
                </div>
                <img class="car" :src="carB" />
            </div>
            <div id="carC" data-deg="90" class="optionItem newcarBox" style="display: block;top: 41%;left: 32%;" ref="C">
                <div :style="{ display: tip }">
                    <span :class="message_deg.message_C">
                        <img class="" :src="wran_bg.C" alt="默认" />

                    </span>
                    <p :class="message_deg.tooltip_C">我是C车</p>
                </div>

                <img class="car" :src="carC" />
            </div>
            <div id="carD" data-deg="90" class="optionItem newcarBox" style="display: block;top: 2%;left: 71%;" ref="D">
                <div :style="{ display: tip }">
                    <span :class="message_deg.message_D">
                        <img class="" :src="wran_bg.D" alt="默认" />
                    </span>
                    <p :class="message_deg.tooltip_D">我是D车</p>
                </div>
                <img class="car" :src="carD" />
            </div>
            <div id="hide"
                style="width: 500px;height: 300px;position: absolute;top:25%;left:18%;background-color: black;color: white;overflow: scroll;display: none;">
                <ul class="configItem">
                    <template v-for="(item, key) in shakedown.list" :key="key">
                        <li class="child">
                            {{ item }}
                        </li>
                    </template>
                </ul>
            </div>
            <div id="people_walk" class="walk_box">
                <img id="people_img" src="../../assets/images/reverse.png" />
            </div>
        </div>
        <div id="dialogBox">
            <el-dialog v-model="centerDialogVisible" width="7rem" :show-close="false">
                <div id="dialogIcon" @click="centerDialogVisible = false">
                    <el-icon>
                        <Close />
                    </el-icon>
                </div>
                <div id="keyBox">
                    <div class="commonTable tab2 active" id="Outdoor1" index="1" @click="commonTable('1', 'simulation')">仿真
                    </div>
                    <div :class="[{ 'hibitClick': roleVisible ? hibitClick : '' }, 'commonTable']" id="Outdoor2" index="2"
                        @click="roleVisible ? commonTable('3') : commonTable('2', 'real')">{{ roleVisible ? '' : '沙盘连接' }}
                    </div>
                </div>
                <div id="first" class="first showCon">
                    <!-- <el-input v-model="textareaInput" autosize type="textarea" placeholder="Please input" /> -->
                    <el-form :model="serviceUrl" size="large" :inline="true" class="demo-form-inline"
                        style="margin-top: 0.6rem;">
                        <el-form-item label="URL：">
                            <el-input v-model="serviceUrl" clearable placeholder="请填写服务地址" />
                        </el-form-item>
                        <el-form-item>
                            <el-button class="connectBtn" type="primary" @click="sandStart('real')"></el-button>
                            <!-- <el-button v-show="!realConnectBtn" class="breakBtn" type="primary" @click=""></el-button> -->
                        </el-form-item>
                    </el-form>
                    <div>
                        <div style="color: white;    font-weight: 100;
    font-size: 16px;">obu/rsu</div>
                        <el-radio-group v-model="radio">
                            <el-radio :label="3">obu</el-radio>
                            <el-radio :label="6">rsu</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div id="second" class="showCon" style="display: none;">
                    <el-form :model="serviceUrl" size="large" :inline="true" class="demo-form-inline"
                        style="margin-top: 0.6rem;">
                        <el-form-item label="URL：">
                            <el-input v-model="serviceUrl_real" clearable placeholder="请填写服务地址" />
                        </el-form-item>
                        <el-form-item>
                            <el-button v-show="sandConnectBtn" class="connectBtn" type="primary"
                                @click="sandStart('sand')"></el-button>
                            <el-button v-show="!sandConnectBtn" class="breakBtn" type="primary" @click=""></el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
        </div>

        <carSpeedFrom ref="userDialogRef" @onReceiveMsg="onReceiveMsg"></carSpeedFrom>
    </div>
</template>
<script name="InternetVehicles" setup>
import carSpeedFrom from './carSpeedFrom.vue';

import carA from "@/assets/images/carA.png";
import carB from "@/assets/images/carB.png";
import carC from "@/assets/images/carC.png";
import carD from "@/assets/images/carD.png";
import { ElMessage } from 'element-plus';
import lineImg from '@/assets/images/line.png';
import boxImg from '@/assets/images/box.png';
import homeImg from '@/assets/images/home.png';
import setImg from '@/assets/images/setting.png';
import monitorImg from '@/assets/images/monitor.png';
import infoBg from '../../assets/images/primary.png'
import wranBg from '../../assets/images/primary.png'
import errorBg from '../../assets/images/primary.png'
import { peopleData, people_point } from '@/assets/sandJs/people'
import { sand_choose } from "@/api/system/user";

import $ from 'jquery'

// import Sand from './vehicle'
import Sand from '@/assets/sandJs/vehicle'
import Warn from '@/assets/sandJs/warn'
// import Warn from './warn'

import { getCurrentInstance, onMounted, reactive, ref } from 'vue';

import useUserStore from "@/store/modules/user";
import { playVoice } from "@/api/sandVoice/voice";
import { getFn } from '@/assets/sandJs/vehicle';
import videojs from "video.js";
import { VideoPlayer } from 'vue-video-player'
//播放器中文，不能使用.js文件
import videozhCN from "video.js/dist/lang/zh-CN.json";

//样式文件注意要加上
import "video.js/dist/video-js.css"; 

//如果要播放RTMP要使用flash 需要先npm i videojs-flash
import "videojs-flash";

// import SWF_URL from 'videojs-swf/dist/video-js.swf'

const userStore = useUserStore();

const { proxy } = getCurrentInstance();

const textareaInput = ref('');
const shakedown = reactive({
    list: []
})
const radio = ref(3)
const centerDialogVisible = ref(false);

//配置项参数
const configImgList = [
    {
        src: lineImg, srcBox: boxImg, srchome: homeImg, title: '登录'
    },
    {
        src: lineImg, srcBox: boxImg, srchome: setImg, title: '配置'
    },
    {
        src: lineImg, srcBox: boxImg, srchome: monitorImg, title: '监控'
    },
]

onMounted(()=>{
    let videoParams={
        container:'#videoContainer',
        variable:'player',
        autoplay:true,
        crossOrigin:'',
        // plug:'hls.js',
        live:true,
        video:'rtmp://58.200.131.2:1935/livetv/hunantv'
    }
    let player= new ckplayer(videoParams)
    console.log('ttttt');
    // videojs(document.getElementById(video))
    //你这是干什么的
   // 用这个
//    let options = {
//             autoplay: true, // 自动播放
//             language: "zh-CN",
//             controls: '', // 控制条
//             preload: "auto", // 自动加载
//             errorDisplay: true, // 错误展示
//             // fluid: true, // 跟随外层容器变化大小，跟随的是外层宽度
//             width: "500px",
//             height: "500px",
//             // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但是存在
//             // textTrackDisplay: false,  // 不渲染字幕相关DOM
//             notSupportedMessage: "此视频暂无法播放，请稍后再试",
//             techOrder: ["h5","flash"], // 定义Video.js技术首选的顺序
//             sources: [
//               {
//                 src: 'rtmp://58.200.131.2:1935/livetv/cctv1', // 视频或者直播地址
//                 type: 'video/mp4',
//                 //type: 'rtmp/flv',
//               }
//             ]
  
// }

//         videojs(

//             document.getElementById('videoNode'),

//             options,


            
//         );

//         videojs.addLanguage("zh-CN", videozhCN);
    


})
const userDialogRef = ref();
const message_deg = reactive({
    message_A: 'message_270',
    message_B: 'message_270',
    message_C: 'message_270',
    message_D: 'message_270',
    tooltip_A: 'toolTip_270',
    tooltip_B: 'toolTip_270',
    tooltip_C: 'toolTip_270',
    tooltip_D: 'toolTip_270',
})
const onReceiveMsg = (params) => {
    sand.Clear(params);
}
const isSwitch = ref(false)
const realConnectBtn = ref(true);
const sandConnectBtn = ref(true);

//小车告警背景
const wran_bg = reactive({
    'A': infoBg,
    'B': infoBg,
    'C': infoBg,
    'D': infoBg,
})

const tip = ref('none');
const tip_copy = reactive({
    tipA: 'none',
    tipB: 'none',
    tipC: 'none',
    tipD: 'none',
})

var waitIsShow = ref(false);

const switch_type = ref('simulation'); //【simulation】 --仿真；【real】 --沙盘连接
const isSocket = ref(false);
const layerList = reactive(
    [
        {
            light_display: '00',
            light_color: '#096'
        },
        {
            light_display: '11',
            light_color: '#0666'
        }
    ])
function* reLight() {
    let len = layerList.length
    for (var i = 0; i < len; i++) {
        yield layerList[i]
    }
}
const light_color = ref('#096');
const outlight_color = ref('#096');
const font_obj = reactive({
    object: {
        cross_road_color: '#096',
        outer_ring_color: '#096'
    }

})
const { object } = font_obj
const { cross_road_color, outer_ring_color } = object
//属性集合
const attributeSetObject = reactive({
    traffic_light: {
        cross_road: '00',
        outer_ring: '00',
        cross_road_color: '#096',
        outer_ring_color: '#096'
    },
    disNumber: 365,
    innerWidthObj: [1517, 1660, 1707, 1821, 2049],
    isConnect: false,
    timer: null,
    style: {
        cross_style: {
            fontFamily: 'MyFont',
            position: 'absolute',
            top: '34%',
            left: '22%',
            zIndex: 99,
            fontSize: '30px',
            color: light_color,
        },
        outer_style: {
            fontFamily: 'MyFont',
            position: 'absolute',
            top: '34%',
            left: '22%',
            zIndex: 99,
            fontSize: '30px',
            color: outlight_color,
            transform: 'rotate(180deg)'
        },
        outer_style_index: {
            fontFamily: 'MyFont',
            position: 'absolute',
            top: '34%',
            left: '22%',
            zIndex: 99,
            fontSize: '30px',
            color: outlight_color,

        },
        playerOptions: {
        height: '400',
        language: 'en',
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        sources: [{
            type: "rtmp/mp4",
          src: "rtmp://58.200.131.2:1935/livetv/cctv1"
        }],
        techOrder: ['flash'],
        flash:{
            // hls:{
            //     withCredentias:fals
            // },
            // swf:SWF_URL
        },
        autoplay: true,
        controls: true,
        poster: "../../assets/images/video2.jpg",
        notSupportedMessage: '不支持的视频格式'
      },
    }
})
//{*解构样式可以以便于响应式修改属性*}
let { 
    traffic_light, 
    style, disNumber, 
    innerWidthObj, 
    isConnect, timer,
    playerOptions
} = attributeSetObject;
let { 
    cross_style, 
    outer_style, 
    outer_style_index 
} = style;

const getHeight = () => {
    outer_style.fontSize = (window.innerWidth * 0.022) + 'px';
    cross_style.fontSize = (window.innerWidth * 0.022) + 'px';
}
window.addEventListener('resize', getHeight());
// });
// setTimeout(()=>{
//     waitIsShow.value = true;
// },5000)

// if(true) {
// tip.value = 'block'
// setTimeout(()=>{
//   tip.value = 'none'
// },5000)
// }
const sandName = ref('simulation')

function sandChoose() {
    let dataSands = new FormData();
    dataSands.append("user_id", userStore.user_id);
    dataSands.append("sign", sandName.value);
    sand_choose(dataSands).then(res => {
        ElMessage.success(res.msg);
    })
}

const formData = reactive({
    serviceUrl: 'http://47.110.248.80:7589/simulation', //仿真
    serviceUrl_real: 'http://47.110.248.80:7589/real', //沙盘
});


const documentHeight = ref(6.43)
documentHeight.value = document.documentElement.clientHeight / 100;
const form = ref({
    nickName: undefined,
    userName: undefined,
    userId: undefined
});

const { serviceUrl, serviceUrl_real } = toRefs(formData);

// 打开用户弹窗
const handleOpenUserDialog = () => {
    userDialogRef.value.handleOpen();
};
const hibitClick = ref('acticve')
const roleVisible = ref(false);
function startCar(index) {
    //配置项
    switch (index) {
        case '登录':
            centerDialogVisible.value = true;
            isSwitch.value = false
            // debugger
            if (userStore.role && userStore.role === '学生') {
                roleVisible.value = true;
            }
            break;
        case '配置':
            userDialogRef.value.handleOpen();
            break;
        case '监控':
            break;
        default:
            break;
    }
}

document.addEventListener('visibilitychange', function () {
    // 用户离开了当前页面
    if (document.visibilityState === 'hidden') {
        const socket = io.connect(formData.serviceUrl);
        socket.disconnect();
    }

    // 用户打开或回到页面
    if (document.visibilityState === 'visible') {
        console.log('页面可见');
        // sandStart()
    }
});

//公交报站
function busCarVoicePlay() {
    if (switch_type.value == 'simulation') {
        var audio;
        audio = document.getElementById('audio');
        audio.play();
    } else if (switch_type.value == 'real') {
        playVoice({
            status: "voice",
            ctr: 'govoice1',
        }).then(res => {
            console.log("语音播报指令发送成功");
        })
    }
}

watch(waitIsShow, (value) => {
    if (value) {
        waitIsShow.value = false;
        tip_copy['tipA'] = 'block'
        tip.value = 'block'
        setTimeout(() => {
            tip.value = 'none'
            tip_copy['tipA'] = 'none'
        }, 7000)
    }
    console.log("newWaitIsShow", value);
});

let sand = new Sand();

const sandStart = (connectType) => {

    console.log(proxy.config.webApiURL, 'this.$config.port');
    let url = '';
    if (switch_type.value == 'simulation') {
        url = formData.serviceUrl;
    } else if (switch_type.value == 'real') {
        url = formData.serviceUrl_real;
    }
    sandName.value = switch_type.value
    const socket = io.connect(url, {
        // autoConnect: false,
    });
    timer = setTimeout(() => {
        isConnect = true
    }, 2000)
    if (isConnect) {
        ElMessage.error("未连接网络");
    }
    socket.on("connect", () => {
        clearTimeout(timer) //连接成功清除定时器
        sandChoose()
        isSocket.value = true;
        if (connectType == 'real') {
            realConnectBtn.value = false
        } else if (connectType == 'sand') {
            sandConnectBtn.value = false
        }
        ElMessage.success("已连接");
        console.log("已连接socket！！！");
        centerDialogVisible.value = false;

        // ,'user_id':userStore.user_id
        socket.emit("room", { "sign": "enter_room", 'user_id': userStore.user_id });
        console.log('进入房间');
        // 监听断开事件
    });
    socket.on("disconnect", () => {
        isSocket.value = false;
        if (connectType == 'real') {
            realConnectBtn.value = true
        } else if (connectType == 'sand') {
            sandConnectBtn.value = true
        }
        ElMessage.error("已断开连接");
        console.log("已断开socket！！！");
        // socket.reconnect();
        // 监听断开事件
    });


    let warn = new Warn();



    const degList = ['A', 'B', 'C', 'D']
    let degobj = {

    }
    var str = ['i', 'n', 'f', 'o', '正', '常'];
    var str2 = ''
    var Time = null;
    function strs() {
        if (str.length === 0) {
            clearInterval(Time)
            return
        }
        str2 += str.splice(0, 1).toString()
        $('#carA').children().find('p').html(str2)
    }
    Time = setInterval(strs, 1000)
    // socket.on("data", (msg) => {
    //   degobj['car'] = JSON.parse(msg)
    //   if (degobj.car.car_number == 'A') {
    //     // debugger
    //     degobj['car_type'] = {
    //       type: 'info'
    //     }
    //   }

    //   const data = JSON.parse(msg);
    //   console.log(data, 'data');
    //   sand.AddData(data);


    //   if (degobj.car_type.type == 'wran') {
    //     for (var key in wran_bg) {
    //       if (degobj.car.car_number == key) {
    //         wran_bg[key] = wranBg
    //       }
    //     }
    //   }

    //   if (data["car_number"] == "A" && degobj.car_type.type == 'info') {
    //     // waitIsShow.value = true;
    //     for (var key in wran_bg) {
    //       if (degobj.car.car_number == key) {
    //         wran_bg[key] = infoBg
    //       }
    //     }
    //     var dataDeg = $('#carA').attr('data-deg');
    //     warn.Title("A", "info", dataDeg);


    //   }




    // });
    socket.on("position", (msg) => {
        // console.log(msg, 'msg1');
        degobj['car'] = JSON.parse(msg).data
        if (degobj.car.car_number == 'A') {
            // debugger
            degobj['car_type'] = {
                type: 'info'
            }
        }

        const data = JSON.parse(msg).data;
        const { source } = data;
        if (data.people_position) {
            if (data.people_heading === 180) {
                shakedown.list.push(data)
            }

            let people_x = data.people_position.x / 6000 * 100;
            let people_y = (4000 - data.people_position.y - disNumber) / 4000 * 100;
            //   console.log(people_y, 'people_y');
            // debugger

            $("#people_img").attr("src", peopleData.reverse_peo)
            if (data.people_heading === 0) {

                $("#people_walk").animate({ top: parseInt(people_y) + '%', left: parseInt(people_x) + '%' }, 500, function () {
                    $("#people_img").attr("src", peopleData.fro_peo)
                });
            } else if (data.people_heading === 180) {
                $("#people_img").attr("src", peopleData.froPng_peo)
                $("#people_walk").animate({ top: parseInt(people_y) + '%', left: parseInt(people_x) + '%' }, 500, function () {
                    $("#people_img").attr("src", peopleData.froGif_peo)
                    if (Math.abs(people_y) == people_point[data.people_number]) {
                        $("#people_img").attr("src", peopleData.froPng_peo)
                    }
                });
            }


        }


        console.log(data, 'data.people_position');
        if (source == switch_type.value) {
            sand.AddData(data);
        }

        // if (degobj.car_type.type == 'wran') {
        //   for (var key in wran_bg) {
        //     if (degobj.car.car_number == key) {
        //       wran_bg[key] = wranBg
        //     }
        //   }
        // }

        // if (data["car_number"] == "A" && degobj.car_type.type == 'info') {
        //   // waitIsShow.value = true;
        //   for (var key in wran_bg) {
        //     if (degobj.car.car_number == key) {
        //       wran_bg[key] = infoBg
        //     }
        //   }
        //   var dataDeg = $('#carA').attr('data-deg');
        //   warn.Title("A", "info", dataDeg);


        // }




    });

    socket.on("traffic_signal", (msg) => {
        // console.log(msg, 'msg2');
        var a1 = reLight().next()
        let data = JSON.parse(msg).data;
        const { source } = data;
        if (source == switch_type.value) {
            traffic_light[data.position] = Math.ceil(data.remain_time)
            if (traffic_light[data.position] < 10) {
                traffic_light[data.position] = '0' + traffic_light[data.position]
            }
            object[data.position + '_color'] = data.color
            traffic_light[data.position + '_color'] = data.color

            if (data.position == 'cross_road') {
                // rr.value = data
                console.log(data, 'data,data,data');
                // console.log(Math.ceil(data.remain_time));
                light_color.value = data.color
            }
            else if (data.position == 'outer_ring') {
                outlight_color.value = data.color
            }
        }

    });
    socket.on("state", (msg) => {
        // console.log(msg, 'msg3');
    });
};
const rr = reactive({})
const commonTable = (index, type) => {
    if (index === '1') {
        if (isSocket.value) {
            ElMessage({
                message: '请先断开连接',
                type: 'wraning',
            })
            return
        } else {
            switch_type.value = type;
            $("#Outdoor1").addClass('active');
            $("#Outdoor2").removeClass('active');
            $("#first").css({ 'display': 'block' });
            $("#second").css({ 'display': 'none' });
        }

    } else if (index === '2') {
        if (isSocket.value) {
            ElMessage({
                message: '请先断开连接',
                type: 'wraning',
            })
            return
        } else {
            switch_type.value = type;
            $("#Outdoor2").addClass('active');
            $("#Outdoor1").removeClass('active');
            $("#first").css({ 'display': 'none' });
            $("#second").css({ 'display': 'block' });

        }

    } else if (index === '3') {
        ElMessage({
            message: '没有权限',
            type: 'wraning',
        })
    }
}



getFn({ busCarVoicePlay })

</script>
  
<style lang="scss" scoped>
@import '../../assets/sandStyle/index.scss';
@import '../../assets/sandStyle/main.scss';
@import '../../assets/sandStyle/tab.scss';
#videoContainer{
    width: 500px;
    height: 500px;
    background: white;
}

.main {
    .optionItem {
        position: absolute;
        transform: rotate(270deg);
        transform-origin: center center;
    }

    .walk_box {
        position: absolute;
        left: 70%;
        top: 7%;
        width: 0.13rem;

        img {
            display: block;
            width: 100%;
        }
    }

    .newcarBox {
        width: 2.5%;
        /* height: 10px; */


        .message_270 {
            position: absolute;
            top: 5%;
            left: -14%;
            width: 1.3rem;
            display: block;
            opacity: 0.8;
            transform: rotate(270deg);

            img {
                width: 100%;
            }
        }

        .message_90 {
            position: absolute;
            top: 5%;
            left: -14%;
            width: 1.3rem;
            display: block;
            opacity: 0.8;
            transform: rotate(90deg);

            img {
                width: 100%;
            }
        }

        .message_0 {
            position: absolute;
            top: 12%;
            left: 104%;
            width: 1.3rem;
            display: block;
            opacity: 0.8;
            transform: rotate(0deg);

            img {
                width: 100%;
            }
        }

        .message_180 {
            position: absolute;
            top: 12%;
            left: 104%;
            width: 1.3rem;
            display: block;
            opacity: 0.8;
            transform: rotate(180deg);

            img {
                width: 100%;
            }
        }

        .toolTip_90 {
            position: absolute;
            top: 6%;
            left: 63%;
            width: 0.78rem;
            color: #ffffff;
            transform: rotate(-90deg);
        }

        .toolTip_0 {
            position: absolute;
            top: 32%;
            left: 212%;
            width: 0.78rem;
            color: #ffffff;
            transform: rotate(0deg);
        }

        .toolTip_270 {
            position: absolute;
            top: 45%;
            left: 64%;
            width: 0.78rem;
            color: #ffffff;
            transform: rotate(-270deg);
        }

        .toolTip_180 {
            position: absolute;
            top: 32%;
            left: 144%;
            width: 0.78rem;
            color: #ffffff;
            transform: rotate(180deg);
        }

        .car {
            width: 100%;
        }
    }

}</style>