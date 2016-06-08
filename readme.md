# jQuery.Combo
jQuery.combo is a very simple script, and quite frankly, probably not that useful. It allows you to create a series of events, that if executed in the correct order, within a specific period of time, will unlock a secret action for the user.

## Usage
A very simple example of this in action would look like this.
```
$('input#example-input').combo(
    'focus dblclick blur focus blur focus',
    function () {
        alert('You have unlocked the secret!');
    });
``` 
While this example might look pretty boring. It get's fun when you pull in another library, such as jQuery Touch Events. Then you can do really fun stuff like this. 
```
$('body').combo(
    'swipeup swipeleft swiperight swipeup swipedown swipedown',
    function() {
        activateDeveloperMode();
    });
```
I would love to hear suggestions on how to improve this script as a whole.

Thanks!