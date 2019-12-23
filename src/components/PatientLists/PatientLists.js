import React from "react";
import classes from './PatientLists.module.css';

const patientLists = () => {

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
                        <li className={classes.li}>ФИО</li>
                        <li className={classes.li}>Палата</li>
                    </ul>

                    <ul className={classes.ul}>
                        <li className={classes.li}>1</li>
                        <li className={classes.li}>A Time to Kill</li>
                        <li className={classes.li}>10</li>
                    </ul>
            </section>
        </section>
    );
};

export default patientLists;