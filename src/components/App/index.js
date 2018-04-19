import React, { Component } from 'react';
import Loader from 'react-loader';
import Select from 'react-select';
import axios from 'axios';
import PageHeader from '../PageHeader';
import Flag from 'react-world-flags'
import 'react-select/dist/react-select.min.css';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      rawData: null,
      continents: [],
      selectedContinent: null,
      countries: [],
      selectedCountries: [],
      flags: []
    }
  }

  componentDidMount() {
    axios.get('https://api.myjson.com/bins/pvdxj')
    .then(({data}) => {
      this.setState({
        isLoaded: true,
        continents: data.map( o => ({label: o.continent, value: o.continent, countries: o.countries})),
        rawData: data
      })
    })
  }

  handleChangeContinent = (newOption) => {
    this.setState({
      selectedContinent: newOption,
      countries: newOption.countries.map( o => ({label: o.name, value: o.name, flag: o.flag}))
    })
  }

  handleChangeCountry = (newOptions) => {
    this.setState({
      selectedCountries: newOptions,
      flags: newOptions.map( obj => obj.flag)
    })
  }

  resetState = () => {
    this.setState({
      selectedContinent: null,
      countries: [],
      selectedCountries: [],
      flags: []
    })
  }

  render() {
    const {continents, selectedContinent, selectedCountries, countries, flags} = this.state;
    return (
      <div className="App">
        <PageHeader />
        <Loader loaded={this.state.isLoaded}>
          <div className="flex-box">
            <div className="flex-1">
              <h1>Step 1</h1>
              <h5>Select a continent.</h5>
              <Select
                name="continents"
                value={selectedContinent}
                onChange={this.handleChangeContinent}
                options={continents}
              />
              {selectedContinent && <div>
                <h5>You selected</h5>
                <h1>{selectedContinent.label}</h1>
              </div>}
            </div>
            <div className="flex-1">
              {selectedContinent && <div>
                <h1>Step 2</h1>
                <h5>Now, select countries</h5>
                <Select
                  name="countries"
                  multi
                  value={selectedCountries}
                  onChange={this.handleChangeCountry}
                  options={countries}
                />
              </div>}
            </div>
            <div className="flex-1">
              {flags.length > 0 && <div>
                <h1>Selected Flags</h1>
                {flags.map(flag => <span key={flag}><Flag code={flag} height="16"/></span>)}
                <div>
                  <input type="button" className="btn btn-primary" value="Clear Flags" onClick={this.resetState}/>
                </div>
              </div>}
            </div>
          </div>
        </Loader>
      </div>
    );
  }
}

export default App;
