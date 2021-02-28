[![NPM](https://img.shields.io/npm/v/react-select-nes-css-theme.svg)](https://www.npmjs.com/package/react-select-nes-css-theme)

# react-select-nes-css-theme
#### A lightweight (zero-dependency) [React-Select](https://github.com/JedWatson/react-select) theme created to match [NES.css](https://github.com/nostalgic-css/NES.css) styles.

![](example.gif)

#### Installation
Use either
```bash
yarn add react-select-nes-css-theme
```
or
```bash
npm install react-select-nes-css-theme
```

#### Usage
Simply import the theme object and pass it to the `styles` prop of the `Select` component.
```js
import React, { useState } from 'react';
import Select from 'react-select';

import nesTheme from 'react-select-nes-css-theme'; // HERE: Import the theme object

const StyledSelectComponent = () => {
  const [value, setValue] = useState();

  return (
    <Select
      value={value}
      styles={nesTheme} // HERE: Pass the theme object as a prop
      onChange={setValue}
      options={[
        { value: 0, label: 'To be' },
        { value: 1, label: 'Not to be' },
      ]}
    />
  );
};

export default StyledSelectComponent;
```

## License

MIT Licensed. Copyright (c) Wojciech Olejnik 2018.
