import React from 'react';

import { FormControl,FormControlLabel,FormLabel,Radio,RadioGroup } from "@material-ui/core";

export default function FormData({formLabel, values,currentValue,labels,onChange}){
      return(
            <div className="card container-small" style={{backgroundColor:'#27272c'}}>
                  <FormControl >
                        <FormLabel style={{color:'#ab79d6',fontSize:'2em', padding:'2px', margin:'2px', fontFamily:'"Kanit",serif', fontWeight:'bold'}}>{formLabel}</FormLabel>
                        <RadioGroup value={currentValue} onChange={onChange}>
                              {values.map((value,index)=> { 
                                    return(
                                          <FormControlLabel 
                                                key={`${value}_${index}`}
                                                value={value}
                                                control={<Radio style={{color:'#ab79d6'}} />}
                                                label={labels[index]}
                                          />
                                    );
                                    })}
                        </RadioGroup>
                  </FormControl>
            </div>

);}