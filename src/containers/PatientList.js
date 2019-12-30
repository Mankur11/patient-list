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

    isActive(tabName) {
        return this.state.tabSelectedRoom === tabName ? classes.activeButton : null
    }

    calculateAgeHandler(birthDate) {
        const splittedBd = birthDate.split('-');
        let age = new Date(splittedBd[0], splittedBd[1] - 1, splittedBd[2]).getYear();
        let currentDate = new Date().getYear();
        return currentDate - age;
    }

    filterPatientListHandler(patientsData, page) {
        const perPage = 10;
        return [...patientsData].splice(page * perPage, perPage - 1);
    }

    paginationRenderHandler(dataArr) {
        const numOfPages = Math.ceil(dataArr.length / 10);
        const list = [];
        for (let i = 1; i <= numOfPages; i++) {
            list.push(<li key={i}>
                <button>{i}</button>
            </li>)
        }
        return (
            <ul>
                {list}
            </ul>
        )
    }

    patientData(sortedPresentDataArr, sortedRetiredDataArr) {
        return (
            <div>
                <div className={classes.patientListHeader}>
                    <button
                        className={[classes.patientListHeaderButton, this.isActive('Палата')].join(' ')}
                        onClick={() => this.selectedPresentPatientHandler()}>
                        ПРИСУТСТВУЮТ({sortedPresentDataArr.length})
                    </button>
                    <button
                        className={[classes.patientListHeaderButton, this.isActive('Причина выбытия')].join(' ')}
                        onClick={() => this.selectedRetiredPatientHandler()}>
                        ВЫБЫВШИЕ({sortedRetiredDataArr.length})
                    </button>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>№ИБ</th>
                        <th>ФИО</th>
                        <th>{this.state.tabSelectedRoom}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.tabSelectedRoom === 'Палата' ?
                        this.filterPatientListHandler(sortedPresentDataArr, 0).map(item => (
                            <tr onClick={() => this.selectedPatientHandler(item)} className={classes.patient}>
                                <td>{item.historyNumber} </td>
                                <td>{item.firstName} {item.lastName}</td>
                                <td>{item.bedNumber}</td>
                            </tr>
                        ))
                        :
                        sortedRetiredDataArr.map(item => (
                            <tr onClick={() => this.selectedPatientHandler(item)} className={classes.patient}>
                                <td>{item.historyNumber}</td>
                                <td>{item.firstName} {item.lastName}</td>
                                <td>{item.cause}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <div className={classes.paginationList}>
                    {this.paginationRenderHandler(sortedPresentDataArr)}
                </div>
            </div>
        )
    }

    patientInfo = () => {
        return (
            <div className={classes.patientInfoWrapper}>
                <div className={classes.patientInfoHeader}>
                    <div><a>Информация о пациенте</a></div>
                    <div className={classes.toggleButton} onClick={() => this.clickedArrowButtonHandler()}><img
                        src="chevron-left-solid.svg"/>
                    </div>
                </div>

                <ul>
                    <li>
                        ФИО <span>{this.state.firstName} {this.state.lastName}</span>
                    </li>
                    <li>
                        Возраст <span>{this.calculateAgeHandler(this.state.birthDate)}</span>
                    </li>
                    <li>
                        Диагноз <span>{this.state.diagnosis}</span>
                    </li>
                </ul>
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

        const sortedPresentDataArr = presentDataArr
            .sort((prevItem, nextItem) => prevItem.historyNumber - nextItem.historyNumber);
        const sortedRetiredDataArr = retiredDataArr
            .sort((prevItem, nextItem) => prevItem.historyNumber - nextItem.historyNumber);
        return (
            <div className={classes.patientListWrapper}>
                {this.patientData(sortedPresentDataArr, sortedRetiredDataArr)}
            </div>
        )
    };

    render() {
        return (
            <div className={classes.patientMainWrapper}>
                {this.state.patientSelected ? this.patientInfo() : null}
                {this.patientLists()}
            </div>
        )
    }
}

export default PatientList;