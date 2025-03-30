# NPR211 React Native

```
npm start
```

## Add Tailindcss

```
npx expo install nativewind tailwindcss
npx tailwindcss init
```

## Add code tailwindcss.config.js

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Add file global.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Add file babel.config.js

```
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

## Add file metro.config.js

```
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './global.css' })
```

## Import your CSS file app_layout.tsx

```
import "../global.css"
```

## Test tailwind css

```
<Text className = "text-color-red">Hello!</Text>
```

## Clear cache

```
npm start -- --reset-cache
```

## Ставимо Prettier

```
npm install --save-dev --save-exact prettier
```

## Додайте конфігурацію Prettier .prettierrc

```
{
  "singleQuote": true,
  "trailingComma": "all",
  "jsxBracketSameLine": true,
  "semi": false,
  "tabWidth": 2,
  "printWidth": 135
}
```

## Ігноруйте непотрібні файли .prettierignore

```
node_modules/
android/
ios/
build/
dist/
```

## Форматування коду вручну

```
npx prettier --write .
```

## Налаштуйте автоформатування у VS Code (Опціонально) .vscode/settings.json

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```
