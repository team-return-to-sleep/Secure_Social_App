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

   it('chat screen', async () => {
         await element(by.id('ChatsTab')).tap();
         await element(by.id('chat-rgeorge13')).tap();

         await element(by.id('messageInput')).tap();
         await element(by.id('messageInput')).typeText('Hello, world!');
         await element(by.id('sendMessageButton')).tap();



      });
});