import React from "react";
import classes from './PatientInfo.module.css';

const patientInfo = () => {

    return (
        <section className={classes.section}>
            <header className={classes.header}><a>Информация о пациенте</a></header>
            <section>
                <section>
                    <ul className={classes.ul}>
                        <li className={classes.li}>ФИО</li>
                        <li className={classes.li}>Возраст</li>
                        <li className={classes.li}>Диагноз</li>
                    </ul>

                    <ul className={classes.ul}>
                        <li className={classes.li}>Boris Godunov</li>
                        <li className={classes.li}>63</li>
                        <li className={classes.li}>Аритмия</li>
                    </ul>
                </section>
            </section>
        </section>
    );
};

export default patientInfo;