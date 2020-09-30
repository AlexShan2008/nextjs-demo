import * as Bowser from 'bowser';

let browser = null;

export let isMobile;

if (typeof window !== 'undefined') {
  browser = Bowser.getParser(window.navigator.userAgent);
  isMobile = browser.getPlatform().type === 'mobile';
}

export default browser;
