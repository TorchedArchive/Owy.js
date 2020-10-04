<div align="center">
	<h1 align="center">Owy</h1>
	<blockquote align="center">✏️ Simple and sexy looking terminal spinners and progress bars.</blockquote>
	[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
	<img alt="Preview" src="https://modeus.is-inside.me/G8jJetlj.gif">
	<br><br>
	<p>Owy is a small and simple package that prints an elegant spinner/animation or (soon) a progress bar to the terminal.</p>
</div>

# Table of Contents
- [Install](#install)
- [Examples](#examples)
- [Links](#links)
- [Contributing](#contributing)

# Install
`npm install owy`
 
# Examples
```js
const owy = require('owy');
const spinner = new owy.Spinner('Shining', {
	style: {
		interval: 60,
		stages: ['⭐', '🌟']
	}
});

spinner.start();
```
```js
const owy = require('owy');
const spinner = new owy.Spinner('Spinning');

spinner.start();
```

# Links
- Documentation: https://luvella.github.io/Owy

# Contributing
If you would like to contribute, be sure to:
- Lint with our ESLint config
- Add JSDoc (if adding a new function)  

And make a pull request!  

## Developing
```sh
git clone https://github.com/Luvella/Owy
cd Owy
npm i
npm i eslint -g # For linting (if you don't have it installed)
# After making changes:
eslint lib/
```

If you aren't contributing code you can always open an issue.
# License
Owy is licensed under the MIT license.  
[Read here](LICENSE) for more info.
