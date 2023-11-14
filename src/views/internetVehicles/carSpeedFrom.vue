<template>
    <div id="watchElDialog">
        <el-dialog class="watchElDialog" v-model="dialogVisible" width="7rem" :show-close="false">
            <div id="dialogIcon" @click="dialogVisible= false">
                <el-icon><Close /></el-icon>
            </div>
            <div class="headLog" style="position: relative;">
                <span>行人避让</span>
                <span class="linear_one"></span>
                <span class="linear_two"></span>
            </div>
            <div class="avoidance">
                <img class="carIcon" src="../../assets/images/carD.png" alt="默认" width="10%"/>
                <div class="switchBtn" @click="carOpen('D')">
                    <img v-show="carD" src="../../assets/images/open.png" style="height: 0.4rem;">
                    <img v-show="!carD" src="../../assets/images/close.png" style="height: 0.4rem;">
                    <span class="title">{{ carD ? 'D车启动' : 'D车关闭' }}</span>
                </div>
                <el-form :inline="true" :model="speedForm" class="demo-form-inline">
                    <el-form-item label="速度：">
                        <el-input v-model="speedForm.D" :disabled="carD ? false : true" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('D', carD)"></el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="headLog" style="position: relative;">
                <span>防碰撞</span>
                <span class="linear_three"></span>
                <span class="linear_four"></span>
            </div>
            <div class="avoidance">
                <img class="carIcon" src="../../assets/images/carA.png" alt="默认" width="10%"/>
                <div class="switchBtn" @click="carOpen('A')">
                    <img v-show="carA" src="../../assets/images/open.png" style="height: 0.4rem;">
                    <img v-show="!carA" src="../../assets/images/close.png" style="height: 0.4rem;">
                    <span class="title">{{ carA ? 'A车启动' : 'A车关闭' }}</span>
                </div>
                <el-form :inline="true" :model="speedForm" class="demo-form-inline">
                    <el-form-item label="速度：">
                        <el-input v-model="speedForm.A" :disabled="carA ? false : true" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('A', carA)"></el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="avoidance">
                <img class="carIcon" src="../../assets/images/carB.png" alt="默认" width="10%"/>
                <div class="switchBtn" @click="carOpen('B')">
                    <img v-show="carB" src="../../assets/images/open.png" style="height: 0.4rem;">
                    <img v-show="!carB" src="../../assets/images/close.png" style="height: 0.4rem;">
                    <span class="title">{{ carB ? 'B车启动' : 'B车关闭' }}</span>
                </div>
                <el-form :inline="true" :model="speedForm" class="demo-form-inline">
                    <el-form-item label="速度：">
                        <el-input v-model="speedForm.B" :disabled="carB ? false : true" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('B', carB)"></el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="headLog" style="position: relative;">
                <span>公交报站</span>
                <span class="linear_five"></span>
                <span class="linear_six"></span>
            </div>
            <div class="avoidance">
                <img class="carIcon" src="../../assets/images/carC.png" alt="默认" width="10%"/>
                <div class="switchBtn" @click="carOpen('C')">
                    <img v-show="carC" src="../../assets/images/open.png" style="height: 0.4rem;">
                    <img v-show="!carC" src="../../assets/images/close.png" style="height: 0.4rem;">
                    <span class="title">{{ carC ? 'C车启动' : 'C车关闭' }}</span>
                </div>
                <el-form :inline="true" :model="speedForm" class="demo-form-inline">
                    <el-form-item label="速度：">
                        <el-input v-model="speedForm.C" :disabled="carC ? false : true" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('C', carC)"></el-button>
                    </el-form-item>
                </el-form>
            </div>

        </el-dialog>
    </div>
</template>
<script setup>
import { reactive } from 'vue'
import { ref } from 'vue'
import { carStart, carStop } from '@/api/system/car'
import { ElMessage } from 'element-plus'

import useUserStore from "@/store/modules/user";
const userStore = useUserStore();

function verify(number){
    if (!(/(^[0-9]\d*$)/.test(number))) {
        ElMessage({
            message: '输入的不是正整数',
            type: 'warning',
        })
        return false;
    } 
    if (number < 0) {
        ElMessage({
            message: '请输入大于0的数字',
            type: 'warning',
        })
        return false
    }
    if (number > 1000) {
        ElMessage({
            message: '不能超过1000',
            type: 'warning',
        })
        return false
    }
    return true;
}

const carA = ref(true);
const carB = ref(true);
const carC = ref(true);
const carD = ref(true);
const dialogVisible = ref(false)
const speedForm = reactive({
    A: '',
    B: '',
    C: '',
    D: ''
})
const car_num = ref('')
// 打开用户弹窗组件
const handleOpen = () => {
    dialogVisible.value = true;
}

