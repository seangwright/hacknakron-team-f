import { HacknakronTeamFPage } from './app.po';

describe('hacknakron-team-f App', () => {
  let page: HacknakronTeamFPage;

  beforeEach(() => {
    page = new HacknakronTeamFPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
