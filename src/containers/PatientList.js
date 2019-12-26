import React, {Component} from "react";
import classes from '../containers/PatientList.module.css';

class PatientList extends Component {

    state = {
        data: 'empty',
        historyNumber: '',
        firstName: '',
        lastName: '',
        patrName: '',
        birthDate: '',
        diagnosis: '',
        bedNumber: '',
        patientSelected: false
    };

    componentDidMount() {
        async function parser() {
            return await fetch("/data/presentList.json")
                .then(response => response.json())
                .then(responseData => {
                    return responseData;
                })
                .catch(error => console.warn(error));
        }

        parser().then(responseData => this.setState({data: responseData}));
    }

    isSelectedPatient(item) {
       this.setState({
           diagnosis:item.diagnosis,
           historyNumber: item.historyNumber,
           firstName: item.firstName,
           lastName:item.lastName,
           patrName: item.patrName,
           birthDate: item.birthDate,
           bedNumber: item.bedNumber
       });
    }

    patientInfo = () => {
        return (
            <div>
                <table>
                    <tr className={classes.patientInfoHeader}><a>Информация о пациенте</a></tr>
                    <td>
                        <tr>ФИО</tr>
                        <tr>Возраст</tr>
                        <tr>Диагноз</tr>
                    </td>
                    <tr className={classes.patientInfoHeader}></tr>
                    <td>
                        <tr>{this.state.firstName} {this.state.lastName}</tr>
                        <tr>{this.state.birthDate}</tr>
                        <tr>{this.state.diagnosis}</tr>
                    </td>
                </table>
            </div>
        )
    };

    patientLists = () => {
        const dataArr = [];
        for (let key in this.state.data) {
            dataArr.push(this.state.data[key]);
        }

        return (
            <div>
                <table>
                    <tr className={classes.patientListHeader}><a>Присутствуют</a></tr>
                    <tr>
                        <td>№ИБ</td>
                        <td>ФИО</td>
                        <td>Палата</td>
                    </tr>
                    <td>
                        {dataArr.map(item => (
                            <tr>{item.historyNumber}</tr>
                        ))}
                    </td>
                    <td>
                        {dataArr.map(item => (
                            <tr onClick={() => this.isSelectedPatient(item)}>{item.firstName} {item.lastName}</tr>
                        ))}
                    </td>
                    <td>
                        {dataArr.map(item => (
                            <tr>{item.bedNumber}</tr>
                        ))}
                    </td>
                </table>
            </div>
        )
    };

    render() {

        return (
            <div className={classes.PatientListWrapper}>
                {this.patientInfo()}
                {this.patientLists()}
            </div>
        )
    }
}

export default PatientList;