// import internal from "stream";

import { el, tr } from "element-plus/es/locale";
import Stack from "./stack";
import { gsap, TimelineMax } from 'gsap';
import $ from 'jquery'
import { time } from "echarts";
import { playVoice } from "./voice"

const voiceFn = ref(null);
export const getFn = ({ busCarVoicePlay }) => {
  voiceFn.value = busCarVoicePlay;
}


class Sand {


  dicStack: { [key: string]: Stack } = {};

  sandHight: number = 4000;

  dicSandTrack: { [key: string]: Track; } =
    { "防碰撞": new Track("防碰撞", 1723, 260, 260, 5516), "公交报站": new Track("公交报站", 3516, 2053, 260, 3013), "行人避让": new Track("行人避让", 3516, 2053, 3343, 5516) };
  dicSimTrack: { [key: string]: Track; } =
    {
      "防碰撞": new Track("防碰撞", 50, 90, 3, 95), "公交报站": new Track("公交报站", 3, 43, 3, 50)
      , "行人避让": new Track("行人避让", 3, 43, 57, 95)
    };

  dicCarBelongsTrack: { [key: string]: string } = { "A": "防碰撞", "B": "防碰撞", "C": "公交报站", "D": "行人避让" }

  dicLastCar: { [key: string]: Car } = {};


  dicStatus: { [key: string]: string } = {};






  Animate(car: Car, duration: number, wait: boolean = false) {

    $("#car" + car.carNumber.toUpperCase()).css({ "transform": 'rotate(' + car.handing + 'deg)', "transform-origin": "center center" });
    $("#car" + car.carNumber.toUpperCase()).attr('data-deg', car.handing)
   
    $("#car" + car.carNumber.toUpperCase()).animate(
      { "top": car.simPosition["y"] + '%', "left": car.simPosition["x"] + '%', deg: car.handing }
      , duration
      , "linear"
      , function () {
        // playVoice({
        //   status:"voice",
        //   ctr:'govoice1',
        // }).then(res=>{
        //   console.log("语音播报指令发送成功");
        // })
        // debugger;
        console.log("当前动画结束", car.simPosition, car.handing, new Date());
      });

  }

  AddData(data: JSON) {
    let carNumber = data["car_number"];
    if (this.dicStack.hasOwnProperty(carNumber)) {
      let stack = this.dicStack[carNumber];
      stack.push(data);
    }
    else {
      let stack = new Stack();
      stack.push(data);
      this.dicStack[carNumber] = stack;
    }
  

    if (this.dicStatus.hasOwnProperty(carNumber) == false || this.dicStatus[carNumber] == "STOP") {
      this.dicStatus[carNumber] = "RUN";
      this.Run(this.dicStack[carNumber], carNumber);
    }

  }

  


  Run(stack: Stack, carNumber: string) {

    while (stack.len() > 0) {

      let j = stack.top();
      let car = new Car();
      car.carNumber = j["car_number"];
      car.position = j["car_position"];
      car.speed = j["car_speed"];
      car.handing = j["car_heading"];
      car.timestamp = j["time_stamp"];
      car.last_position_stop_time = j["last_position_stop_time"];
      this.GenerateSimulatedosition(car);
      // 进行公交播报
      this.Broadcast(car);
      console.log("小车队列开始", car.simPosition, car.handing, new Date());
      if (this.dicLastCar.hasOwnProperty(car.carNumber)) {

        let lastCar = this.dicLastCar[car.carNumber];

        if (lastCar.handing != car.handing && [0,90,180,270].indexOf(car.handing) > -1) {

          let addCar = new Car();
          addCar.carNumber = carNumber;
          addCar.handing = lastCar.handing;
          // 根据车找到对应赛道
          let track = this.dicSandTrack[this.dicCarBelongsTrack[carNumber]];
          //  生成点时候的顺时针还是逆时针根据车信息初始化而定，目前给了默认值true
          let position = track.GenerateRoundPoint(car.handing, addCar.isClockwise);
          addCar.position = position;
          addCar.timestamp = car.timestamp;
          this.GenerateSimulatedosition(addCar);
          this.Animate(addCar, (car.timestamp - lastCar.timestamp - car.last_position_stop_time * 1000 ) * 0.95, true);
          stack.pop();
          this.dicLastCar[carNumber] = car;

        }
        else {
    
            this.Animate(car, (car.timestamp - lastCar.timestamp - car.last_position_stop_time * 1000) * 0.95, true);
            stack.pop();
            this.dicLastCar[carNumber] = car;
        }

      }
      // 收到的第一个点
      else {
        this.Animate(car, 100);
      }
      this.dicLastCar[car.carNumber] = car;
    }

    this.dicStatus[carNumber] = "STOP";

  }
  GenerateSimulatedosition(car: Car) {

    let trackName = this.dicCarBelongsTrack[car.carNumber];
    let sandTrack = this.dicSandTrack[trackName];
    let simTrack = this.dicSimTrack[trackName];

    car.simPosition["x"] = (Number(car.position["x"]) - sandTrack.left) * (simTrack.right - simTrack.left) / (sandTrack.right - sandTrack.left) + simTrack.left;
    car.simPosition["y"] = simTrack.down - Number(Number(car.position["y"]) - sandTrack.down) * (simTrack.down - simTrack.up) / (sandTrack.up - sandTrack.down);

  }

  Clear(carNumber:string)
  {

    if(this.dicStack.hasOwnProperty(carNumber))
    {
      this.dicStack[carNumber].clear();
    }
    delete this.dicLastCar[carNumber]

  }

  Broadcast(car:Car)
  {
    let position = {"x":1619.934,"y":2128.000}
    if(car.carNumber == "C" && Math.trunc(car.position["x"]) == Math.trunc(position.x) && Math.trunc( car.position["y"]) == Math.trunc( position.y))
    {
      // debugger;
      // alert("已经到达")
      voiceFn.value()
      
    }
  }



}


class Car {

  carNumber: string;

  position: { [key: string]: number } = {};
  simPosition: { [key: string]: number } = {};
  isClockwise: boolean = true;

  status: string = "正常";
  handing: number;
  speed?: number;
  timestamp: number;
  last_position_stop_time:number=0;

  data: JSON[] = [];

  constructor(carNumber: string = "", position?: any, handing: number = 0, speed: number = 0,
    timestamp: number = 0, isClockwise: boolean = true) {
    this.carNumber = carNumber;
    this.position = position;
    this.handing = handing;
    this.speed = speed;
    this.timestamp = timestamp;
    this.isClockwise = isClockwise;
  }


}



class Track {

  scence: string;
  up: number;
  down: number;
  left: number;
  right: number;

  constructor(scence: string, up: number, down: number, left: number, right: number) {
    this.scence = scence;
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
  }

  GenerateRoundPoint(handing: number, isClockwise: boolean) {


    //  handing为转到角度
    if ((isClockwise && handing == 90) || (isClockwise == false && handing == 180)) {
      return { "x": this.left, "y": this.up }
    }
    else if ((isClockwise && handing == 180) || (isClockwise == false && handing == 270)) {
      return { "x": this.right, "y": this.up }
    }
    else if ((isClockwise && handing == 270) || (isClockwise == false && handing == 0)) {
      return { "x": this.right, "y": this.down }
    }

    else if ((isClockwise && handing == 0) || (isClockwise == false && handing == 90)) {
      return { "x": this.left, "y": this.down }
    }
    return { "x": 0, "y": 0 };

  }


}


export default Sand;