//提交按钮
const submitForm = (formEl, state) => {
    
    let number = Number(speedForm[formEl]);
    console.log(number);
    let dataobj = new FormData();
    dataobj.append("user_id", userStore.user_id);
    dataobj.append("car_number", formEl);
    if (state) {
        dataobj.append("car_speed", number);
        if(!verify(number)) {
            return
        }
        carStart(dataobj).then(res => {
            ElMessage({
                message: formEl+'车已启动',
                type: 'success',
            })
        })
    } else {
        carStop(dataobj).then(res => {
            ElMessage({
                message: formEl+'车已停止',
                type: 'success',
            })
        })
    }

}
const emit = defineEmits(["onReceiveMsg"]);
//重置表单
const resetFrom =()=>{
    if(carD.value == false) speedForm.D = ''
    if(carA.value == false) speedForm.A = ''
    if(carB.value == false) speedForm.B = ''
    if(carC.value == false) speedForm.C = ''
}
const carOpen = (type) => {
    car_num.value = type
    switch (type) {
        case 'D':
            carD.value = !carD.value
            emit("onReceiveMsg", type);
            resetFrom()
            break;
        case 'A':
            carA.value = !carA.value
            emit("onReceiveMsg", type);
            resetFrom()
            break;
        case 'B':
            carB.value = !carB.value
            emit("onReceiveMsg", type);
            resetFrom()
            break;
        case 'C':
            carC.value = !carC.value
            emit("onReceiveMsg", type);
            resetFrom()
            break;
        default:
            break;
    }

}

// 子组件默认包含是私有
defineExpose({
    handleOpen,
    // carOpen
})
</script>
<style lang="scss" scoped>
:deep(.el-dialog) {
    position: relative;
    background-image: url(/src/assets/images/bg1.png) !important;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    opacity: 0.9;
    background-color: transparent;
    #dialogIcon {
          position: absolute;
          top: 0.18rem;
          right: 0.16rem;
        }
        .el-icon {
          font-size: 0.26rem;
          color: #ffff;
        }
}

:deep(.el-form-item__label) {
    color: #ffffff;
    font-size: 16px;
    font-weight: 100;
}

:deep(.el-dialog__body) {
    padding-left: 1.11rem;
    padding-top: 0.57rem;
}

:deep(.el-input__wrapper) {
    border-radius: 0 !important;
}

:deep(.el-input__inner) {
    width: 84px;
}
:deep(.el-form-item) {
    margin-bottom: 0;
}

.watchElDialog {

    .headLog {
        margin-bottom: 0.2rem;
        color: #ffffff;

        .linear_one {
            position: absolute;
            top: 0;
            left: -89px;
            z-index: -1;
            display: block;
            width: 2.46rem;
            height: 0.2rem;
            background-image: linear-gradient(90deg, rgba(255, 0, 0, 0) 8%, #CC6633 38%, #CC6633 58%, rgba(255, 0, 0, 0) 90%);
        }

        .linear_two {
            position: absolute;
            top: -7px;
            left: -89px;
            z-index: -1;
            display: block;
            width: 2.46rem;
            height: 0.33rem;
            background-image: linear-gradient(90deg, rgba(255, 0, 0, 0) 8%, #CC6633 38%, #CC6633 58%, rgba(255, 0, 0, 0) 90%);
        }

        .linear_three {
            position: absolute;
            top: 0;
            left: -89px;
            z-index: -1;
            display: block;
            width: 2.46rem;
            height: 0.2rem;
            background-image: linear-gradient(90deg, rgba(255, 0, 0, 0) 8%, #0099CC 38%, #0099CC 58%, rgba(255, 0, 0, 0) 90%);
        }

        .linear_four {
            position: absolute;
            top: -7px;
            left: -89px;
            z-index: -1;
            display: block;
            width: 2.46rem;
            height: 0.33rem;
            background-image: linear-gradient(90deg, rgba(255, 0, 0, 0) 8%, #0099CC 38%, #0099CC 58%, rgba(255, 0, 0, 0) 90%);
        }

        .linear_five {
            position: absolute;
            top: 0;
            left: -89px;
            z-index: -1;
            display: block;
            width: 2.46rem;
            height: 0.2rem;
            background-image: linear-gradient(90deg, rgba(255, 0, 0, 0) 8%, #66CC66 38%, #66CC66 58%, rgba(255, 0, 0, 0) 90%);
        }

        .linear_six {
            position: absolute;
            top: -7px;
            left: -89px;
            z-index: -1;
            display: block;
            width: 2.46rem;
            height: 0.33rem;
            background-image: linear-gradient(90deg, rgba(255, 0, 0, 0) 8%, #66CC66 38%, #66CC66 58%, rgba(255, 0, 0, 0) 90%);
        }
    }

    .dialog-footer {
        text-align: center;
    }
}

.avoidance {
    display: flex;
    margin-bottom: 0.2rem;
    align-items: center;
    .carIcon {
        width: 5%;
        transform: rotate(270deg);
    }
    .switchBtn {
        position: relative;
        height: 0.4rem;
        margin-left: 0.2rem;

        img {
            height: 100%;
        }

        .title {
            position: absolute;
            top: 25%;
            left: 44%;
            color: #ffffff;
            display: block;
        }
    }

    .switchClose {
        position: relative;
        height: 0.4rem;

        img {
            height: 100%;
        }

        .title {
            position: absolute;
            top: 21%;
            left: 44%;
            color: #ffffff;
            display: block;
        }
    }

    :deep(.el-button--primary) {
        width: 0.8rem;
        background-image: url('../../assets/images/lianjie02.png');
        background-size: cover;
    }

    .el-form {
        flex: 3;
        margin-left: 0.6rem;
    }
}</style>