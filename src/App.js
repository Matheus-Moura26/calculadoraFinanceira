import React, {useState} from "react";
import "./css/app.css"
  

function App() {

  const [dividendosPagos, setDividendosPagos] = useState([])
  const [jurosPagos, setJurosPagos] = useState([])
  const [valorInvestido, setValorInvestido] = useState([])
  const [valorAcumulado, setValorAcumulado] = useState([])
  const [contador, setContador] = useState(-1)
  const [ultimoDividendoPago, setUltimoDividendoPago] = useState(0)

  function Calcular(PV, PMT, D, N, I, REINVESTEDIVIDENDOS,PERIODODIVIDENDOS){
    setDividendosPagos([])
    setJurosPagos([])
    setValorInvestido([])
    setValorAcumulado([])
    setContador(N-1)

    let dividendosPagosArray = [];
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
          jurosPagosArray.push(JP);
          valorInvestidoArray.push(VI);
          valorAcumuladoArray.push(VA);
        }
      
        setDividendosPagos(dividendosPagosArray);
        setUltimoDividendoPago(UDP);
        setJurosPagos(jurosPagosArray);
        setValorInvestido(valorInvestidoArray);
        setValorAcumulado(valorAcumuladoArray);
        
      
        console.log(`
          dividendos pagos:
          ${dividendosPagosArray}
          
          ultimo dividendo pago:
          ${UDP}
      
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
          jurosPagosArray.push(JP);
          valorInvestidoArray.push(VI);
          valorAcumuladoArray.push(VA);

          setDividendosPagos(dividendosPagosArray);
          setUltimoDividendoPago(UDP);
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
    <div className="calculadora-body">
      <label className="calculadora-form-label">Valor Inicial</label>
      <input className="calculadora-form-input" type="number"  onChange={ (e) => setValorInicial(parseFloat(e.target.value))}/>
      <label className="calculadora-form-label">Aporte</label>
      <input className="calculadora-form-input" type="number" onChange={ (e) => setAporte(parseFloat(e.target.value)) }/>
      <label className="calculadora-form-label">Tempo</label>
      <input className="calculadora-form-input" type="number" onChange={ (e) => setTempo(parseInt(e.target.value)) } />
      <label className="calculadora-form-label">Rentabilidade</label>
      <input className="calculadora-form-input"  type="number" onChange={ (e) => setRentabilidade(parseFloat(e.target.value)) } />
      <label className="calculadora-form-label">Dividendos</label>
      <input className="calculadora-form-input" type="number" onChange={ (e) => setDividendos(parseFloat(e.target.value)) } />
      <label className="calculadora-form-label">Periodo dos dividendos</label>
      <select className="calculadora-form-select" type="number"  onChange={ (e) => setPeriodoDividendos(parseInt(e.target.value))}>
        <option className="calculadora-form-options" value={0}>nenhum</option>
        <option className="calculadora-form-options" value={1}>mensal</option>
        <option className="calculadora-form-options" value={2}>bimestral</option>
        <option className="calculadora-form-options" value={3}>trimestral</option>
        <option className="calculadora-form-options" value={6}>semestral</option>
        <option className="calculadora-form-options" value={12}>anual</option>
      </select>
      <label className="calculadora-form-label-select">Reinveste os dividendos?</label>
      <select className="calculadora-form-select" type="boolean" onChange={ (e) => setReinvesteDividendos(parseInt(e.target.value)) }>
        <option className="calculadora-form-options" value={0}>Não</option>
        <option className="calculadora-form-options" value={1}>Sim</option>
      </select>
      <button  onClick={() => handleSubmit()}>Enviar</button>


      { dividendosPagos[contador]? (
        <div className="calculadora-resumo-card">
        <p>Total de dividendos Pagos: R$ {dividendosPagos[contador]}</p>
        <p>Ultimo dividendo pago: R$ {ultimoDividendoPago}</p>
        <p>Total de valorização: R$ {jurosPagos[contador]}</p>
        <p>Capital investido: R$ {valorInvestido[contador]}</p>
        <p>Valor acumulado: R$ {valorAcumulado[contador]}</p>
      </div>) : console.log("Não aconteceu")}
      
    </div>
  );
}

export default App;
