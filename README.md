# smartpropertybag
Easily define properties on a js object which can be persisted using localStorage.

I noticed a lot of code repetition when I was trying to define properties on a js object which could persist in the localStorage. This can be easily defined now in a single line. 
```
var obj = new smartpropertybag();

obj.defineSmartProperty(propName,defaultValue,persist)
```
e.g.
```
State = {
 get timeElapsedInSeconds() {
    var result = parseInt(localStorage.getItem(Constants.KEY_TIME_ELAPSED_IN_SECONDS));
    return isNaN(result) ? 0 : result;
  },
  set timeElapsedInSeconds(value) {
    localStorage.setItem(Constants.KEY_TIME_ELAPSED_IN_SECONDS, value);
  }
}
```
can now be written as 
```
var State = new smartpropertybag();

State.defineSmartProperty(Constants.KEY_TIME_ELAPSED_IN_SECONDS,0,true) 
```
