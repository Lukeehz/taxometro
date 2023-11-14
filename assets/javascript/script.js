const result = document.querySelector('#resultado');
const calc = document.querySelector('#calcular');
const valorInput = document.querySelector('#valorP');
valorInput.type = 'number';
const chaveApi = '91729c8f276ba8c336f0bded';
const moeda = 'USD';
const ApiUrl = `https://v6.exchangerate-api.com/v6/${chaveApi}/latest/${moeda}`;
let valorDolar, valorDolarEmReais, vImport, importacao,vTotal;

//IMPOSTOS
const impostoImport = 0.6 , ICMS = 0.17

function pegarMoeda() {
    return fetch(ApiUrl)
        .then(res => res.json())
        .then(data => {
            valorDolarEmReais = Number(data.conversion_rates.BRL);
            valorDolar = Number(data.conversion_rates.USD);
        });
}

function converterImportacaoDolar() {
    let vImportNumber = Number(vImport);
    x1 = vImportNumber * valorDolar;
    x2 = x1 / valorDolarEmReais;
    importacao = x2;
    result.innerHTML = importacao;
}

function calcularImposto(){
    if(importacao>=50){
        vTotal=vImport*=1.92;
        result.innerHTML= `<span class="text-center text-danger fw-bold">Você pagará o total de ${vTotal.toFixed(2)}</span>`
    }else{
        vTotal=vImport*=1.17
        result.innerHTML= `<span>Você pagará o total de ${vTotal.toFixed(2)}</span>`

    }
}

calc.addEventListener('click', function () {
    vImport = valorInput.value;
    pegarMoeda().then(() => {
        converterImportacaoDolar();
        calcularImposto()
    });
});
