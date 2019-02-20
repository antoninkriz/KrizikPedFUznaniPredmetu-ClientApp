import { KarolinkaclientPage } from './app.po';

describe('karolinkaclient App', function() {
  let page: KarolinkaclientPage;

  beforeEach(() => {
    page = new KarolinkaclientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
