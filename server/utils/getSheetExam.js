const getSheetExam = (examinees,idForStudent) => {
    let arrayOfErrors = [];
    for (let i = 0; i < examinees.length; i++) {
        if(idForStudent === examinees[i].userId)
        {
            arrayOfErrors.push(examinees[i].listOfErrors);
            break;
        }
    }
    
    return arrayOfErrors;
}
module.exports = getSheetExam;