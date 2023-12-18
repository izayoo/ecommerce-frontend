import { setupCalendar, Calendar, DatePicker  } from 'v-calendar';
import 'v-calendar/style.css';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(setupCalendar, {}).component('VCalendar', Calendar)
        .component('VDatePicker', DatePicker)
})