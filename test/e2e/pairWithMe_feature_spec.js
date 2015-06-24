describe('Pair With Me', function() {
  beforeEach(function(){
    browser.get('http://localhost:8080');
  });

  it('allows a list of cohort members to be displayed', function() {
    var listItems = element.all(by.repeater('user in pairMaker.cohort'));
    expect(listItems.get(0).getText()).toEqual('Alex');
  });
});