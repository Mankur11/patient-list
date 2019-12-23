const getPatientData = async () => {
    const response = await fetch("/data/presentList.json");
    const result =  await response.json().then(function (response) {
        return response;
    });
    return result;
};

export default getPatientData;