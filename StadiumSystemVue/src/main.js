// import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router'; // استيراد الراوتر

import './assets/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);

app.use(router); // إضافة الراوتر للتطبيق

app.mount('#app');