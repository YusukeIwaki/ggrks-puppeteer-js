// yarn init -y
// yarn add puppeteer-core

const puppeteer = require("puppeteer-core");

const searchKeyword = process.argv.slice(2).join(" ") || 'puppeteer';

const launchChrome = puppeteer.launch({
    // MacにインストールされているChromeを使う。
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',

    // ブラウザ画面を表示しながら（ヘッドレスモードを無効にする）。
    headless: false,

    args: [
        // ゲストセッションで操作する。
        "--guest",

        // ウインドウサイズをデフォルトより大きめに。
        '--window-size=1280,800',
    ],

    // 人間味のある速度で入力/操作する。
    slowMo: 50,
});

launchChrome.then(async (browser) => {
    // 大抵のサンプルコードはここで単純に browser.newPage() しているだけのものが多いが、
    // ブラウザを開いたときにすでに１つタブが開いている場合には、２つ目のタブが開いてしまう。
    // それを防ぐため、すでにタブが開いている場合にはそれを使うようにする。
    const page = (await browser.pages())[0] || (await browser.newPage());

    await page.setViewport({ width: 1280, height: 800 });

    await page.goto("https://google.com/");
    await page.type("input[name='q']", searchKeyword);
    await page.keyboard.press("Enter");
});
