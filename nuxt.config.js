import colors from 'vuetify/es5/util/colors'

export default {
    ssr: false,
    target: 'static', 
    router: {
        base: '/nuxtjs/' // github repository 이름 넣기
    },
    env: {
        listNumber : 15, //한 화면에 보여줄 데이터 수
        nodeURL : 'http://54.210.225.118:80/'
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    // <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    head: {
        titleTemplate: '%s - nuxtProject',
        title: 'nuxtProject',
        htmlAttrs: {
        lang: 'en'
    },
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        //{ 'http-equiv': 'Content-Security-Policy' , content: 'upgrade-insecure-requests'}
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
    },
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/css/common.css' ,
        'bulma/css/bulma.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/plugins.js',
        {src:'@/plugins/tui-editor.js', ssr:false}
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
        '@nuxtjs/moment'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios'
    ],
    axios: {
        baseURL: 'http://54.210.225.118:80/',
    },
    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {

        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        
    }
}
