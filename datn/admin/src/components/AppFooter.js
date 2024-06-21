import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      
      <div className="ms-auto">
        <span className="me-1">Được sửa bởi</span>
        <a  target="_blank" rel="noopener noreferrer">
          Trần Khánh Hằng
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
