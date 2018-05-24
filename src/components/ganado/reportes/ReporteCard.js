import React from 'react'
import moment from 'moment'

export const ReporteCard = ({arete_rancho, peso_entrada, lote, aliments, pesadas, costo_inicial, raza, costo_kilo, ref_factura_original, fecha_entrada}) => {

    let alimentsCostTotal = 0;
    let vacunasCostTotal = 0;
    let alimentsQuantityTotal = 0;
    aliments?aliments:aliments=[]
    pesadas?pesadas:pesadas=[]
    //suma el costo de todos los gastos
    let resultCost = aliments.map( (item, ix) => {
        if(item.tipo==='Alimento')return alimentsCostTotal += parseFloat(item.costo)
        else return vacunasCostTotal += parseFloat(item.costo)        
    });
    //suma la cantidad de todos los gastos
    let resultQuantity = aliments.map( (item, ix) => {
        if(item.tipo==='Alimento')return alimentsQuantityTotal += parseFloat(item.cantidad)
    });
    //obtiene la diferencia en dias desde su llegada hasta hoy
    var given = moment(fecha_entrada, "YYYY-MM-DD");
    var current = moment().startOf('day');
    let difference = moment.duration(current.diff(given)).asDays().toFixed(0);
    
    console.log(difference)

  return (
    <div>      
        <h4>Fecha de Llegada | Días en Rancho </h4>
        <span>{moment(fecha_entrada).format('LL')}</span> | 
        <span>{difference} días</span>

        <h4>Valor Inicial | Valor actual </h4>
        <span>${costo_inicial}</span> | 
        <span><strong>${difference}</strong> </span>
    
        <h5>Peso de entrada | Última Pesada | Peso actual Estimado </h5>      
        <span>{peso_entrada}Kg</span>  |  
        <span>{pesadas.length>=1?pesadas[pesadas.length-1].peso:'0'}Kg</span>  |  
        <span>Not available yet lol</span>

        <h5>Alimentación Registrada</h5>
        <span>{alimentsQuantityTotal}Kg</span> | 
        <span> <strong>${alimentsCostTotal}</strong></span>
        
        <h5>Vacunación Registrada</h5>      
        <span><strong>${vacunasCostTotal}</strong></span>
    </div>
  )
}
