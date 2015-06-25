describe('Pair With Me', function() {
  beforeEach(function(){
    browser.get('http://localhost:8080');
  });


  it('has a title', function(){
   expect(browser.getTitle()).toEqual('Pair with me');
  });

  // it('allows a list of cohort members to be displayed', function() {
  //   var listItems = element.all(by.repeater('user in pairMaker.cohort'));
  //   expect(listItems.get(1).getText()).toEqual('Alex');
  // });
});