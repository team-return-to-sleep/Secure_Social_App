describe('Personal Profile', () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it('should login first', async () => {
    await element(by.type('android.widget.EditText')).atIndex(0).typeText('rgeorge11');
    await element(by.type('android.widget.EditText')).atIndex(1).typeText('@Rohan1');

    await element(by.text('SIGN IN')).tap();
    // Now you should wait for the element that is expected to be visible after login
    await expect(element(by.id('flower-text'))).toBeVisible();
  });

   it('should fail at watering', async () => {
            await element(by.id('PointScreenTab')).tap();

            await element(by.id('waterplant')).tap();
            await element(by.text('OK')).tap();

       });

   it('should go to flower shop', async () => {

         await element(by.id('toshop')).tap();

    });

    it('should not be able to buy cowboy outfit', async () => {
            await element(by.id('buyCowboyButton')).tap();
            // Additional assertions if necessary
            await element(by.text('OK')).tap();
    });

        it('should not be able to buy ribbon outfit', async () => {
            await element(by.id('buyRibbonButton')).tap();
            // Additional assertions if necessary
            await element(by.text('OK')).tap();
            await device.pressBack();
        });

        /*
        it('should not be able to buy headphone outfit', async () => {
            // await element(by.id('scrollView3')).scrollTo('bottom');
            await waitFor(element(by.id('buyHeadphoneButton')).toBeVisible()).whileElement(by.id('scrollView3')).scroll('bottom');
            await element(by.id('buyHeadphoneButton')).tap();
            // Additional assertions if necessary
            await element(by.text('OK')).tap();
        });

        it('should be able to get free outfit', async () => {
            await element(by.id('buyOriginalButton')).tap();
            // await device.pressBack();
            // Additional assertions if necessary
        });
        */


});