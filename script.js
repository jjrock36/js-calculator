class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.decimal = this.decimal.bind(this);
  }

  handleClick(input) {
    let negative = '-' + input;

    input === 'equals' || input === '+' || input === '-' || input === 'x' || input === '/' ?
    this.props.handleOperator(input) :
    input === 'clear' ?
    this.props.clearDisplay() :
    input === 'decimal' ?
    this.decimal() :
    this.props.updateDisplay(input);
  }

  decimal() {
    if (this.props.display.indexOf('.') < 0) {
      this.props.updateDisplay('.');
    }

  }


  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "button-wrap" }, /*#__PURE__*/
      React.createElement("div", {
        className: "button clear",
        id: "clear",
        onClick: event => this.handleClick('clear', event) }, "AC"), /*#__PURE__*/
      React.createElement("div", {
        className: "button operator",
        id: "divide",
        onClick: () => this.handleClick('/') }, "/"), /*#__PURE__*/
      React.createElement("div", {
        className: "button operator",
        id: "multiply",
        onClick: () => this.handleClick('x') }, "x"), /*#__PURE__*/
      React.createElement("div", {
        className: "button digit",
        id: "seven",
        onClick: () => this.handleClick('7') }, "7"), /*#__PURE__*/
      React.createElement("div", {
        className: "button digit",
        id: "eight",
        onClick: () => this.handleClick('8') }, "8"), /*#__PURE__*/
      React.createElement("div", {
        className: "button digit",
        id: "nine",
        onClick: () => this.handleClick('9') }, "9"), /*#__PURE__*/
      React.createElement("div", {
        className: "button operator",
        id: "subtract",
        onClick: () => this.handleClick('-') }, "-"), /*#__PURE__*/
      React.createElement("div", {
        className: "button digit",
        id: "four",
        onClick: () => this.handleClick('4') }, "4"), /*#__PURE__*/
      React.createElement("div", {
        className: "button digit",
        id: "five",
        onClick: () => this.handleClick('5') }, "5"), /*#__PURE__*/
      React.createElement("div", {
        className: "button digit",
        id: "six",
        onClick: () => this.handleClick('6') }, "6"), /*#__PURE__*/
      React.createElement("div", {
        className: "button operator",
        id: "add",
        onClick: () => this.handleClick('+') }, "+"), /*#__PURE__*/
      React.createElement("div", {
        className: "button digit",
        id: "one",
        onClick: () => this.handleClick('1') }, "1"), /*#__PURE__*/
      React.createElement("div", {
        className: "button digit",
        id: "two",
        onClick: () => this.handleClick('2') }, "2"), /*#__PURE__*/
      React.createElement("div", {
        className: "button digit",
        id: "three",
        onClick: () => this.handleClick('3') }, "3"), /*#__PURE__*/
      React.createElement("div", {
        className: "button operator",
        id: "equals",
        onClick: () => this.handleClick('equals') }, "="), /*#__PURE__*/
      React.createElement("div", {
        className: "button digit",
        id: "zero",
        onClick: () => this.handleClick('0') }, "0"), /*#__PURE__*/
      React.createElement("div", {
        className: "button decimal",
        id: "decimal",
        onClick: () => this.handleClick('decimal') }, ".")));


  }}


class Display extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "display" }, this.props.display));

  }}


class Keypad extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "keypad" }, /*#__PURE__*/
      React.createElement(Buttons, {
        updateDisplay: this.props.updateDisplay,
        clearDisplay: this.props.clearDisplay,
        handleOperator: this.props.handleOperator,
        display: this.props.display,
        operator: this.props.operator })));



  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      firstOperand: null,
      secondOperand: false,
      operator: null,
      isNegative: false };

    this.updateDisplay = this.updateDisplay.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
  }

  clearDisplay() {
    this.setState({
      display: '0',
      firstOperand: null,
      secondOperand: false,
      operator: null,
      isNegative: false });

  }

  updateDisplay(number) {
    if (this.state.secondOperand) {
      if (this.state.isNegative) {
        this.setState({
          display: this.state.display.concat(number),
          secondOperand: false });

      } else
      {
        this.setState({
          display: number,
          secondOperand: false });

      }
    } else
    {
      this.state.display !== '0' ?
      this.setState({
        display: this.state.display.concat(number) }) :

      this.setState({
        display: number });

    }
  }

  handleOperator(nextOperator) {
    const inputValue = parseFloat(this.state.display);
    if (this.state.operator && this.state.secondOperand) {
      if (nextOperator === '-') {
        this.setState({
          display: nextOperator,
          operator: this.state.operator,
          isNegative: true });

        return;
      }
      this.setState({
        operator: nextOperator,
        display: nextOperator,
        isNegative: false });

      return;
    }
    if (this.state.firstOperand === null && !isNaN(inputValue)) {
      this.setState({
        firstOperand: inputValue,
        display: nextOperator });

    } else
    if (this.state.operator && !isNaN(inputValue)) {
      const result = calculation(this.state.firstOperand, this.state.display, this.state.operator);
      this.setState({
        display: String(result),
        firstOperand: result });

    }
    this.setState({
      secondOperand: true,
      operator: nextOperator });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "calculator-wrap" }, /*#__PURE__*/
      React.createElement(Display, { display: this.state.display }), /*#__PURE__*/
      React.createElement(Keypad, {
        updateDisplay: this.updateDisplay,
        clearDisplay: this.clearDisplay,
        handleOperator: this.handleOperator,
        display: this.state.display,
        operator: this.state.operator })));



  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(App, null),
document.getElementById('app'));


function calculation(firstNumber, secondNumber, operator) {
  firstNumber = Number(firstNumber);
  secondNumber = Number(secondNumber);

  if (operator === '+') {
    return firstNumber + secondNumber;
  } else
  if (operator === '-') {
    return firstNumber - secondNumber;
  } else
  if (operator === 'x') {
    return firstNumber * secondNumber;
  } else
  if (operator === '/') {
    return firstNumber / secondNumber;
  }

  return secondNumber;
}