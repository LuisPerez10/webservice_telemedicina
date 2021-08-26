function getHoraMinuto(date) {
    var min = ("0" + (horaInicio.getMonth() + 1)).slice(-2);
    var hora = ("0" + (horaInicio.getMonth() + 1)).slice(-2);
    return

}

function formatDateTime(date) {
    date = String(date).substring(0, 19);
    var d = new Date(date),
        minutes = '' + (d.getMinutes()),
        hora = '' + (d.getHours());

    if (minutes.length < 2)
        minutes = '0' + minutes;
    if (hora.length < 2)
        hora = '0' + hora;

    return [hora, minutes].join(':');
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('/');
}
module.exports = {
    formatDate,
    formatDateTime
}