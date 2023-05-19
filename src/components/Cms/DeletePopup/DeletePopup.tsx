import Button from '@/components/Button/Button'
import Style from './DeletePopup.module.css'

interface IProps {
  handleClose : any , 
  handleDeleteYes : any , 
  handleDeleteNo : any
}


function DeletePopup({handleClose , handleDeleteYes , handleDeleteNo} : IProps) {

  

  return (
        <div className={Style.main}>
            <h3>Are you sure</h3>
            <div className={Style.button}>
                <Button  btype='create' onClick={handleDeleteNo}  disable={false} type='' >Cancel</Button>
                <Button  btype='create' onClick={handleDeleteYes} disable={false} type='' >Sure</Button>
            </div>
        </div>
    
  )
}

export default DeletePopup