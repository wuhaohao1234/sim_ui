<template>
  <router-view />
</template>

<script setup>
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'
import { setRem } from "@/utils/rem.js";
import { get_user_data } from "@/api/system/user";
import useUserStore from '@/store/modules/user';

const userStore = useUserStore();
create();
function create() {
  if (
    window.location.href.split("=")[1] &&
    window.location.href.split("=")[2]
  ) {
    let url = window.location.search; //获取url中"?"符后的字串 ('?modFlag=business&role=1')
    console.log(url,'url');
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
      let str = url.substr(1); //substr()方法返回从参数值开始到结束的字符串；
      let strs = str.split("&");
      // console.log(strs);
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
      }
      let taskId = theRequest.taskId;
      let template_name = decodeURI(theRequest.template_name);
      let user_token = theRequest.user_token;

      userStore.taskId = taskId;
      userStore.template_name = template_name;
      userStore.token = user_token;
      userStore.user_id = theRequest.userId;
      let datatimes = new FormData();
      datatimes.append("user_id", userStore.user_id);
      get_user_data(datatimes).then((res) => {
        let parseG = JSON.parse(res.user_data);
        userStore.role = parseG.role;
      });
    }
  }
}

// (function(win) {
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

onMounted(() => {
  setRem(); // 初始化页面比例
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(useSettingsStore().theme)
  })
})
</script>
