describe('Pair With Me', function() {

  var listItems = element.all(by.repeater('maker in pairCtrl.cohort'));
  var firstThisIsMeButton = listItems.get(0).element(by.id('thisIsMe'));
  var danThisIsMeButton = listItems.get(3).element(by.id('thisIsMe'));
  var danPairButton = listItems.get(3).element(by.id('pairButton'));

  beforeEach(function(){
    browser.get('http://localhost:3000');
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
    expect(listItems.get(0).getText()).not.toContain('Pair with this person');
    firstThisIsMeButton.click();
    expect(listItems.get(3).getText()).toContain('Pair with this person');
    danPairButton.click();
    expect(listItems.get(0).getText()).not.toContain('Pair with this person');
  });

  it('once pairButton pressed, all pair buttons disappear', function() {
    var allPairButtons = element(by.css('#pairButton'));
    firstThisIsMeButton.click();
    danPairButton.click();
    expect(allPairButtons.isPresent()).toBeFalsy();
  });

  it('once pairButton pressed, both pairs displayed as unavailable', function() {
    firstThisIsMeButton.click();
    expect(listItems.get(0).getText()).toContain('false');
    expect(listItems.get(1).getText()).toContain('false');
    expect(listItems.get(3).getText()).toContain('false');
    danPairButton.click();
    expect(listItems.get(0).getText()).toContain('true');
    expect(listItems.get(1).getText()).toContain('false');
    expect(listItems.get(3).getText()).toContain('true');
  });

  it('once PairButton pressed, message displays to confirm selection', function() {
    firstThisIsMeButton.click();
    danPairButton.click();
    expect(element(by.id('choiceDisplay')).getText()).toContain('Alex has been paired with Dan B');
  });

  it('once PairButton pressed, the screen shows who you are paired with', function() {
    firstThisIsMeButton.click();
    danPairButton.click();
    expect(listItems.get(3).getText()).toContain('1');
    expect(listItems.get(0).getText()).toContain('0');
    danThisIsMeButton.click();
    expect(listItems.get(0).getText()).toContain('1');
    expect(listItems.get(1).getText()).toContain('0');
    expect(listItems.get(3).getText()).toContain('0');
  });






});