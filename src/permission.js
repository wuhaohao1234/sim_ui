import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import useSettingsStore from '@/store/modules/settings'

NProgress.configure({ showSpinner: false });

const whiteList = ['/index', '/login', '/register', '/internet/internetVehicles'];

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        to.meta.title && useSettingsStore().setTitle(to.meta.title)
            /* has token*/
        next('/internet/internetVehicles')
        NProgress.done()
    } else {
        // 没有token

        console.log(to.path, 'to.path');
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next('/internet/internetVehicles')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})