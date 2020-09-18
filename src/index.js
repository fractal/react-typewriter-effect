import React, { Component, createRef } from "react";
import { delay, propTypeValidation, contentInView } from "./utils";
import "./app.css";

class TypeWriterEffect extends Component {
  state = {
    text: "",
    blink: false,
    hideCursor: true,
    animate: false,
    typeSpeedDelay: null,
    nextTextDelay: null,
    eraseSpeedDelay: null,
    startDelay: null,
    scrollAreaIsSet: null,
    looping: false,
  };

  myRef = createRef();

  multiTextDisplay = async (arr) => {
    for (let e = 0; e < arr.length; e++) {
      if (this.props.onTextChange) {
        this.props.onTextChange(e);
      }
      await this.runAnimation(arr[e], arr.length - e - 1);
    }
  };

  runAnimation = async (str, erase) => {
    const textArr = typeof str == "string" && str.trim().split("");
    if (textArr) {
      this.setState({
        blink: false,
      });
      let text = "";
      const typeSpeedDelay = new delay(this.props.typeSpeed || 120);
      const nextTextDelay =
        (this.props.multiText || this.state.looping) &&
        new delay(this.props.nextTextDelay || 2000);
      this.setState({
        typeSpeedDelay,
        nextTextDelay,
      });
      for (let char = 0; char < textArr.length; char++) {
        await typeSpeedDelay.getPromise();
        text += textArr[char];
        this.setState({
          text,
        });
      }
      this.setState({
        blink: true,
      });
      (this.props.multiText || this.state.looping) &&
        (await nextTextDelay.getPromise());
      (erase > 0 || this.state.looping) && (await this.eraseText(text));
    }
  };

  eraseText = async (str) => {
    const textArr = typeof str == "string" && str.trim().split("");
    this.setState({
      blink: false,
    });
    let text = str.trim();
    const eraseSpeedDelay = new delay(50);
    this.setState({
      eraseSpeedDelay,
    });
    for (let char = 0; char < textArr.length; char++) {
      await eraseSpeedDelay.getPromise();
      text = text.slice(0, -1);
      this.setState({
        text,
      });
    }
    this.setState({
      blink: true,
    });
  };

  animateOnScroll = async () => {
    try {
      if (!this.state.animate && contentInView(this.myRef.current)) {
        this.setState({
          animate: true,
        });
        const startDelay =
          this.props.startDelay && new delay(this.props.startDelay);
        const looping = this.props.loop ? this.props.loop : false;
        this.setState(
          {
            hideCursor: false,
            startDelay,
            looping,
          },
          async () => {
            this.props.startDelay && (await startDelay.getPromise());

            do {
              this.props.multiText
                ? await this.multiTextDisplay(this.props.multiText)
                : await this.runAnimation(this.props.text);
            } while (this.state.looping);

            this.props.hideCursorAfterText &&
              this.setState({
                hideCursor: true,
              });
          }
        );
      }
    } catch (error) {}
  };

  componentDidMount() {
    this.animateOnScroll();
    this.setState({ scrollAreaIsSet: false });
  }

  componentDidUpdate() {
    if (!this.state.scrollAreaIsSet) {
      this.setState({ scrollAreaIsSet: true });
      this.props.scrollArea && typeof this.props.scrollArea == "object"
        ? this.props.scrollArea.addEventListener("scroll", this.animateOnScroll)
        : document.addEventListener("scroll", this.animateOnScroll);
    }
  }

  componentWillUnmount() {
    // unsubscribe from timeouts and events
    this.setState({ looping: false });
    this.props.scrollArea && typeof this.props.scrollArea == "object"
      ? this.props.scrollArea.removeEventListener(
          "scroll",
          this.animateOnScroll
        )
      : document.removeEventListener("scroll", this.animateOnScroll);
    this.state.startDelay && this.state.startDelay.cancel();
    this.state.eraseSpeedDelay && this.state.eraseSpeedDelay.cancel();
    this.state.typeSpeedDelay && this.state.typeSpeedDelay.cancel();
    this.state.nextTextDelay && this.state.nextTextDelay.cancel();
  }

  render() {
    return (
      <div ref={this.myRef} className={"react-typewriter-text-wrap"}>
        <h1
          style={{ ...this.props.textStyle }}
          className="react-typewriter-text"
        >
          {this.state.text}
          <div
            className={`react-typewriter-pointer ${
              this.state.blink && "add-cursor-animate"
            } ${this.state.hideCursor ? "hide-typing-cursor" : ""}`}
            style={{ backgroundColor: `${this.props.cursorColor}` }}
          ></div>
        </h1>
      </div>
    );
  }
}

TypeWriterEffect.propTypes = propTypeValidation;

export default TypeWriterEffect;
