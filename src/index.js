import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';
import enUS from 'antd/lib/locale-provider/en_US';

import { i18nClient } from './i18n';
import Home from './components/own/Home'
import registerServiceWorker from './registerServiceWorker';

const antResources = {
    ko: koKR,
    'ko-KR': koKR,
    en: enUS,
    'en-US': enUS,
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
const link= document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'css/fonts/Montserrat/Montserrat.css';
const link1= document.createElement('link');
link1.rel = 'stylesheet';
link1.type = 'text/css';
link1.href = 'css/fonts/Cronicon/Cronicon.css';
const link2= document.createElement('link');
link2.rel = 'stylesheet';
link2.type = 'text/css';
link2.href = 'css/styles.css';
const link3= document.createElement('link');
link3.rel = 'stylesheet';
link3.type = 'text/css';
link3.href = 'css/demo.css';
const link4= document.createElement('link');
link4.rel = 'stylesheet';
link4.type = 'text/css';
link4.href = 'https://cdn.syncfusion.com/ej2/material.css';
document.body.appendChild(link);
document.body.appendChild(link1);
document.body.appendChild(link2);
document.body.appendChild(link3);
document.body.appendChild(link4);
const render = (Component) => {
    const rootElement = document.getElementById('root');
    ReactDom.render(
        <AppContainer>
            <LocaleProvider locale={antResources[i18nClient.language]}>
                <Component />
            </LocaleProvider>
        </AppContainer>,
        rootElement,
    );
};

render(Home);
if (module.hot) {
    module.hot.accept('./components/own/Home', () => {
        render(Home);
    });
}

registerServiceWorker();
