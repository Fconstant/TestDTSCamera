To test this:
```
yarn install
react-native run-android
# OR
react-native run-ios
```

Make sure you have `yarn` installed:
```
npm i -g yarn
```

The `definitions-test.tsx` file was created just for TS compilations tests.
It's not a functional piece of code.

Compile typescript with:
```
npx tsc
```
PS: Add a `--noEmit false` flag if you want to see the compiled code.

__Important:__ I haven't tested on iOS (because I can't ☹)