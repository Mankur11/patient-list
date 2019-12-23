
const getPatientData = async () => {
    const response = await fetch("../../data/presentList.json");
    const patients = await response.json();
    const patient = patients[0];
    const patientResponse = await fetch(`../../data/presentList.json/${patient.firstName}`);
    return await patientResponse.json();
};

export default getPatientData;