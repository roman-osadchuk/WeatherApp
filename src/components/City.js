import React, {Component} from 'react';

class City extends Component {

    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    };


    componentWillMount() {
        setTimeout(() => {
            document.getElementById('searched_city_weather_container').className = 'toggle_city_container';
            document.getElementById('searched_city_weather').className += ' toggle_city_container';
        }, 25)// <- that's an approximate time just to make this elements to be available in the DOM

    };


    handleSave() {

        const city = this.props.cityObject;

        let arrayOfCities = JSON.parse(localStorage["cities"]);
        arrayOfCities.push(city);
        localStorage.setItem("cities", JSON.stringify(arrayOfCities));
        let array = JSON.parse(localStorage["cities"]);

        document.getElementById('searched_city_weather_container').classList.remove('toggle_city_container');
        document.getElementById('searched_city_weather').classList.remove('toggle_city_container');
        setTimeout(() => {
            this.props.clearInput();
        }, 300);

    };


    handleCancel() {
        document.getElementById('searched_city_weather_container').classList.remove('toggle_city_container');
        document.getElementById('searched_city_weather').classList.remove('toggle_city_container');
        setTimeout(() => {
            this.props.clearInput();
        }, 300);
    };


    render() {

        const city = this.props.cityObject;

        return (
            <div>
                <div id="searched_city_weather_container">

                    <div className="well" id="searched_city_weather">
                        <div>
                            <img src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`} />
                        </div>
                        <div id="city_weather_parameters">
                            <div>
                                <span> <b>City:</b> {city.name} </span>
                            </div>
                            <div>
                                <span> <b>Temperature:</b> {city.main.temp}°С </span>
                                <span> <b>Humidity:</b> {city.main.humidity}% </span>
                                <span> <b>Wind:</b> {city.wind.speed}m/s </span>
                            </div>
                        </div>
                    </div>

                    <div className="buttons_align_left">
                        <button className="btn btn-primary" onClick={this.handleSave}> Save </button>
                        <button className="btn btn-primary" onClick={this.handleCancel}> Cancel </button>
                    </div>

                </div>
            </div>
        );
    }
}

export default City;
