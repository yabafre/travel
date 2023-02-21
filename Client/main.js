import Locations from "./components/locations.js"
import Place from "./components/place.js"
import LocationDetails from './components/LocationDetails.js';

const options = {
    data(){
        return {
        };
    },
    components:{
        Locations,
        LocationDetails,
        Place
    },
}

const routes = [
    { path: '/', component: Locations, meta: {
            title: 'List of locations'
        } },
    { path: '/:slug/:locationId(\\d+)/places',name: "LocationDetails", component: LocationDetails, props: true, meta: {
            title: 'Détails of location'
        } },
]

const router = VueRouter.createRouter(
    {
        history: VueRouter.createWebHashHistory(),
        routes,
    }
)

const app = Vue.createApp(options).use(router).mount('#app');
