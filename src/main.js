import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Bootstrap CSS bundled
import './assets/css/main.min.css';

// Bootstrap JS bundled
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

const app = createApp(App).use(store).use(router);

// Global filters
app.config.globalProperties.$filters = {
  capitalizeString(str) {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  },
};

// Mount app
app.mount('#app');
