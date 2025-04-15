import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import App from './App.vue'

import { plugin, defaultConfig } from '@formkit/vue'
import { ElementPlusInputs, createAutoAnimatePlugin, createOptionsLoaderPlugin, FormKitSchema, formkitComponent as FormKit } from "./components";
import '@formkit/themes/genesis'

const app = createApp(App);


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.use(ElementPlus)
app.use(plugin, defaultConfig({
    plugins: [createOptionsLoaderPlugin(), createAutoAnimatePlugin({
        // optional config
        duration: 250,
        easing: 'ease-in-out',
        // delay: 0,
    },
        {
            // optional animation targets object
            global: ['outer', 'inner'],
            form: ['form', 'ElForm'],
            repeater: ['items'],
        })
    ],
    inputs: {
        ...ElementPlusInputs
    }
}))

app.use({
    install(app) {
        app._context.components['FormKitSchema'] = FormKitSchema
        app._context.components['FormKit'] = FormKit
    }
})

let router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("./pages/index.vue") },
        { path: '/input', component: () => import('./pages/input.vue') },
        { path: '/select', component: () => import('./pages/select.vue') },
        { path: '/upload', component: () => import('./pages/upload.vue') },
        { path: '/date', component: () => import('./pages/date.vue') },
        { path: '/rate', component: () => import('./pages/rate.vue') },
        { path: '/cascader', component: () => import('./pages/cascader.vue') },
        { path: '/switch', component: () => import('./pages/switch.vue') },
        { path: '/time', component: () => import('./pages/time.vue') },
        { path: '/autocomplete', component: () => import('./pages/autocomplete.vue') },
        { path: '/form', component: () => import('./pages/form.vue') },
        { path: '/transfer', component: () => import('./pages/transfer.vue') },
        { path: '/password', component: () => import('./pages/password.vue') },
        { path: '/slots', component: () => import('./pages/slots.vue') },
        { path: '/tree', component: () => import('./pages/tree.vue') },
        { path: '/radio', component: () => import('./pages/radio.vue') },
        { path: '/dialog', component: () => import('./pages/dialog.vue') },
        { path: '/repeater', component: () => import('./pages/repeater.vue') },
        { path: '/arrayCards', component: () => import('./pages/arrayCards.vue') },
        { path: '/arrayCollapse', component: () => import('./pages/arrayCollapse.vue') },
        { path: '/arrayItems', component: () => import('./pages/arrayItems.vue') },
        { path: '/arrayTabs', component: () => import('./pages/arrayTabs.vue') },
    ],
})

app.use(router);


app.mount('#app')
