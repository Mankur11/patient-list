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


    async parser(url) {
        return await fetch(url)
            .then(response => response.json())
            .then(responseData => {
                return responseData;
            })
            .catch(error => console.warn(error));
    }


    componentDidMount() {
        this.parser("/data/presentList.json").then(responseData => this.setState({presentData: responseData}));
        this.parser("/data/quittingList.json").then(responseData => this.setState({quittingData: responseData}));
    }

    selectedPatientHandler(item) {
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

    clickedArrowButtonHandler() {
        let selected = !this.state.patientSelected;
        this.setState({
            patientSelected: selected
        });
    }

    selectedPresentPatientHandler() {
        this.setState({
            tabSelectedRoom: 'Палата'
        })
    }

    selectedRetiredPatientHandler() {
        this.setState({
            tabSelectedRoom: 'Причина выбытия'
        })
    }

    patientData(presentDataArr, retiredDataArr) {
        return (
            <div className={classes.patientListWrapper}>
                <div className={classes.patientListHeader}>
                    <span className={classes.cursorStyle} onClick={() => this.selectedPresentPatientHandler()}>
                        ПРИСУТСТВУЮТ({presentDataArr.length})
                    </span>
                    <span className={classes.cursorStyle} onClick={() => this.selectedRetiredPatientHandler()}>
                        ВЫБЫВШИЕ({retiredDataArr.length})
                    </span>
                </div>

                <table>
                    <tbody className={classes.greyFont}>
                    <td>№ИБ</td>
                    <td>ФИО</td>
                    <td>{this.state.tabSelectedRoom}</td>
                    </tbody>
                    {this.state.tabSelectedRoom === 'Палата' ?
                        presentDataArr.map(item => (
                            <tbody onClick={() => this.selectedPatientHandler(item)} className={classes.patient}>
                            <td>{item.historyNumber} </td>
                            <td>{item.firstName} {item.lastName}</td>
                            <td>{item.bedNumber}</td>
                            </tbody>
                        ))
                        :
                        retiredDataArr.map(item => (
                            <tbody onClick={() => this.selectedPatientHandler(item)} className={classes.patient}>
                            <td>{item.historyNumber}</td>
                            <td>{item.firstName} {item.lastName}</td>
                            <td>{item.cause}</td>
                            </tbody>
                        ))
                    }
                </table>
            </div>
        )
    }

    patientInfo = () => {
        return (
            <div className={classes.patientInfoWrapper}>
                <div className={classes.patientInfoHeader}>
                    <div><a>Информация о пациенте</a></div>
                    <div className={classes.cursorStyle}
                         onClick={() => this.clickedArrowButtonHandler()}>&#60;</div>
                </div>

                <table>
                    <tr>
                        <td>ФИО {this.state.firstName} {this.state.lastName}</td>
                    </tr>
                    <tr>
                        <td>Возраст {this.state.birthDate}</td>
                    </tr>
                    <tr>
                        < td> Диагноз {this.state.diagnosis}</td>
                    </tr>
                </table>
            </div>
        )
    };

    patientInfoEmptyPlace = () => {
        return (
            <div>
                <div className={classes.emptyPatientInfoHeader}>
                    <div className={classes.cursorStyle}
                         onClick={() => this.clickedArrowButtonHandler()}>&#60;</div>
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