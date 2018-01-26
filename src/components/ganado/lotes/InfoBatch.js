import React, {Fragment} from 'react';
import {Form, Input, Checkbox} from 'antd';


const FormItem = Form.Item;


const InfoBatch = ({name, status, corral}) => {

    return (
        <Fragment>
            <Form style={{width:'100%'}}>
                <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>
                    <FormItem
                        label="Name"
                    >
                        <Input
                            disabled
                            defaultValue={name}/>
                    </FormItem>
                    <FormItem
                        label="Corral"
                    >
                        <Input
                            disabled
                            defaultValue={corral.numero_serial}/>
                    </FormItem>
                    <FormItem>
                        <Checkbox disabled
                                  defaultChecked={status}>Status</Checkbox>
                    </FormItem>
                </div>
            </Form>
        </Fragment>
    )
};

export default InfoBatch;