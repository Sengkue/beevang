import Vue from "vue";
import { Line, Bar, Bubble, Doughnut, Pie, PolarArea, Radar, Scatter } from "vue-chartjs/legacy";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement,
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    PointElement,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    CategoryScale,
    ArcElement,

);

Vue.component("line", {
    extends: Line,
});
Vue.component("bar", {
    extends: Bar,
});
Vue.component("bubble", {
    extends: Bubble
});
Vue.component("pie", {
    extends: Pie,
});
Vue.component("polarArea", {
    extends: PolarArea
});
Vue.component("radar", {
    extends: Radar
});
Vue.component("scatter", {
    extends: Scatter
});
Vue.component("Doughnut", {
    extends: Doughnut
});