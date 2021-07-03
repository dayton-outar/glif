Credit to [How to compile or convert sass / scss to css with node-sass (no Ruby)?](https://stackoverflow.com/questions/31448114/how-to-compile-or-convert-sass-scss-to-css-with-node-sass-no-ruby)

```bash
npm install -g node-sass
```

```bash
node-sass [options] <input.scss> [output.css]
```

Examples:

1. `$ node-sass my-styles.scss my-styles.css` compiles a single file manually.
2. `$ node-sass my-sass-folder/ -o my-css-folder/` compiles all the files in a folder manually.
3. `$ node-sass -w sass/ -o css/ compiles` all the files in a folder automatically whenever the source file(s) are modified. -w adds a watch for changes to the file(s).