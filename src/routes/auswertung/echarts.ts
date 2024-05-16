import { appWindow } from '@tauri-apps/api/window';
import * as charts from 'echarts';

const chartList: charts.ECharts[] = [];

let timer: null | NodeJS.Timeout = null;

function debounce(fn: (...params: any[]) => any, timeout: number) {
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        fn();
    }, timeout)
}

function resizeAll() {
    for (const chart of chartList) {
        chart.resize();
    }
}

appWindow.listen("tauri://resize", () => {
    debounce(resizeAll, 100);
});

export function echarts(node: HTMLDivElement, option: any) {
    const chart = charts.init(node, null, {
        renderer: "svg"
    });
    chart.setOption(option);

    chartList.push(chart);
}

export function getVirtualData(year: string) {
    const date = +charts.time.parse(year + '-01-01');
    const end = +charts.time.parse(+year + 1 + '-01-01');
    const dayTime = 3600 * 24 * 1000;
    const data: [string, number][] = [];
    for (let time = date; time < end; time += dayTime) {
        data.push([
            charts.time.format(time, '{yyyy}-{MM}-{dd}', false),
            Math.floor(Math.random() * 100)
        ]);
    }
    return data;
}

