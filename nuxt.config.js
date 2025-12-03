import colors from 'vuetify/es5/util/colors'

export default {
    ssr: false,
    target: 'static', 
    router: {
        base: '/nuxtjs/' // github repository 이름 넣기
    },
    env: {
        listNumber : 13, //한 화면에 보여줄 데이터 수
        ChatLimitNum : 20, //채팅방 입장시 처음으로 보여줄 채팅 수 제한
        imgUpLoadURL : 'http://50.16.27.105:3001'  // 이미지 저장용 ec2 서버
    },
    axios: {
        //baseURL: 'http://localhost:8001', 
        baseURL: 'http://commu.cafe24app.com',
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    // <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    head: {
        titleTemplate: '%s - 자유로운 토크',
        title: '자톡',
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
        '@/plugins/directives.js',
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
