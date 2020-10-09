import App from 'next/app';
import type { AppProps /*, AppContext */ } from 'next/app';
import { ConfigProvider } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
// import zhCN from 'antd/es/locale/zh_CN';
import zhCN from 'antd/lib/locale-provider/zh_CN'; // fix: SyntaxError: Cannot use import statement outside a module
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import { appWithTranslation } from '../i18n';
import { RecoilRoot } from 'recoil';

moment.locale('zh-cn');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ConfigProvider locale={zhCN}>
        <Component {...pageProps} />
      </ConfigProvider>
    </RecoilRoot>
  );
}

MyApp.getInitialProps = async (appContext) => ({ ...(await App.getInitialProps(appContext)) });

export default appWithTranslation(MyApp);
