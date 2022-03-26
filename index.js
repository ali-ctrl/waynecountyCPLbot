

const schedule = require('node-schedule');
const puppeteer = require('puppeteer');

(async() => {


    let theDates = [];

    schedule.scheduleJob('* * * * *', async () => {

    const now = new Date();


    //open browser wait for the cpl application button click it
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto("https://waynecountyescheduler.as.me/schedule.php");
    const elements = await page.waitForXPath('//*[@id="step-pick-appointment"]/div[1]/div[1]/div[4]/label');
    console.log("found selector")
    await page.waitForTimeout(3000);
    await elements.click() 



 
    console.log(now);
    //screenshot
    await page.waitForTimeout(5000);
    console.log('waiting 5 seconds screenshotting ')
    console.log(elements);
    await page.screenshot({path: 'f' + now + '.png' });
    await page.waitForTimeout(3000);


        //record the DATE IN TEXT!


    const element = await page.waitForSelector('.date-head-text'); // select the element
    const value = await element.evaluate(el => el.textContent); // grab the textContent from the element, by evaluating this function in the browser context
    //wont push the second instance    
    theDates.push(value + " " + now);

    console.log(value);    
    console.log(theDates);
    await browser.close()


    })





})()


//appointmentType-15329300