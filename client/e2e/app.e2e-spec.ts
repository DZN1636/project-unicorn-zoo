import { UnicornZooPage } from './app.po';

describe('unicorn-zoo App', () => {
  let page: UnicornZooPage;

  beforeEach(() => {
    page = new UnicornZooPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
