import React, { Component } from 'react';

class CityInTable extends Component {

    render() {

        const note = this.props.note;

        return (
            <tr>
                <td> {note.name} </td>
                <td> {note.main.temp} </td>
                <td> {note.main.humidity} </td>
                <td> {note.wind.speed} </td>
                <td> <img src={`http://openweathermap.org/img/w/${note.weather[0].icon}.png`} /> </td>
                <td onClick={this.props.handleRemove.bind(null, this)}> <i className="fa fa-trash" aria-hidden="true"></i> </td>
            </tr>
        );
    }
}

export default CityInTable;
