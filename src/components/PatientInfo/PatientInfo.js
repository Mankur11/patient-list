import React, {useEffect, useState, useContext} from "react";
import classes from './PatientInfo.module.css';


function PatientInfo(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function infoParser() {
            const response = await fetch("/data/presentList.json");
            const result = await response.json();
            setData(prev => result);
        }
        infoParser();
    }, []);

    const patientInfo = (
        <div>
            <div className={classes.patientInfoHeader}><a>Информация о пациенте</a></div>
            <table className={classes.patientInfo}>
                <td>
                    <tr>ФИО</tr>
                    <tr>Возраст</tr>
                    <tr>Диагноз</tr>
                </td>
                <td>
                    <tr>{props.firstName} {props.lastName}</tr>
                    <tr>{props.birthDate}</tr>
                    <tr>{props.diagnosis}</tr>
                </td>
            </table>
        </div>
    );
    return (
        <div
            // className={classes.patientInfoWrapper}
        >
            {patientInfo}
        </div>
    );
}

export default PatientInfo;
