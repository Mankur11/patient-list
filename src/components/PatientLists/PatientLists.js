import React from "react";
import classes from './PatientLists.module.css';
import getPatientData from '../Parser/Parser';

const patientLists = () => {

    const result = getPatientData();
    console.log(result);

    return (

        <section className={classes.section}>
            <header className={classes.header}>
                <div className={classes.tabs__links}>
                    <a href="#content-1">Присутствуют</a>
                    <a href="#content-2">Выбывшие</a>
                </div>
            </header>
            <section>
                <ul className={classes.ul}>
                    <li className={classes.li}>№ИБ</li>
                    <li className={classes.li}></li>
                    <li className={classes.li}>Палата</li>
                </ul>

                <ul className={classes.ul}>
                    <li className={classes.li}>1</li>
                    <li className={classes.li}>Hell</li>
                    <li className={classes.li}>10</li>
                </ul>
            </section>
        </section>
    );
};

export default patientLists;
