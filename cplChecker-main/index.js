const rwClient = require('./twitterClient.js');
const schedule = require('node-schedule');
const puppeteer = require('puppeteer');

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


(async() => {

    let theDates = [];
    //will not work if u dont update the user and password!

    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'URSPAMEMAIL',
    //       pass: 'PASSWORD'
    //     }
    //   });
      
    
    //   var mailOptions = {
    //     from: 'URSPAMEMAIL',
    //     to: 'MAINEMAIL',
    //     subject: '12 or more!',
    //     text: 'That was easy! https://waynecountyescheduler.as.me/schedule.php'
    //   };
      
    //   var underTwelve = {
    //     from: 'URSPAMEMAIL',
    //     to: 'MAINEMAIL',
    //     subject: 'Alert! 12 or under',
    //     text: 'That was easy! https://waynecountyescheduler.as.me/schedule.php'
    //   };


    console.dir(theDates, {'maxArrayLength': null})


    schedule.scheduleJob('* * * * *', async () => {

    const now = new Date();


    //open browser wait for the cpl application button click it
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0); 

    await page.goto("https://waynecountyescheduler.as.me/schedule.php");
    const elements = await page.waitForXPath('//*[@id="step-pick-appointment"]/div[1]/div[1]/div[4]/label');
    console.log("found selector")
 
 //add back if ncessary
    //   await page.waitForTimeout(12000);
    await elements.click() 



 
    console.log(now);
    await page.waitForTimeout(5000);
    // console.log('waiting 5 seconds screenshotting ')
    // console.log(elements);
    //SCREENSHOT
    //    await page.screenshot({path: 'f' + now + '.png' });
    await page.waitForTimeout(3000);


        //record the DATE IN TEXT!


    const element = await page.waitForSelector('.date-head-text'); // select the element
    const value = await element.evaluate(el => el.textContent); // grab the textContent from the element, by evaluating this function in the browser context

    //wont push the second instance    
    theDates.push(value + " " + now);

    console.log(value + " value");    


//    console.log(theDates);
//get the week number and isolate it here
    var isolatedNum = value.replace(/\D/g, ""); // replace all leading non-digits with nothing
    console.log(isolatedNum + " isolatedNum");
    
   //mayeb try if isolatedNum === undefined 
    if (isolatedNum === "" ){
        console.log('Next week appointment available')
        console.table(theDates);

        const tweet = async () => {
            try {
                await rwClient.v1.tweet(`Next week appointment now available be fast! https://waynecountyescheduler.as.me/schedule.php ${now} ${time}`  );
                console.log('just tweeted')
            } catch (e) {
                console.error(e)
            }
        }
        
        
        tweet();
        
        
        
        
        


        /*
        transporter.sendMail(underTwelve, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          

*/



    } else if (isolatedNum <= 4) {
        console.log('less than 5 week appointment available')
        console.table(theDates);

        const tweet = async () => {
            try {
                await rwClient.v1.tweet(`${isolatedNum} weeks now available be fast! https://waynecountyescheduler.as.me/schedule.php ${now}`  );
                console.log('just tweeted')
            } catch (e) {
                console.error(e)
            }
        }
        
        
        tweet();

    }     else {
        console.log('More than 12 ignore');
     //   console.table(theDates);


    }
    console.table(theDates);

    await browser.close()


    })





})()


//appointmentType-15329300