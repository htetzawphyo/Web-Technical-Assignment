import './bootstrap';
import {createApp} from 'vue';
import router from './router';
import App from './App.vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import { createPinia } from 'pinia';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faTents } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import DataTable from 'datatables.net-vue3';
import Select from 'datatables.net-select';

/* add icons to the library */
library.add(faBars, faXmark, faChartLine, faTents, faList, faTableCellsLarge, faArrowRightFromBracket, faPlus, faAngleRight, faAngleDown, faCloudArrowUp, faPenToSquare, faTrash);

DataTable.use(Select);

createApp(App)
.use(router)
.use(CKEditor)
.use(createPinia())
.component('font-awesome-icon', FontAwesomeIcon)
.mount("#app");