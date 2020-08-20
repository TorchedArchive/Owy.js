# Owy
> ✏️ Simple and sexy looking terminal spinners and progress bars.

![](https://modeus.is-inside.me/G8jJetlj.gif)  

([Here's the code](test/showcase.js))
# Install
`npm i owy`

# Example
```js
const owy = require('owy');
const spinner = new owy.Spinner('Vibing');

spinner.start();
```

# Docs
## new Spinner(text?, options?)
Creates a new `OwySpinner` instance  
### text
Default: `''`  
Text to print after the spinner
### options 
#### style
Default: `'dots'`  
Name of one of the [provided styles](lib/styles.js)  

Or an object:
```js
{
    interval: 60,
    stages: ['⭐', '🌟']
}
```
#### color
Default: `'cyan'`  
The color of the spinner. Accepts [these values](https://www.npmjs.com/package/ansiplace#colors)
#### dual
Default: `false`  
Whether to add an extra spinner (text will be in between the 2 spinners)
## OwySpinner.start(text?)
Stars the spinner, sets `text` if it is provided
## OwySpinner.stop(clearLine?)
Stops the spinner and clears the line (unless `clearLine` is false)