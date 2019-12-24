import React, {useState, useEffect} from "react";
import classes from './PatientLists.module.css';

function PatientLists(props) {

    const [numberOfPatient, setNumberOfPatient] = useState([]);
    const [lastNamePatient, setLastNamePatient] = useState([]);
    const [bedNumberPatient, setBedNumberPatient] = useState([]);

    const patientListHeader = (
        <div>
            <div className={classes.patientListHeader}><a>Присутствуют</a></div>
            <table className={classes.patientList}>
                <tr>
                    <td>№ИБ</td>
                    <td>ФИО</td>
                    <td>Палата</td>
                </tr>
            </table>
        </div>
    );

    const patientList = () => (
        <div>
            <table className={classes.patientList}>
                <td>{numberOfPatient}</td>
                <td>{lastNamePatient}</td>
                <td>{bedNumberPatient}</td>
            </table>
        </div>
    );

    useEffect(() => {
        async function patientsListParser() {
            const response = await fetch("/data/presentList.json");
            const result = await response.json();
            result.map(el => {
                setNumberOfPatient(prevValue => Array.from(prevValue).push(el.historyNumber));
                setLastNamePatient(prevValue => el.lastName);
                setBedNumberPatient(prevValue => el.bedNumber);
            })
        }

        patientsListParser();
    }, []);

    return (
        <div className={classes.patientListWrapper}>
            {patientListHeader}
            {patientList()}
        </div>
    );
}

export default PatientLists;
