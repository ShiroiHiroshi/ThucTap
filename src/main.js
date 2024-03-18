import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ToastService from 'primevue/toastservice';
import Checkbox from 'primevue/checkbox';

import Password from 'primevue/password';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css';

import '@/assets/styles.scss';

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.component('Password',Password)
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Checkbox', Checkbox)
app.use(router)
app.mount('#app')