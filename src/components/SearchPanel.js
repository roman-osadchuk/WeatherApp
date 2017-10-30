import React, {Component} from 'react'
import axios from 'axios'
import City from './City'


class SearchPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            isEmpty: false,
            is404Error: false,
            cityWeatherObject: {}
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handle404 = this.handle404.bind(this);
    };


    handleSearch() {
        const searchWord = this.state.searchValue;
        const isEmpty = this.state.isEmpty;
        const searchValue = this.state.searchValue;

        if (searchValue !== '') {

            this.setState({
                isEmpty: false,
                is404Error: false
            });

            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${searchWord}&APPID=c0ff258809970c1cd15254c5048972a1&units=metric`)
                .then(res => {
                        this.setState({ cityWeatherObject: res.data });
                    }
                )
                .catch(err => {
                    this.setState({ is404Error: true });
                });
        } else {
            this.setState({ isEmpty: true })
        }

    };


    handleInput(e) {
        const value = e.target.value;

        this.setState({ searchValue: value })
    };


    handleClear() {
        this.setState({
            searchValue: '',
            cityWeatherObject: {}
        });

    };


    handleClose() {
        this.setState({
            isEmpty: false,
            cityWeatherObject: {}
        })
    };


    handle404() {
        this.setState({
            is404Error: false,
            cityWeatherObject: {}
        })
    };


    render() {

        const cityWeatherObject = this.state.cityWeatherObject;
        const isEmpty = this.state.isEmpty;
        const is404Error = this.state.is404Error;

        return (
            <div>

                {
                    is404Error
                    ?
                    (<div className="alert alert-danger alert-dismissable fade in">
                        <a href="#" onClick={this.handle404} className="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong> Can not find this city. Make sure you entered correct city name! </strong>
                    </div>)
                    :
                    null
                }

                {
                    isEmpty
                    ?
                    (<div className="alert alert-danger alert-dismissable fade in">
                        <a href="#" onClick={this.handleClose} className="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong> This field can't be empty! </strong>
                    </div>)
                    :
                    null
                }


                <div className="form-group">
                    <label> City: </label>
                    <input type="text" className="form-control" onChange={this.handleInput} value={this.state.searchValue}/>
                </div>
                <div className="buttons_align_left">
                    <button className="btn btn-primary" onClick={this.props.mainToggle}> Go to List </button>
                    <button className="btn btn-primary" onClick={this.handleSearch}> Search </button>
                </div>

                {
                    Object.keys(cityWeatherObject).length === 0
                    ?
                    null
                    :
                    (
                        isEmpty || is404Error
                        ?
                        null
                        :
                        <City cityObject={cityWeatherObject} clearInput={this.handleClear}/>
                    )
                }

            </div>
        );
    }
}

export default SearchPanel;
