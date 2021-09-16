const axios = require('axios')

const isBusinessDay = (date) => {
    var day = date.getDay();
    if (day == 0 || day == 6) {
        return false;
    }
    return true;
}

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json`
const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getToday = () => {
    const today = new Date()
    today.setHours(today.getHours() - 3) // ajusto as horas para horario de brasilia
    today.setDate(today.getDate() - 1); // um dia a menos, pois durante o dia não fechou a cotação ainda
    while (!isBusinessDay(today)) { today.setDate(today.getDate() - 1) } // verifico se é dia da semana
    return (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
}
const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async () => {
    try {
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url)
        const cotacao = extractCotacao(res)
        return cotacao
    } catch (err) {
        return ''
    }
}


module.exports = {
    getCotacaoAPI,
    getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao }),
    extractCotacao,
    getUrl,
    getToday,
    pure: {
        getCotacao
    }
}
