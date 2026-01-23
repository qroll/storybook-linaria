potential idea

- create a object of styles similar to current design system
- during build time of library, these styles will be converted into individual css files and exported as a single global.css
- remove theme-defaults since default is going back to lifesg.css, or just replace lifesg with default

<!-- alternative -->

(1)

- postinstall script to inject css

(2)

- 2 different build during build step
  - 1st step -> build styles
  - 2nd step -> build theme.css with all styles from step 1 and all the themes imported so user do not need to manually import the styles, styles is imported when they use our theme provider (to test, currently we support all files with .styles.ts)

const themes = {
mylegacy: {
primary
secondary...
},
lifesg: {

}
}

build -> script -> themes -> css files -> theme.css
