import React, {useEffect, useState} from "react";
import classes from './PatientLists.module.css';

function PatientLists(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function listParser() {
            const response = await fetch("/data/presentList.json");
            const result = await response.json();
            setData(prev => result);
        }
        listParser();
    }, []);

    const patientList = (
        <div>
            <div className={classes.patientListHeader}><a>Присутствуют</a></div>
            <table className={classes.patientList}>
                <tr>
                    <td>№ИБ</td>
                    <td>ФИО</td>
                    <td>Палата</td>
                </tr>
                <td>
                    {data.map(item => (
                        <tr>{item.historyNumber}</tr>
                    ))}
                </td>
                <td>
                    {data.map(item => (
                        <tr>{item.firstName} {item.lastName}</tr>
                    ))}
                </td>
                <td>
                    {data.map(item => (
                        <tr>{item.bedNumber}</tr>
                    ))}
                </td>
            </table>
        </div>
    );

    return (
        <div className={classes.patientListWrapper}>
            {patientList}
        </div>
    );
}

export default PatientLists;
