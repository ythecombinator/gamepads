import React, { useState } from "react";
import { render } from "react-dom";
import useGamepads from "./";

const styles = {
  sectionContainer: { display: "flex" },
  sectionItem: {
    display: "flex",
    flexDirection: "column",
    padding: 3,
    margin: "0 5px 5px 0",
    border: "1px solid #ccc",
    borderColor: "#000"
  },
  itemText: { margin: 3 }
};

styles.sectionItemBold = {
  ...styles.sectionItem,
  background: "#f1f1f1"
};

function Gamepad(props) {
  const { gamepad, index } = props;

  return gamepad ? (
    <div key={index}>
      <h1>
        {index + 1}: {gamepad.id}
      </h1>
      <h3>Buttons</h3>
      <div style={styles.sectionContainer}>
        {gamepad.buttons.map((button, i) => (
          <div
            key={i}
            style={button.pressed ? styles.sectionItemBold : styles.sectionItem}
          >
            <h5 style={styles.itemText}>Button {i}</h5>
            <p style={styles.itemText}>Value: {button.value}</p>
          </div>
        ))}
      </div>
      <h3>Axes</h3>
      <div style={styles.sectionContainer}>
        {gamepad.axes.map((axis, i) => (
          <div key={i} style={styles.sectionItem}>
            <h5 style={styles.itemText}>Axis {i}</h5>
            <p style={styles.itemText}>Value: {axis}</p>
          </div>
        ))}
      </div>
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

render(<App />, window.root);
