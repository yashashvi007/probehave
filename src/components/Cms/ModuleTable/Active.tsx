import React , {useState} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function Active() {

  const [isActive , setIsActive] = useState(false)

  const handleActive = (e : any) => {
    setIsActive(e.target.value)
  }

  return (
    <div>
       <RadioGroup
                                         aria-labelledby="demo-controlled-radio-buttons-group"
                                         name="controlled-radio-buttons-group"
                                         value={isActive}
                                         onChange={handleActive}
                                     >
                                     <FormControlLabel value="true" control={<Radio />} label="Is active" />
                                     <FormControlLabel value="false" control={<Radio />} label="Not active" />
                                 </RadioGroup>   
    </div>
  )
}

export default Active