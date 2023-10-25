import React, {useEffect, useState} from "react";
import { Chart } from "react-google-charts";

import "./css/app.css"
  

function App() {

  const [dividendosPagos, setDividendosPagos] = useState([])
  const [jurosPagos, setJurosPagos] = useState([])
  const [valorInvestido, setValorInvestido] = useState([])
  const [valorAcumulado, setValorAcumulado] = useState([])
  const [contador, setContador] = useState(-1)
  const [ultimoDividendoPago, setUltimoDividendoPago] = useState([])

  function Calcular(PV, PMT, D, N, I, REINVESTEDIVIDENDOS,PERIODODIVIDENDOS){
    setDividendosPagos([])
    setJurosPagos([])
    setValorInvestido([])
    setValorAcumulado([])
    setContador(N-1)

    let dividendosPagosArray = [];
    let ultimoDividendoPagoArray = [];
    let jurosPagosArray = [];
    let valorInvestidoArray = [];
    let valorAcumuladoArray = [];
    /* console.log(`chegou Aqui 1
        Valor de PV: ${PV}
        Valor de PMT: ${PMT}
        Valor de D: ${D}
        Valor de N: ${N}
        Valor de I: ${I}
        Valor de PERIODODIVIDENDOS: ${PERIODODIVIDENDOS}
        Valor de REINVESTEDIVIDENDOS: ${REINVESTEDIVIDENDOS}
        
    `) */
    //ultimo dividendo pago
    let UDP = 0
    //dividendos pagos = 0
    let DVP = PV-PV
    //Juros pagos = 0
    let JP = 0
    //Neste caso estamos trocando CI por VI que significa Valor investido e posteriormente somaremos todos os investimentos
    //a fim de retornar todo o valor que foi investido
    let VI = PV
    //Valor acumulado = present value, servirá para somar como saldo acumulado
    let VA = PV
    if(D !== 0){
      if(REINVESTEDIVIDENDOS === 1){

        for (let i = 1; i <= N; i++) {
          UDP = VA * (D / 100);
          DVP = DVP + VA * (D / 100);
          VI = VI + PMT;
          JP += VA * (I / 100);
      
          if (i % PERIODODIVIDENDOS === 0) {
            VA = VA * (I / 100) + VA * (D / 100) + PMT + VA;
          } else {
            VA = VA * (I / 100) + VA + PMT;
          }
          
          dividendosPagosArray.push(DVP);
          ultimoDividendoPagoArray.push(UDP);
          jurosPagosArray.push(JP);
          valorInvestidoArray.push(VI);
          valorAcumuladoArray.push(VA);
        }
      
        setDividendosPagos(dividendosPagosArray);
        setUltimoDividendoPago(ultimoDividendoPagoArray);
        setJurosPagos(jurosPagosArray);
        setValorInvestido(valorInvestidoArray);
        setValorAcumulado(valorAcumuladoArray);
        
      
        console.log(`
          dividendos pagos:
          ${dividendosPagosArray}
          
          ultimo dividendo pago:
          ${ultimoDividendoPagoArray}
      
          juros pagos:
          ${jurosPagosArray}
      
          valor investido:
          ${valorInvestidoArray}
      
          valor acumulado:
          ${valorAcumuladoArray}
        `);
      }else{
        console.log("Sem dividendos acumulados")
        for(let i=1; i<= N; i++){
          JP += VA * (I / 100)
          VI = VI + PMT;
          DVP = DVP + VA*D/100
          UDP = VA*D/100
          VA = (VA*I/100)+VA+PMT
            
          dividendosPagosArray.push(DVP);
          ultimoDividendoPagoArray.push(UDP);
          jurosPagosArray.push(JP);
          valorInvestidoArray.push(VI);
          valorAcumuladoArray.push(VA);

          setDividendosPagos(dividendosPagosArray);
          setUltimoDividendoPago(ultimoDividendoPagoArray);
          setJurosPagos(jurosPagosArray);
          setValorInvestido(valorInvestidoArray);
          setValorAcumulado(valorAcumuladoArray);

          console.log(`
            dividendos pagos:
            ${dividendosPagos}
            
            ultimo dividendos pagos:
            ${ultimoDividendoPago}

            Juros pagos:
            ${jurosPagos}

            Valor investido:
            ${valorInvestido}

            Valor acumulado:
            ${valorAcumulado}

          `)
        }
      }
    }else{
      console.log("Sem dividendos")
      for(let i=1; i<= N; i++){

        VI = VI + PMT;
        JP += VA * (I / 100)
        VA = (VA*I/100)+VA+PMT

        jurosPagosArray.push(JP);
        valorInvestidoArray.push(VI);
        valorAcumuladoArray.push(VA);

        setJurosPagos(jurosPagosArray);
        setValorInvestido(valorInvestidoArray);
        setValorAcumulado(valorAcumuladoArray);

        console.log(`
          dividendos pagos:
          ${dividendosPagos}

          Juros pagos:
          ${jurosPagos}

          Valor investido:
          ${valorInvestido}

          Valor acumulado:
          ${valorAcumulado}

        `)
      }
    }
  }
  ////////////////////////////////
  //formatar números
  function formatNumber(number) {
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  ///////////////////////////////
  //VARIAVEIS DOS GRAFICOS
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const chartDataArray = valorAcumulado.map((elemento, index) => [
      index + 1,
      valorInvestido[index],
      elemento
    ]);
  
    // Criar cabeçalho neste array
    chartDataArray.unshift(["Período", "Valor Total Investido", "Valor Acumulado"]);
  
    // Dados vão para o estado do gráfico
    setChartData(chartDataArray);
    console.log(chartData);
  }, [valorAcumulado]);
  
  






  const [valoreInicial, setValorInicial] = useState(0);
  const [aporte, setAporte] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [rentabilidade, setRentabilidade] = useState(0)
  const [dividendos, setDividendos] = useState(null);
  const [periodoDividendos, setPeriodoDividendos] = useState(0);
  const [reinvesteDividendos, setReinvesteDividendos] = useState(0);

  function handleSubmit(){
    Calcular(valoreInicial, aporte, dividendos, tempo, rentabilidade, reinvesteDividendos, periodoDividendos )
  }
  
  
  return (
    <>
      <h1 id="title">Calculadora de rendimentos</h1>
      <div className="calculadora-body">
      
        <div className="calculadora-form-card">
          <div className="calculadora-form-card-content">
            <label className="calculadora-form-label">Investimento Inicial</label>
            <input className="calculadora-form-input" type="number"  onChange={ (e) => setValorInicial(parseFloat(e.target.value))}/>
          </div>

          <div className="calculadora-form-card-content">
            <label className="calculadora-form-label">investimento mensal</label>
            <input className="calculadora-form-input" type="number" onChange={ (e) => setAporte(parseFloat(e.target.value)) }/>
          </div>      
        </div>

        <div className="calculadora-form-card">
          <div className="calculadora-form-card-content">
            <label className="calculadora-form-label">Prazo</label>
            <input className="calculadora-form-input" type="number" onChange={ (e) => setTempo(parseInt(e.target.value)) } />
          </div>

          <div className="calculadora-form-card-content">
            <label className="calculadora-form-label">Rentabilidade</label>
            <input className="calculadora-form-input"  type="number" onChange={ (e) => setRentabilidade(parseFloat(e.target.value)) } />
          </div>
        </div>

        <div className="calculadora-form-card">
          <div className="calculadora-form-card-content">
            <label className="calculadora-form-label">Dividendos</label>
            <input className="calculadora-form-input" type="number" onChange={ (e) => setDividendos(parseFloat(e.target.value)) } />
          </div>

          <div className="calculadora-form-card-content">
            <label className="calculadora-form-label">Periodo dos dividendos</label>
            <select className="calculadora-form-select" type="number"  onChange={ (e) => setPeriodoDividendos(parseInt(e.target.value))}>
              <option className="calculadora-form-options" value={0}>nenhum</option>
              <option className="calculadora-form-options" value={1}>mensal</option>
              <option className="calculadora-form-options" value={2}>bimestral</option>
              <option className="calculadora-form-options" value={3}>trimestral</option>
              <option className="calculadora-form-options" value={6}>semestral</option>
              <option className="calculadora-form-options" value={12}>anual</option>
            </select>
          </div>

          <div className="calculadora-form-card-content">
            <label className="calculadora-form-label-select">Reinveste os dividendos?</label>
            <select className="calculadora-form-select" type="boolean" onChange={ (e) => setReinvesteDividendos(parseInt(e.target.value)) }>
              <option className="calculadora-form-options" value={0}>Não</option>
              <option className="calculadora-form-options" value={1}>Sim</option>
            </select>
          </div>
          
        </div>
      </div>
      <div className="calculadora-form-card-button">
        <button className="calculadora-form-button"  onClick={() => handleSubmit()}>Enviar</button>
      </div>
      

        { dividendosPagos[contador]? (
          <div className="calculadora-resumo-card">
          <p>Total de dividendos Pagos: R$ {formatNumber(dividendosPagos[contador])}</p>
          <p>Ultimo dividendo pago: R$ {formatNumber(ultimoDividendoPago[contador])}</p>
          <p>Total de valorização: R$ {formatNumber(jurosPagos[contador])}</p>
          <p>Capital investido: R$ {formatNumber(valorInvestido[contador])}</p>
          <p>Valor acumulado: R$ {formatNumber(valorAcumulado[contador])}</p>
        </div>) : null}


        { dividendosPagos[contador]? (
          <Chart
            chartType="LineChart"
            data={chartData}
            width="100.00%"
            height="100vh"
            options={{
              title: "Valor totais investidos x Valores acumulados no período",
              curveType: "function",
              series: {
                1: {color: "#00178a"},
                2: {color: "#6f87ff"}
              },
              legend: { position: "bottom" },
            }}
          />
        ) : null}


        

        {dividendosPagos[contador] ? (
          <div className="calculadora-table-card">
            <table>
              <thead>
                <tr> 
                  <th>Mês</th>
                  <th>Valor Investido</th>
                  <th>Rentabilidade</th>
                  <th>Dividendos Totais</th>
                  <th>Dividendo do Período</th>
                  <th>Valor acumulado</th>
                </tr>
              </thead>
              <tbody>
                {valorAcumulado.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>R$ {formatNumber(valorInvestido[index])}</td>
                    <td>R$ {formatNumber(jurosPagos[index])}</td>
                    <td>R$ {formatNumber(dividendosPagos[index])}</td>
                    <td>R$ {formatNumber(ultimoDividendoPago[index])}</td>
                    <td>R$ {formatNumber(valorAcumulado[index])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        ) : null}
    </>
    
  );
}

export default App;
