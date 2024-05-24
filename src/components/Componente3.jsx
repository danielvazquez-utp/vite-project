import React from 'react'

const Componente3 = ({ texto, bgcolor, click }) => {
  return (
    <button style={{backgroundColor:bgcolor}} onClick={ click } >{ texto }</button>
  )
}

export default Componente3;