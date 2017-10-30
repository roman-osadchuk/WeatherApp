import React, { Component } from 'react'
import axios from 'axios'
import SearchPanel from './SearchPanel'
import SavedCities from './SavedCities'

require('./styles/style.css');


class MainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isWeatherReceived: false,
            mainToggle: true,
            savedCities: []
        }
        this.handleToggle = this.handleToggle.bind(this);
    };

    componentWillMount() {
        //localStorage.clear();

        if (!localStorage.getItem('cities')) {
            localStorage.setItem('cities', '[]');
        }
    }


    handleToggle() {
        this.setState({
            mainToggle: !this.state.mainToggle
        })
    }

    render() {

        const mainToggle = this.state.mainToggle;

        return (
            <div className="container">
                <header>
                    <h3>Welcome to Weather App</h3>
                </header>
                <div className="row content_panel">
                    <div className="col-md-10 col-md-offset-1">
                    {
                        mainToggle
                        ?
                        <SavedCities mainToggle={this.handleToggle} cities={this.state.savedCities} />
                        :
                        <SearchPanel mainToggle={this.handleToggle} />
                    }
                    </div>
                </div>
            </div>
        )
    }

}

export default MainPage;
