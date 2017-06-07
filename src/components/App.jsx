import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { addReminder, deleteReminder, clearReminders } from '../actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: ''
        };
    }

    addReminder = () => this.props.addReminder(this.state.text, this.state.dueDate);

    deleteReminder = id => this.props.deleteReminder(id);

    renderReminders = () => {
        const { reminders } = this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => (
                        <li key={reminder.id} className="list-group-item">
                            <div className="list-item">
                                <div>{reminder.text}</div>
                                <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                            </div>
                            <div
                                onClick={() => this.deleteReminder(reminder.id)} 
                                className="list-item delete-button">
                                &#x2715;
                            </div>
                        </li>
                    ))
                }
            </ul>
        );
    }

    render() {
        return (
            <div className="App">
                <h1 className="title">Reminder</h1>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input
                            onChange={e => this.setState({text: e.target.value})}
                            className="form-control"
                            placeholder="I have to..."
                        />
                        <input
                            onChange={e => this.setState({dueDate: e.target.value})}
                            className="form-control"
                            type="datetime-local"
                        />
                        <button
                            className="btn btn-success"
                            onClick={this.addReminder}>
                            Add Reminder
                        </button>
                    </div>
                </div>

                { this.renderReminders() }
                
                <div
                    onClick={this.props.clearReminders}
                    className="btn btn-danger">
                    Clear reminders
                </div>
            </div>
        );
    }
}

const mapStateTpProps = state => ( {reminders: state} );

export default connect(mapStateTpProps, { addReminder, deleteReminder, clearReminders })(App);