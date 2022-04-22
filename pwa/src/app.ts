import { createApp } from 'vue';
// @ts-ignore
import App from './components/App.vue';
import { API_ENDPOINT as API_ENDPOINT_VALUE } from './utils/environment';
import { API_ENDPOINT as API_ENDPOINT_KEY } from './utils/providers';

export default createApp(App).provide(API_ENDPOINT_KEY, API_ENDPOINT_VALUE);