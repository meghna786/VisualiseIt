import React, { Component } from "react";

//Algorithms
import BubbleSort from "./algorithms/BubbleSort";
import InsertionSort from "./algorithms/InsertionSort";
import SelectionSort from "./algorithms/SelectionSort";
import MergeSort from "./algorithms/MergeSort";
import QuickSort from "./algorithms/QuickSort";

//Icons
import Play from "@material-ui/icons/PlayCircleOutlineRounded";
import Forward from "@material-ui/icons/SkipNextRounded";
import Backward from "@material-ui/icons/SkipPreviousRounded";
import RotateLeft from "@material-ui/icons/RotateLeft";

import Bar from "./components/Bar";
import Form from "./components/Form";
import "./App.css";

class App extends Component {
  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 20,
    delay: 600,
    algorithm: "Quick Sort",
    timeouts: [],
  };

  ALGORITHMS = {
    "Bubble Sort": BubbleSort,
    "Insertion Sort": InsertionSort,
    "Selection Sort": SelectionSort,
    "Merge Sort": MergeSort,
    "Quick Sort": QuickSort,
  };

  componentDidMount() {
    this.generateRandomArray();
  }

  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();

    this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);
    this.setState({
      arraySteps: steps,
      colorSteps: colorSteps,
    });
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts: [],
    });
  };

  clearColorKey = () => {
    let blankKey = new Array(this.state.count).fill(0);
    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey],
    });
  };

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  generateRandomArray = () => {
    this.clearTimeouts();
    this.clearColorKey();
    const count = this.state.count;
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(50, 200));
    }

    this.setState(
      {
        array: temp,
        arraySteps: [temp],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  changeArray = (index, value) => {
    let arr = this.state.array;
    arr[index] = value;
    this.setState(
      {
        array: arr,
        arraySteps: [arr],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  previousStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 0) return;
    currentStep = currentStep - 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  };

  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep >= this.state.arraySteps.length - 1) return;
    currentStep = currentStep + 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  };

  start = () => {
    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;

    this.clearTimeouts();

    let timeouts = [];
    let i = 0;

    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep + 1,
        });
        timeouts.push(timeout);
      }, this.state.delay * i);
      i++;
    }

    this.setState({
      timeouts: timeouts,
    });
    console.log(timeouts);
  };

  changeSpeed = (e) => {
    if (this.state.currentStep !== 0) {
      alert("Wait for the array to be sorted");
      return;
    }
    this.clearTimeouts();
    this.setState({
      delay: parseInt(e.target.value),
    });
  };

  generateBars = () => {
    this.clearTimeouts();
    this.clearColorKey();

    let barCount = this.state.count;
    let arr = [];

    for (let i = 0; i < barCount; i++) {
      arr.push(this.generateRandomNumber(50, 200));
    }

    this.setState(
      {
        array: arr,
        arraySteps: [arr],
        count: barCount,
        currentStep: 0,
      },
      () => this.generateSteps()
    );
  };

  changeBarCount = (e) => {
    if (this.state.currentStep !== 0) {
      alert("Wait for the array to be sorted");
      return;
    }
    this.clearTimeouts();
    this.clearColorKey();
    this.setState(
      {
        count: parseInt(e.target.value),
      },
      () => this.generateBars()
    );
  };

  changeAlgorithm = (e) => {
    if (this.state.currentStep !== 0) {
      alert("Wait for the array to be sorted");
      return;
    }
    this.clearTimeouts();
    this.clearColorKey();
    this.setState(
      {
        algorithm: e.target.value,
        currentStep: 0,
        arraySteps: [
          this.state.arraySteps[
            this.state.currentStep === 0 ? 0 : this.state.currentStep - 1
          ],
        ],
      },
      () => this.generateSteps()
    );
  };

  render() {
    let bars = this.state.array.map((value, index) => (
      <Bar
        key={index}
        index={index}
        length={value}
        color={this.state.colorKey[index]}
        changeArray={this.changeArray}
      />
    ));

    let playButton;
    if (this.state.arraySteps.length === this.state.currentStep) {
      playButton = (
        <button className="controller" onClick={this.generateRandomArray}>
          <RotateLeft />
        </button>
      );
    } else {
      playButton = (
        <button className="controller" onClick={this.start}>
          <Play />
        </button>
      );
    }

    return (
      <div className="app">
        <header className="hero">
          <div className="heading">
            <h1>Visualise It</h1>
          </div>
        </header>

        <div className="frame">
          <div className="barsDiv container card">{bars}</div>
        </div>

        <div className="control-pannel">
          <div className="control-buttons">
            <button className="controller" onClick={this.previousStep}>
              <Backward />
            </button>
            {playButton}
            <button className="controller" onClick={this.nextStep}>
              <Forward />
            </button>
          </div>
        </div>
        <div className="pannel">
          <Form
            formLabel="Algorithms"
            values={[
              "Bubble Sort",
              "Merge Sort",
              "Quick Sort",
              "Insertion Sort",
              "Selection Sort",
            ]}
            labels={[
              "Bubble Sort",
              "Merge Sort",
              "Quick Sort",
              "Insertion Sort",
              "Selection Sort",
            ]}
            currentValue={this.state.algorithm}
            onChange={this.changeAlgorithm}
          />
          <Form
            formLabel="Items"
            values={[10, 15, 20, 25, 30]}
            labels={[10, 15, 20, 25, 30]}
            currentValue={this.state.count}
            onChange={this.changeBarCount}
          />
          <Form
            formLabel="Speed"
            values={[1000, 800, 600, 400, 100]}
            labels={["1x", "2x", "3x", "4x", "5x"]}
            currentValue={this.state.delay}
            onChange={this.changeSpeed}
          />
        </div>
      </div>
    );
  }
}

export default App;

