import React from 'react'
import moment from 'moment'
import {Card, Tabs, Divider} from 'antd'
import {Link} from 'react-router-dom'

const TabPane = Tabs.TabPane;


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
    //ultima pesada
    let lastPesadaDate = pesadas.length>=1?moment(pesadas[pesadas.length-1].created):moment(0);
    let lastPesada = pesadas.length>=1?pesadas[pesadas.length-1].peso:0;
    //dias de la llegada a la ultima pesada
    let differenceLastPesada = moment.duration(lastPesadaDate.diff(given)).asDays().toFixed(0);
    //ganancia diaria promedio y otros indicadores
    let gdp = ((lastPesada-peso_entrada)/differenceLastPesada).toFixed(2)
    console.log(gdp)
    let conversion = ((lastPesada-peso_entrada)/alimentsQuantityTotal).toFixed(2)
    let rendimiento = (alimentsQuantityTotal/(lastPesada-peso_entrada)).toFixed(2)
    //dias de la ultima pesada al dia de hoy
    let diffToday = moment.duration(current.diff(lastPesadaDate)).asDays().toFixed(0);
    //peso actual aprox en base a la gdp
    let pesoAproxToday = (diffToday*gdp) + parseFloat(lastPesada)

    
    

  return (
    <Card style={{width:'100%', padding:0}} >
        <Tabs>
            <TabPane tab="Básicos y Peso" key="1">
                <div>
                    <p style={{margin:0}}>
                        Siniga: 
                        <Link to={`/admin/animals/${id}`}>{arete_siniga}</Link>
                    </p>
                    <p style={{margin:0}}>
                        Arete de Rancho: {arete_rancho} 
                    </p>
                    <p style={{margin:0}}>
                        Lote: 
                        <Link to={`/admin/lotes/${lote?lote.id:''}`}> {lote?lote.name:''}</Link>
                    </p>
                    <p style={{margin:0}}>
                        Fecha de Llegada
                        {moment(fecha_entrada).format('LL')}
                    </p>
                    <p style={{margin:0}}>
                        Días en Rancho
                        {differenceTotal} días
                    </p>
                    
                </div>
                <Divider/>
                <div>
                    <p style={{margin:0}}>
                        Peso de entrada: 
                        {peso_entrada}Kg
                    </p>            
                    <p style={{margin:0}}>
                        Última Pesada
                        {lastPesada}Kg
                    </p>
                    <p style={{margin:0}}>
                        Kg Hechos(última pesada)
                        {lastPesada-peso_entrada}Kg
                    </p>
                    <p style={{margin:0}}>
                        Peso Actual Aproximado
                        {pesoAproxToday}Kg
                    </p>
                    <p style={{margin:0}}>
                        Días para venta
                        {((390-lastPesada)/gdp).toFixed(0)} días
                    </p>    
                    <p style={{margin:0}}>
                        Fecha de Salida
                        <span>salida</span>
                    </p>
                
                </div>
            </TabPane>
            
            <TabPane tab="Gastos" key="2">
                <div>
                    <p style={{margin:0}}>
                        Alimentación Registrada(Kg)
                        {alimentsQuantityTotal.toFixed(2)}Kg
                    </p>
                    <p style={{margin:0}}>
                        Alimentación Registrada($)
                        <strong>${alimentsCostTotal}</strong>
                    </p>
                    <p style={{margin:0}}>
                        Vacunación Registrada
                        <strong>${vacunasCostTotal}</strong>
                    </p>   
                    <p style={{margin:0}}>
                        Ganancia Diaria Promedio
                        {gdp}Kg
                    </p>
                    <p style={{margin:0}}>
                        Conversión -> (última pesada)
                        {alimentsQuantityTotal===0?0:conversion}%
                    </p>
                    <p style={{margin:0}}>
                        Rendimiento
                        {rendimiento}Kg
                    </p>
                                        
                </div>
                <Divider/>
                <div>
                    <p style={{margin:0}}>
                        Valor Inicial: 
                        ${costo_inicial}
                    </p>
                    <p style={{margin:0}}>
                        Valor actual: 
                        <strong>${peso_entrada*costo_kilo}</strong>
                    </p>
                    <p style={{margin:0}}>
                        Consumo Diario Promedio: 
                        {(alimentsQuantityTotal/differenceTotal).toFixed(2)}Kg
                    </p>
                    <p style={{margin:0}}>
                        Consumo Diario Promedio($): 
                        ${(alimentsCostTotal/differenceTotal).toFixed(2)}
                    </p>
                    <p style={{margin:0}}>
                        utilidad Diaria
                        Valor de Terminación
                    </p>
            
                </div>
            </TabPane>
        </Tabs>
        
       
       
    </Card>
    )
}

