
export const setRem = () => {
    const reScreenSize = (wid) => {
      // 当设备宽度小于1400px时，不在改变rem的值
      // if (wid <= 1400) return;
      var w = document.documentElement.clientWidth; // 获取设备的宽度
      var clientW = 1440;
      clientW = parseFloat(w);
      let n = w / clientW  * 100
      document.documentElement.style.fontSize = n+'px';
    };
    
    reScreenSize();
    window.addEventListener('load', reScreenSize);
    window.addEventListener('resize', () => reScreenSize(document.documentElement.clientWidth));
  };
//   (function(win) {
//     var tid;

//     function refreshRem() {
//       let designSize = 1920; // 设计图尺寸
//       let html = document.documentElement;
//       let wW = html.clientWidth; // 窗口宽度
//       let rem = wW * 100 / designSize / 8;
//       document.documentElement.style.fontSize = rem + 'px';
//     }

//     win.addEventListener('resize', function() {
//       clearTimeout(tid);
//       tid = setTimeout(refreshRem, 300);
//     }, false);
//     win.addEventListener('pageshow', function(e) {
//       if (e.persisted) {
//         clearTimeout(tid);
//         tid = setTimeout(refreshRem, 300);
//       }
//     }, false);

//     refreshRem();

//   })(window);



