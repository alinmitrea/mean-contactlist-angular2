import { LazyQuote } from './app.po';

describe('lazyquote App', function() {
  let page: LazyQuote;

  beforeEach(() => {
    page = new LazyQuote();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
