import { ChatonPage } from './app.po';

describe('chaton App', function() {
  let page: ChatonPage;

  beforeEach(() => {
    page = new ChatonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
