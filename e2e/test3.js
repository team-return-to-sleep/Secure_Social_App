describe('Personal Profile', () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it('should login first', async () => {
    await element(by.type('android.widget.EditText')).atIndex(0).typeText('rgeorge13');
    await element(by.type('android.widget.EditText')).atIndex(1).typeText('@Rohan3');

    await element(by.text('SIGN IN')).tap();
    // Now you should wait for the element that is expected to be visible after login
    await expect(element(by.id('flower-text'))).toBeVisible();
  });

   it('should navigate to Accounts Tab and click on buttons', async () => {
         await element(by.id('AccountTab')).tap();


         await element(by.text('Change profile picture')).tap();
         // Scroll to the Ice cream picture
         await waitFor(element(by.id('SaveButton'))).toBeVisible().whileElement(by.id('scrollableView')).scroll(200, 'down');

             // Tap on the Ice cream picture
         await element(by.id('food')).tap();


             // Tap on the Save button
         await element(by.id('SaveButton')).tap();

         await element(by.text('Edit Personal Details')).tap();
         await element(by.id('AgeInput')).typeText('24');
         await device.pressBack();
         await element(by.id('StatusInput')).typeText('Chill');
         await device.pressBack();
         await element(by.text('Save')).tap();

      });
});