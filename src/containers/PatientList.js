import React, {Component} from "react";
import classes from '../containers/PatientList.module.css';

class PatientList extends Component {

    state = {
        presentData: '',
        quittingData: '',
        historyNumber: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        diagnosis: '',
        bedNumber: '',
        cause: '',
        patientSelected: false,
        tabSelectedRoom: 'Палата'
    };

    componentDidMount() {
        async function parser(url) {
            return await fetch(url)
                .then(response => response.json())
                .then(responseData => {
                    return responseData;
                })
                .catch(error => console.warn(error));
        }

        parser("/data/presentList.json").then(responseData => this.setState({presentData: responseData}));
        parser("/data/quittingList.json").then(responseData => this.setState({quittingData: responseData}));

    }

    numberOfPresentAndRetired(data) {
        let number = 0;
        for (let key in data) {
            number++;
        }
        return number;
    }

    isSelectedPatient(item) {
        this.setState({
            diagnosis: item.diagnosis,
            historyNumber: item.historyNumber,
            firstName: item.firstName,
            lastName: item.lastName,
            birthDate: item.birthDate,
            bedNumber: item.bedNumber,
            patientSelected: true,
            cause: item.cause
        });
    }

    isClickedArrowButton() {
        let selected = !this.state.patientSelected;
        this.setState({
            patientSelected: selected
        });
    }

    isSelectedPresentPatient() {
        this.setState({
            tabSelectedRoom: 'Палата'
        })
    }

    isSelectedRetiredPatient() {
        this.setState({
            tabSelectedRoom: 'Причина выбытия'
        })
    }

    patientData(presentDataArr, retiredDataArr) {
        return (
            <table>
                <div className={classes.patientListHeader}>
                    <tr>
                        <a className={classes.cursorStyle} onClick={() => this.isSelectedPresentPatient()}>
                            ПРИСУТСТВУЮТ({this.numberOfPresentAndRetired(this.state.presentData)})
                        </a>
                        <a className={classes.cursorStyle} onClick={() => this.isSelectedRetiredPatient()}>
                            ВЫБЫВШИЕ({this.numberOfPresentAndRetired(this.state.quittingData)})
                        </a>
                    </tr>
                    <tr className={classes.greyFont}>
                        <td>№ИБ</td>
                        <td>ФИО</td>
                        <td>{this.state.tabSelectedRoom}</td>
                    </tr>
                    {this.state.tabSelectedRoom === 'Палата' ?
                        presentDataArr.map(item => (
                            <tr className={classes.patient}>
                                <td onClick={() => this.isSelectedPatient(item)}>{item.historyNumber} </td>
                                <td onClick={() => this.isSelectedPatient(item)}>{item.firstName} {item.lastName}</td>
                                <td onClick={() => this.isSelectedPatient(item)}>{item.bedNumber}</td>
                            </tr>
                        ))
                        :
                        retiredDataArr.map(item => (
                            <tr className={classes.patient}>
                                <td onClick={() => this.isSelectedPatient(item)}>{item.historyNumber}</td>
                                <td onClick={() => this.isSelectedPatient(item)}>{item.firstName} {item.lastName}</td>
                                <td onClick={() => this.isSelectedPatient(item)}>{item.cause}</td>
                            </tr>
                        ))
                    }
                </div>
            </table>
        )
    }

    patientInfo = () => {
        return (
            <div>
                <div className={classes.patientInfoHeader}>
                    <div><a>Информация о пациенте</a></div>
                    <div className={classes.cursorStyle} href={''} onClick={() => this.isClickedArrowButton()}>&#60;</div>
                </div>

                <table>
                    <td>
                        <tr>ФИО {this.state.firstName} {this.state.lastName}</tr>
                        <tr>Возраст {this.state.birthDate}</tr>
                        <tr>Диагноз {this.state.diagnosis}</tr>
                    </td>
                </table>
            </div>
        )
    };

    patientInfoEmptyPlace = () => {
        return (
            <div>
                <div className={classes.emptyPatientInfoHeader}>
                    <div className={classes.cursorStyle} href={''} onClick={() => this.isClickedArrowButton()}>&#60;</div>
                </div>
                <table>

                </table>
            </div>
        )
    };

    patientLists = () => {
        const presentDataArr = [];
        const retiredDataArr = [];
        for (let key in this.state.presentData) {
            presentDataArr.push(this.state.presentData[key]);
        }
        for (let key in this.state.quittingData) {
            retiredDataArr.push(this.state.quittingData[key]);
        }

        return (
            <div>
                {this.patientData(presentDataArr, retiredDataArr)}
            </div>
        )
    };

    render() {
        return (
            <div className={classes.PatientListWrapper}>
                {this.state.patientSelected ? this.patientInfo() : this.patientInfoEmptyPlace()}
                {this.patientLists()}
            </div>
        )
    }
}

export default PatientList;