export const addHours = function(inpDate: Date, inpHours: number) {
    let retDate = new Date();
    retDate.setTime(new Date(inpDate).getTime() + (inpHours*60*60*1000));
    return retDate;
}