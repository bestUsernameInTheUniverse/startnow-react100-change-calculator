import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountDue: 0,
      amountReceived: 0,
      changeDue: 0,
      isEnough: true,
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0,
      quarters: 0,
      dimes: 0,
      nickles: 0,
      pennies: 0
    }

    this.handleCalculateClick = this.handleCalculateClick.bind(this)
    this.makeGrid = this.makeGrid.bind(this)
  }


  makeGrid() {
    var denominations = [
      ['Twenties', 20],
      ['Tens', 10],
      ['Fives', 5],
      ['Ones', 1],
      ['Quarters', 0.25],
      ['Dimes', 0.10],
      ['Nickles', 0.05],
      ['Pennies', 0.01]
    ]
    var grid = [];

    denominations.forEach((denomination) => {
      grid.push(
        <div className="col-md-3 mb-2 mt-2" key={denomination[0]}>
          <div className="card bg-light">
            <div className="card-body text-center">
              <h4>{denomination[0]}</h4>
              <h4 className="font-weight-light">{this.state[denomination[0].toLowerCase()]}</h4>
            </div>
          </div>
        </div>
      );
    })

    return grid;
  }


  successAlert() {
    return (
      <div className="alert alert-success text-center" role="alert">
        The total change due is ${this.state.changeDue}
      </div>
    );
  }


  failureAlert() {
    return(
      <div className="alert alert-danger text-center" role="alert">
        Additional money owed.
      </div>
    );
  }


  handleAmountDueChange(event) {
    var amountDue = event.target.value;
    var amountReceived = this.state.amountReceived;
    var changeNeeded = parseFloat(amountReceived) - parseFloat(amountDue);
    var isEnough = changeNeeded < 0 ? false : true;

    this.setState({ 
      amountDue: amountDue,
      changeDue: changeNeeded,
      isEnough: isEnough
    });
  }


  handleAmountReceivedChange(event) {
    var amountDue = this.state.amountDue;
    var amountReceived = event.target.value;
    var changeNeeded = parseFloat(amountReceived) - parseFloat(amountDue);
    var isEnough = changeNeeded < 0 ? false : true;

    this.setState({ 
      amountReceived: amountReceived,
      changeDue: changeNeeded,
      isEnough: isEnough
    });
  }


  handleCalculateClick(event) {
    this.calculateChange(parseFloat(this.state.amountDue), parseFloat(this.state.amountReceived));
  }


  calculateChange(amountDue, amountReceived) {
    var remainingChange =  amountReceived - amountDue;
    var twenties, tens, fives, ones, quarters, dimes, nickles, pennies;

    if(remainingChange < 0) { return; } //
    
    twenties = Math.floor(remainingChange/20);
    remainingChange -= twenties * 20;

    tens = Math.floor(remainingChange/10);
    remainingChange -= tens * 10;

    fives = Math.floor(remainingChange/5);
    remainingChange -= fives * 5;

    ones = Math.floor(remainingChange);
    remainingChange -= ones;

    quarters = Math.floor(remainingChange/0.25);
    remainingChange -= quarters * 0.25;

    dimes = Math.floor(remainingChange/0.10);
    remainingChange -= dimes * 0.10;

    nickles = Math.floor(remainingChange/0.05);
    remainingChange -= nickles * 0.05;

    pennies = Math.floor(remainingChange/0.01);
    remainingChange -= pennies * 0.01;

    this.setState ({
      twenties: twenties,
      tens: tens,
      fives: fives,
      ones: ones,
      quarters: quarters,
      dimes: dimes,
      nickles: nickles,
      pennies: pennies
    });
  }


  render() {
    let alertThing = null;
    if(this.state.isEnough) {
      alertThing = this.successAlert();
    } else {
      alertThing = this.failureAlert();
    }

    return (
      <div className="container">

        <div className="row">
          <div className="col-md-12">
            <h1 className="text-light">Change Calculator</h1>
            <tagline className="text-white">thing wot calculates change</tagline>
            <hr className="bg-white" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                Enter Information
              </div>

              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="amountDue" className="font-weight-bold">How much is due?</label>
                    <input 
                      type="text"
                      name="amountDue"
                      className="form-control" 
                      id="amountDue" 
                      defaultValue={this.state.amountDue} 
                      onChange={(e) => this.handleAmountDueChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="amountReceived" className="font-weight-bold">How much was received?</label>
                    <input
                      type="text"
                      name="amountReceived"
                      className="form-control"
                      id="amountReceived"
                      value={this.state.amountReceived}
                      onChange={(e) => this.handleAmountReceivedChange(e)}
                    />
                  </div>
                </form>
              </div>

              <div className="card-footer">
                <button 
                  className="btn-block btn-primary rounded"
                  onClick={(e) => this.handleCalculateClick(e)}
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                {alertThing}

                <div className="row">
                  {this.makeGrid()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
