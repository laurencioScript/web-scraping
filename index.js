const puppeteer = require("puppeteer");
const readlineSync = require("readline-sync");
console.log("Bem-vindo ao Bot conversor");

async function createRobo() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const moedaBase = readlineSync.question("Informe a moeda base: ") || "dolar";
  const moedaFinal =
    readlineSync.question("Informe a moeda desejada: ") || "real";

  const url = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&rlz=1C1SQJL_enBR887BR887&oq=${moedaBase}+para+${moedaFinal}&aqs=chrome.0.0l8.5579j1j7&sourceid=chrome&ie=UTF-8`;

  await page.goto(url);
  await page.screenshot({ path: "backup.png" });
  const valueConvert = await page.evaluate(() => {
    return document.querySelector(".a61j6.vk_gy.vk_sh.Hg3mWc").value;
  });
  console.log(`O valor de 1 ${moedaBase} é ${valueConvert} em ${moedaFinal}`);
  await browser.close();
}

createRobo();
