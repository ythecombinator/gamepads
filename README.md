# `@rehooks/gamepads`

> React hook for providing both read and write access to the system gamepads.

> **Note:** This is using the new [React Hooks API Proposal](https://reactjs.org/docs/hooks-intro.html)
> which is subject to change until React 16.7 final. This also uses the [Gamepads API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepads) which is also experimental; it is a relatively
> recent addition, and the process of implementing it in browsers is not yet complete.
>
> You'll need to install `react`, `react-dom`, etc at `^16.7.0-alpha.0`

## Install

```sh
yarn add @rehooks/gamepads
```

## Usage

### Sample

```jsx
import useGamepads from "@rehooks/gamepads";

function Gamepad(props) {
  const { gamepad, index } = props;

  return gamepad ? (
    <div key={index}>
      <h1>
        {index + 1}: {gamepad.id}
      </h1>
    </div>
  ) : (
    <div key={index}>
      <h1>{index + 1}: None</h1>
    </div>
  );
}

function App() {
  const gamepads = useGamepads(true);

  return (
    gamepads && (
      <div>
        {gamepads.map((item, index) => (
          <Gamepad gamepad={item} index={index} />
        ))}
      </div>
    )
  );
}
```

### API

The `useGamepads(shouldPoll)` hook takes one parameter and returns an array of [Gamepad objects](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad). The mentioned parameter is:

#### `shouldPoll`

Should be used in order to get new data constantly. Since there's no DOM event for listening to
button presses or similar, it relies on `requestAnimationFrame` instead of plain `setInterval`.

> Note that in a large application, running a digest `60` times a second would not be great.
