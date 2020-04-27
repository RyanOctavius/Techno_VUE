import Vue from 'vue'
import Router from 'vue-router'

const DashboardLayout = () => import('../components/dashboardLayout.vue')
const Login = () => import('../components/login.vue')
const Signup = () => import('../components/signup.vue')
        function loadView(view) {
            return () => import(`../components/dashboardContents/${view}.vue`)
        }
        const routes = [{
            path: '/dashboard',
            component: DashboardLayout,
            children: [
                {
                    name: 'UserController',
                    path: '/user',
                    component: loadView('userController'),
                    title: 'User'
                  
                },
                {
                    name: 'mobilController',
                    path: '/mobil',
                    component: loadView('mobilController'),
                    title: 'Mobil'
                },
                {
                    name: 'motorController',
                    path: '/motor',
                    component: loadView('motorController'),
                    title: 'Motor'
                },
                {
                    name: 'serviceController',
                    path: '/service',
                    component: loadView('serviceController'),
                    title: 'Service'
                },
                {
                    name: 'cartController',
                    path: '/cart',
                    component: loadView('cartController'),
                    title: 'Cart'
                    
                },
                {
                    name: 'mapController',
                    path: '/map',
                    component: loadView('maps'),
                    title: 'Map'
                    
                }
            ]
        },
        {
            name: 'login',
            path: '/',
            component: Login,
            title: 'Login'
        },
        {
            name: 'signup',
            path: '/signup',
            component: Signup,
            title: 'Login'
        }
        ];
       
        Vue.use(Router) 
            const router = new Router({mode: 'history', routes: routes})
        export default router
