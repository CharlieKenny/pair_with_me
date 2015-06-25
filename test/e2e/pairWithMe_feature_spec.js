describe('Pair With Me', function() {

  var listItems = element.all(by.repeater('maker in pairCtrl.cohort'));
  var firstThisIsMeButton = listItems.get(0).element(by.id('thisIsMe'));
  var danPairButton = listItems.get(3).element(by.id('pairButton'));

  beforeEach(function(){
    browser.get('http://localhost:8080');
  });


  it('has a title', function(){
   expect(browser.getTitle()).toEqual('Pair with me');
  });

  it('allows the first member of cohort to be displayed', function() {
    expect(listItems.get(0).getText()).toContain('Alex');
  });

  it('allows a complete list of cohort members to be displayed', function() {
    expect(listItems.count()).toEqual(8);
  });

  it('a button is displayed and disappears if you select the individual', function() {
    expect(listItems.get(0).getText()).toContain('Pair with this person');
    firstThisIsMeButton.click();
    expect(listItems.get(0).getText()).not.toContain('Pair with this person');
  });

  it('once pairButton pressed, all pair buttons disappear', function() {
    firstThisIsMeButton.click();
    danPairButton.click();
    expect(listItems.getText()).not.toContain('Pair with this person');
  });

});