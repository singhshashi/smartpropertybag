# smartpropertybag
Easily define properties on a js object which can be persisted using localStorage.

```
var smartypropertybag = require('smartpropertybag');

var smartPropBag = new smartpropertybag();

smartPropBag.defineSmartProperty(propName,defaultValue,persist);

```

I noticed a lot of code repetition when I was trying to define properties on a js object which could persist in the localStorage. This can be easily defined now in a single line. 

For example, 

```
State = {
 get timeElapsedInSeconds() {
    var result = parseInt(localStorage.getItem('timeElapsedInSeconds'));
    return isNaN(result) ? 0 : result;
  },
  set timeElapsedInSeconds(value) {
    localStorage.setItem('timeElapsedInSeconds', value);
  },
 get todoItems() {
    return localStorage.getItem('todoItems) != null ?
      JSON.parse(localStorage.getItem('todoItems)) :[];
  },
  set todoItems(value) {
    localStorage.setItem('todoItems', JSON.stringify(value));
  },
}
```
can now be written as 
```
var State = new smartpropertybag();

State.defineSmartProperty('timeElapsedInSeconds',0,true);
State.defineSmartProperty('todoItems',[],true);
```

# Bug Fixes:

1. Incorrect boolean value returned https://github.com/singhshashi/smartpropertybag/issues/1