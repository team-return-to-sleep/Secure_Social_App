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

   it('should look at Browse Tab and test block', async () => {
        // await element(by.id('BrowseTab')).tap();

            // Click on the "Edit Interests Profile" button
            // Assuming the button has the label 'Edit Interests Profile'

         await element(by.id('viewprofile-mason')).tap();
         // Scroll to the Ice cream picture
        await element(by.id('scrollView2')).scrollTo('bottom');
        await element(by.text('Add as Best Bud')).tap();
        await element(by.text('Remove Best Bud')).tap();
        await element(by.text('Block')).tap();

        await element(by.id('ChatsTab')).tap();
        await element(by.id('scrollViewChat')).scrollTo('bottom');

        await expect(element(by.id('chat-mason'))).not.toBeVisible();

      });

      it('should look at block list', async () => {
              // await element(by.id('BrowseTab')).tap();

                  // Click on the "Edit Interests Profile" button
                  // Assuming the button has the label 'Edit Interests Profile'

              await element(by.id('AccountTab')).tap();
              await element(by.text('View Blocklist')).tap();


              await element(by.id('blockedUser-mason')).tap();
              await element(by.id('scrollView2')).scrollTo('bottom');
              await element(by.text('Unblock')).tap();

              await element(by.id('ChatsTab')).tap();
              await element(by.id('scrollViewChat')).scrollTo('bottom');

              await expect(element(by.id('chat-mason'))).toBeVisible();


            });
});