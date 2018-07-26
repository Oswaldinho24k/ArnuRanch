import React from 'react'
import { Divider } from 'antd';
import moment from 'moment';
import { ReporteCard } from './ReporteCard';


export const ResumenCard =({aretes, date}) => {
 
    console.log(aretes)
    let kgHechosTotales = 0;
    let gdpPromedio = 0;
    let conversionPromedio = 0;
    let rendimientopPromedio = 0;
    let costosAlimentosTotales = 0;
    let costosVacunasTotales = 0;
    let kgAlimentosTotales = 0;
    let promedioalimentsCostTotalGeneral = 0;
    let promedioCompra = 0;
    let promedioVenta = 0;

    return(
        <div>
            
            {aretes===undefined || aretes===null || aretes===[] ? 
            <p>Selecciona al menos un arete</p>:

            aretes.map((a, key)=>{

                promedioCompra+=parseFloat(a.costo_inicial)
                

                let alimentsCostTotal = 0;
                let vacunasCostTotal = 0;
                let alimentsQuantityTotal = 0;                                              
                //suma el costo de todos los gastos
                if (a ==="") a = []
                a.aliments ? a.aliments : a.aliments=[]
                a.pesadas?a.pesadas:a.pesadas=[]
                let resultCost = a.aliments.map( (item, ix) => {
                    if(item.tipo==='Alimento')return alimentsCostTotal += parseFloat(item.costo)
                   else return vacunasCostTotal += parseFloat(item.costo)        
                });
                costosAlimentosTotales += parseFloat(alimentsCostTotal)
                //promedio en costos de alimentos por animal
                
                let promedioalimentsCostTotal = costosAlimentosTotales/a.aliments.filter(a=>a.tipo==='Alimento').length
                
                promedioalimentsCostTotalGeneral += parseFloat(promedioalimentsCostTotal.toFixed(2))
                console.log(promedioalimentsCostTotalGeneral)
                costosVacunasTotales += vacunasCostTotal
                // //suma la cantidad de todos los gastos
                let resultQuantity = a.aliments.map( (item, ix) => {
                    if(item.tipo==='Alimento')return alimentsQuantityTotal += parseFloat(item.cantidad)
                });
                parseFloat(alimentsQuantityTotal)
                kgAlimentosTotales += alimentsQuantityTotal
                //obtiene la diferencia en dias desde su llegada hasta hoy
                var given = moment(a.fecha_entrada, "YYYY-MM-DD");
                var current = moment().startOf('day');
                let differenceTotal = moment.duration(current.diff(given)).asDays().toFixed(0);
                // //ultima pesada
                let lastPesadaDate = a.pesadas.length>=1?moment(a.pesadas[a.pesadas.length-1].created):moment(0);                
                let lastPesada = a.pesadas.length>=1?a.pesadas[a.pesadas.length-1].peso:0;
                kgHechosTotales += parseFloat((lastPesada - a.peso_entrada))
                // //dias de la llegada a la ultima pesada
                //precio venta actual :)
                let precioVenta = a.costo_kilo*lastPesada
                promedioVenta += parseFloat(precioVenta)
                let differenceLastPesada = moment.duration(lastPesadaDate.diff(given)).asDays().toFixed(0);
                //ganancia diaria promedio y otros indicadores
                let gdp = ((lastPesada-a.peso_entrada)/differenceLastPesada).toFixed(2)
                gdpPromedio += parseFloat(gdp)
                gdpPromedio = gdpPromedio/aretes.length
                //conversion
                let conversion = ((lastPesada-a.peso_entrada)/alimentsQuantityTotal).toFixed(2)
                conversionPromedio += parseFloat(conversion)
                conversionPromedio = conversionPromedio/aretes.length
                //rendimiento
                let rendimiento = (alimentsQuantityTotal/(lastPesada-a.peso_entrada)).toFixed(2)
                rendimientopPromedio += parseFloat(rendimiento)
                rendimientopPromedio = rendimientopPromedio/aretes.length
                //dias de la ultima pesada al dia de hoy
                // let diffToday = moment.duration(current.diff(lastPesadaDate)).asDays().toFixed(0);
                // //peso actual aprox en base a la gdp
                // let pesoAproxToday = (diffToday*gdp) + parseFloat(lastPesada)*/
                
                return(
                    <p key={key}></p>
                )
            })

           }
            <h2>Datos de la Selección </h2>
            {/* {date?<h3>{`Entre ${date[0]} y ${date[1]}`}</h3>:''} */}
            {date?
            <div>                
                <p>GDP: {gdpPromedio.toFixed(2)} Kg</p>
                <p>Rendimiento: {rendimientopPromedio.toFixed(2)}Kg</p>
                <p>Conversion: {conversionPromedio.toFixed(2)}%</p>
                {/* <p>Consumo diario promedio en kgs en base seca</p> */}
                <p>Consumo diario promedio en dinero: ${promedioalimentsCostTotalGeneral/aretes.length}</p>
                <p>Precio promedio de compra: ${promedioCompra/aretes.length}</p>
                <p>Precio promedio de venta: ${promedioVenta/aretes.length} </p>
                {/* <p>Utilidad diaria: </p> */}
                <p>Utilidad neta por cabeza:{(promedioVenta/aretes.length)-(promedioCompra/aretes.length)}</p>
                {/* <p>Conversión por etapa de peso vivo: </p> */}
            </div>:
            <div>
                <p>Kg Hechos {kgHechosTotales}</p>
                <p>Costos de Alimentación: {costosAlimentosTotales}</p>
                <p>Kg de Alimento: {kgAlimentosTotales}</p>
                <p>Costos de Vacunación: {costosVacunasTotales}</p>
                <p>GDP: {gdpPromedio} Kg</p>
                <p>Rendimiento: {rendimientopPromedio.toFixed(2)}Kg</p>
                <p>Conversion: {conversionPromedio.toFixed(2)}%</p>
            </div>}
        </div>
    )
}
   
