import Button from '../Button/Button'
import Style from './StartPopup.module.css'


interface IProps {
    start : any , 
    closePopup : any
}

function StartPopup({start , closePopup} : IProps) {

    const onClick = () => {
        start()
        closePopup()
    }

  return (
        <div className={Style.main}>
            <h3>Are you sure</h3>
            <div className={Style.button}>
                <Button  btype='create' onClick={() => onClick()} type='' disable={false} >Start</Button> 
            </div>
        </div>
    
  )
}

export default StartPopup