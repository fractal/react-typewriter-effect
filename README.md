# Fractal React Typewriter Effect

This is a package that gives your text a typing effect, with extra features like looping multitext and callback functions on text change! Forked from [kevoese/react-typewriter-effect](https://github.com/kevoese/react-typewriter-effect).

**Reason for Fork**

Fix a few bugs to make the package loop multitext and display properly over multilines text.

## Description

This package lets you create a typewriting effect for text elements.

![Typewriter description](./images/singleTextDisplay1.gif)

- Typewriter Effect animates when the component is in view. By default, it uses the document reference to check if the component is in view or not; but you can pass the `ref` object which is scrollable to the `scollArea` props.

**For example**

```
const myRef = document.querySelector('.scrollable-div')

<TypeWriterEffect width="230" trackWidth="13" percentage={score} scrollArea={myRef} />
```

**Otherwise**
If `scrollArea` is not defined, the document reference object is used.

## Set up

To use the package, start by installing the package with:

`npm i react-typewriter-effect`

**on your react project file**

### For a single text display

```
import TypeWriterEffect from 'react-typewriter-effect';

 <TypeWriterEffect
            textStyle={{ fontFamily: 'Red Hat Display' }}
            startDelay={100}
            cursorColor="black"
            text="This is a single text"
            typeSpeed={100}
            scrollArea={myAppRef}
          />

```

#### Output

![single text display](./images/textDisplay.gif)

### For a multiple text display

Set the multiText props to an array of strings which are displayed sequentially

```
import TypeWriterEffect from 'react-typewriter-effect';

     <TypeWriterEffect
        textStyle={{
          fontFamily: 'Red Hat Display',
          color: '#3F3D56',
          fontWeight: 500,
          fontSize: '1.5em',
        }}
        startDelay={2000}
        cursorColor="#3F3D56"
        multiText={[
          'Hey there, This is a type writer animation package',
          'it consist of two types...',
          'Single text display and multi text display',
          'Fonts can be customized.',
          'The type speed can be customized as well',
        ]}
        loop={true}
        nextTextDelay={1000}
        typeSpeed={30}
      />
```

#### Output

![Rect bar](./images/multiText.gif)

## Properties and description

- text (must be a string): Required in sigle text display mode. The text in string.

- multiText (array of string): Required in multi text mode

- nextTextDelay (must be a number): delay before each text is erased in multi text or looped display in milli seconds.

- loop: (a boolean): if true, continuously cycle through the text. Default: false

- typeSpeed (must be a number): Speed of typing in milli seconds,

- startDelay (must be a number): Delay before animation starts in milli seconds

- hideCursorAfterText (a boolean): it removes cursor after typing.

- cursorColor (must be a string): color of the cursor

- textStyle (must be an object): custom css styles can be applied to the text in this object.

- scrollArea (must be a dom element): the scrollable area. By default it is document
