

export default function Calcular(PV, PMT, D, N, I, REINVESTEDIVIDENDOS,PERIODODIVIDENDOS){
    let DVP = 0
    //dividendos pagos = 0
    let JP = 0
    //Juros pagos = 0
    let VI = PV
    //Neste caso estamos trocando CI por VI que significa Valor investido e posteriormente somaremos todos os investimentos
    //a fim de retornar todo o valor que foi investido
    let VP = PV
    //Valor presente = present value, servirá para somar como saldo acumulado
    if(D != null && D != 0){
        if(REINVESTEDIVIDENDOS === true){
            for(let i=1; i<= N; i++){
                DVP = DVP + PV*D/100;
                JP = JP + PV*I/100;
                VI = VI + PMT
                if(i % PERIODODIVIDENDOS === 0){
                    VP = VP*(I+D)+PMT+VP
                }else{
                    VP = VP*I+VP+PMT
                }
                
                console.log(`
                    Repetição de número: ${i}
                    Dividendos pagos: ${DVP}
                    Juros pagos: ${JP}
                    Valores investidos: ${VI}
                    Saldo Acumulado: ${VP}
                
                `)
                
                
            }
        }else{
            for(let i=1; i<= N; i++){
                JP = JP + PV*I/100;
                VI = VI + PMT;
                
                VP = VP*I+VP+PMT
                
                console.log(`
                    
                    Repetição de número: ${i}
                    Juros pagos: ${JP}
                    Valores investidos: ${VI}
                    Saldo Acumulado: ${VP}
                
                `)
            }
        }
    }else{
        for(let i=1; i<= N; i++){
            JP = JP + PV*I/100;
            VI = VI + PMT;
            
            VP = VP*I+VP+PMT
            
            console.log(`
                
                Repetição de número: ${i}
                Juros pagos: ${JP}
                Valores investidos: ${VI}
                Saldo Acumulado: ${VP}
            
            `)
        }
    }
}


/* Calcular(0, 1000, 0, 3, 10, false,false) */
/* Calcular(PV, PMT, D, N, I, REINVESTEDIVIDENDOS,PERIODODIVIDENDOS) */