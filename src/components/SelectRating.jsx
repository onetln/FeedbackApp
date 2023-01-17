//import { useState } from 'react'

function SelectRating({ number, select, selected }) {
    //const [selected, setSelected] = useState()

    const rows = [];
    for (let i = 1; i <= number; i++) {
        rows.push(i);
    }

    const handleChange = (e) => {
      //  setSelected(+e.currentTarget.value)
        select(+e.currentTarget.value)
    }

    console.log('selected: ' + selected)

  return (
     <ul className='rating'>{rows.map((row) => { 
         return (
                <li key={row}>
                    <input key={row} type="radio"
                     id={`num${row}`}
                     value={row}
                     onChange={handleChange}
                     checked={selected === row}
                     label={row}/>
                     <label className='num-display' htmlFor={`num${row}`}>{row}</label>
                </li>
                )
     })}
     </ul> 
  )
}

export default SelectRating
