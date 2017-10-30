import React, {Component} from 'react'
import CityInTable from './CityInTable'
import axios from 'axios'


class SavedCities extends Component {

    constructor(props) {
        super(props);

        this.state = {
            local: []
        }
        this.updateWeather = this.updateWeather.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

    };


    componentWillMount() {
        this.updateWeather();
    };


    componentDidMount() {
        this.timer = setInterval(() => {
            this.updateWeather();
        }, 600000)
    };


    componentWillUnmount() {
        clearInterval(this.timer);
    };


    updateWeather() {
        const arrayOfCities = JSON.parse(localStorage["cities"]);

        const foo = async (arrayToUpdate) => {
            let temp = [];
            await Promise.all(
                arrayToUpdate.map(async (item) => {
                    await sendCityWeatherUpdateRequest(item.name)
                        .then(res => { temp.push(res) })
                        .catch(err => { console.log(`err:  ${err}`) });
                })
            )

            localStorage.setItem("cities", JSON.stringify(temp));

            this.setState({ local: temp })
        };

        function sendCityWeatherUpdateRequest(city) {
            return new Promise(resolve => {
                return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c0ff258809970c1cd15254c5048972a1&units=metric`)
                    .then(res => { resolve(res.data) })
                    .catch(err => { console.log(`err:  ${err}`) });
            });
        }

        foo(arrayOfCities);

    };


    handleRemove(e) {
        const arrayOfCities = JSON.parse(localStorage["cities"]);
        const city = e.props.note.name;
        const removedOneCity = arrayOfCities.filter(el => {
            if (el.name !== city) {
                return el
            }
        });

        localStorage.setItem("cities", JSON.stringify(removedOneCity));
        this.setState({ local: removedOneCity })
    };


    render() {

        const arrayOfCities = JSON.parse(localStorage["cities"]);

        return (
            <div>
                <table id="main_table" >
                    <thead>
                        <tr>
                            <th> City </th>
                            <th> Temperature, °С</th>
                            <th> Humidity, % </th>
                            <th> Wind, m/s </th>
                            <th> Icon </th>
                            <th> Remove </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arrayOfCities.map(item => {
                                return (
                                    <CityInTable
                                        key={item.id}
                                        note={item}
                                        handleRemove={this.handleRemove}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>

                <div className="buttons_align_left">
                    <button className="btn btn-primary" onClick={this.props.mainToggle}> Go to Search </button>
                </div>
            </div>
        );
    }
}

export default SavedCities;
