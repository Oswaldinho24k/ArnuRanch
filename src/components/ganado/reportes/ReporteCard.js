import React from 'react'
import moment from 'moment'
import {Card} from 'antd'
import {Link} from 'react-router-dom'

export const ReporteCard = ({id, arete_rancho, arete_siniga, peso_entrada, lote, aliments, pesadas, costo_inicial, raza, costo_kilo, ref_factura_original, fecha_entrada}) => {

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
    let differenceTotal = moment.duration(current.diff(given)).asDays().toFixed(0);

    let lastPesadaDate = pesadas.length>=1?moment(pesadas[pesadas.length-1].created):moment(0);
    let lastPesada = pesadas.length>=1?pesadas[pesadas.length-1].peso:0;
    let differenceLastPesada = moment.duration(lastPesadaDate.diff(given)).asDays().toFixed(0);
    let gdp = ((lastPesada-peso_entrada)/differenceLastPesada).toFixed(2)
    let conversion = ((lastPesada-peso_entrada)/alimentsQuantityTotal).toFixed(2)
    let rendimiento = (alimentsQuantityTotal/(lastPesada-peso_entrada)).toFixed(2)

    
    

  return (
    <div>
        <span style={{display:'flex', justifyContent:'space-between'}}>
            <Link to={`/admin/animals/${id}`}>Siniga: {arete_siniga}</Link>
            <span>Arete de Rancho: {arete_rancho} </span>
            <Link to={`/admin/lotes/${lote?lote.id:''}`}>Lote: {lote?lote.name:''}</Link>
        </span>  
        
            <h5>Fecha de Llegada </h5>
            <span>{moment(fecha_entrada).format('LL')}</span>
            <h5> Días en Rancho </h5>
            <span>{differenceTotal} días</span>

            <h5>Valor Inicial </h5>
            <span>${costo_inicial}</span>
            <h5>Valor actual </h5>
            <span><strong>${peso_entrada*costo_kilo}</strong> </span>                
        
            <h5>Peso de entrada </h5>      
            <span>{peso_entrada}Kg</span>
            <h5> Última Pesada</h5>
            <span>{lastPesada}Kg</span>
            <h5> Kg Hechos(última pesada) </h5> 
            <span>{lastPesada-peso_entrada}Kg</span>
                
            <h5>Días para venta</h5>
            <span>{((390-lastPesada)/gdp).toFixed(0)} días</span>
            <h5>Fecha de Salida</h5>
            <span>salida</span>

            <h5>Alimentación Registrada(Kg)</h5>
            <span>{alimentsQuantityTotal}Kg</span>
            <h5>Alimentación Registrada($)</h5>
            <span> <strong>${alimentsCostTotal}</strong></span>
            
            <h5>Vacunación Registrada</h5>      
            <span><strong>${vacunasCostTotal}</strong></span>
         
            <h5>Ganancia Diaria Promedio</h5>
            <span>{gdp}Kg</span>
            <h5>Conversión -> (última pesada)</h5>
            <span>{alimentsQuantityTotal===0?0:conversion}%</span>
            <h5>Rendimiento</h5>
            <span>{rendimiento}Kg</span>
            <h5>Consumo Diario Promedio</h5>
            <span>{(alimentsQuantityTotal/differenceTotal).toFixed(2)}Kg</span>
            <h5>Consumo Diario Promedio($)</h5>
            <span>${(alimentsCostTotal/differenceTotal).toFixed(2)}</span>

    </div>
  )
}
