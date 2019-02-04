import React from 'react';
import {Form, InputNumber, Select, Button, Input, DatePicker} from 'antd';
import MainLoader from "../../common/Main Loader";
import {connect} from "react-redux";
import moment from 'moment'

const Option = Select.Option;

const FormItem = Form.Item;


class FormGasto extends React.Component{

    state={
        formula:{},
        kgPrice:0
    }

    saveFormula=(a)=>{
        console.log(a)
        let kgPrice = parseFloat(a.total_price)/parseFloat(a.total_units)
        this.setState({kgPrice})
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
        console.log(values.created)
        console.log(moment(values.created).format('YYYY-MM-DD'))

        values['created']=(moment(values.created).format('YYYY-MM-DD'));
        //values['created'] = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
        //values['cantidad']=values['cantidad'].toFixed(2);
        //values['costo']=values['costo'].toFixed(2);
        if(this.props.id)values['id'] = this.props.id
        this.props.saveGasto(values);
        this.props.form.resetFields()
    }
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    });
};


render(){
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {kgPrice} = this.state
    let {fetched, vacunas, formulas, tipo, formula, cantidad, vacuna, costo, unity, insumo, insumo_q, insumo_cost, created} = this.props;
    console.log(getFieldValue('formula'))
    if(!tipo)tipo = getFieldValue('tipo');

    if(!fetched) return <MainLoader/>;

    let vacunasOptions = vacunas.map((v, key)=>(<Option value={parseInt(v.id)} key={key}>{v.vaccine}</Option>));
    

    return(

        <Form onSubmit={this.handleSubmit} style={{padding:0}}>
    <FormItem style={{margin:0}} label="Tipo">
        {getFieldDecorator('tipo', {
        initialValue:tipo,
            rules: [{
            required: true, message: 'Completa!',
        }],
    })(
    <Select>
    <Option value="Alimento">Alimento</Option>
        <Option value="Vacuna">Vacuna</Option>

        </Select>
)}
</FormItem>
    <FormItem style={{margin:0}} label="Fecha">
        {getFieldDecorator('created', {
        initialValue:moment(created),
            rules: [{
            required: true, message: 'Completa!',
        }],
    })(
    <DatePicker style={{width:'100%'}}/>
)}
</FormItem>

    {tipo==='Alimento'?
    <div>
    <FormItem label={'Fórmula'} style={{margin:0}}>
        {getFieldDecorator('formula', {
            initialValue:formula,
            rules: [{
                required: true, message: 'Rellena el campo!',
            }],
        })(
        <Select>
        {formulas.map((f, key)=>(<Option value={parseInt(f.id)} key={key}><h4 onClick={()=>this.saveFormula(f)} >{f.name} <span>${f.total_price/f.total_units}/kg</span> </h4></Option>))}
        </Select>
        )}

    </FormItem>
    <FormItem  label="Cantidad" style={{margin:0}}>
        {getFieldDecorator('cantidad', {
            initialValue:cantidad,
            rules: [{
                required: true, message: 'Completa!',
            }],
        })(
        <Input
            addonAfter={<FormItem style={{height:5, padding:0}}>
            {getFieldDecorator('unity',{
                initialValue:unity
            })(
            <Select  style={{ maxWidth: 100, minWidth:80 }}>
            <Option value="Kg">Kg</Option>
                </Select>
            )}
        </FormItem>}
            />
        )}
    </FormItem>
    </div>
    :tipo==='Vacuna'?
    <div>
    <FormItem label={'Vacuna'} style={{marginBottom:0}}>
        {getFieldDecorator('vacuna', {
            initialValue:vacuna,
            rules: [{
                required: true, message: 'Rellena el campo!',
            }],
        })(
        <Select>
        {vacunasOptions}
        </Select>
        )}

    </FormItem>
    <FormItem  label="Cantidad" style={{marginBottom:0}}>
        {getFieldDecorator('cantidad', {
            initialValue:cantidad || 0,
            rules: [{
                required: true, message: 'Completa!',
            }],
        })(
        <Input
            addonAfter={
                <FormItem style={{height:5, padding:0}}>
            {getFieldDecorator('unity',{
                initialValue:unity
            })(
            <Select  style={{ maxWidth: 100, minWidth:80 }}>
            <Option value="ml">ml</Option>
                <Option value="unidad">unidad</Option>
                </Select>
            )}
        </FormItem>
        }
            />
        )}
    </FormItem>
    <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
    <FormItem  label="Insumo" style={{marginBottom:0}}>
        {getFieldDecorator('insumo', {
            initialValue:insumo,
            rules: [{
                required: true, message: 'Completa!',
            }],
        })(
        <Input/>
        )}
    </FormItem>
    <FormItem  label="Cantidad" style={{marginBottom:0}}>
        {getFieldDecorator('insumo_q', {
            initialValue:insumo_q,
            rules: [{
                required: true, message: 'Completa!',
            }],
        })(
        <Input/>
        )}
    </FormItem>
    <FormItem  label="Costo" style={{marginBottom:0}}>
        {getFieldDecorator('insumo_cost', {
            initialValue:insumo_cost,
            rules: [{
                required: true, message: 'Completa!',
            }],
        })(
        <Input/>
        )}
    </FormItem>
    </div>

    </div>:''}

    <FormItem  label="Monto del Gasto" style={{margin:0}}>
        
        {getFieldDecorator('costo', { 
            initialValue:kgPrice*getFieldValue('cantidad'),
            rules: [{
                required: true, message: 'Completa!',
            }],
        })(
        <InputNumber
            step={0.01}
            min={0}
            style={{width:'100%'}}
            formatter={value => `$${value}`}
            parser={value => value.replace('$', '')}
            />
        )}
    </FormItem>

    <FormItem style={{margin:0}}>
    <Button type="primary" htmlType="submit">Guardar</Button>
        </FormItem>
        </Form>
    )
}
}
FormGasto = Form.create()(FormGasto);

function mapStateToProps(state, ownProps) {
    return {
        vacunas:state.vacunas.list,
        formulas:state.formulas.list,
        fetched:state.vacunas.list!==undefined && state.formulas.list!==undefined
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

FormGasto = connect(mapStateToProps, mapDispatchToProps)(FormGasto);
export default FormGasto
