import React , {useState} from 'react'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Style from "./SceneTable.module.css"
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from 'next/router';
import axios from 'axios';
import DeletePopup from '../DeletePopup/DeletePopup';
import { Modal } from '@mui/material'

interface Iprops {
    scenes : any , 
    
    moduleId : string  , 
    change : any
}


const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    p: 4,
    zIndex: 2
  };

const SceneTable = ({scenes , moduleId , change} : Iprops) => {
    console.log(scenes);


    const [open, setOpen] = useState(false)
    const [id , setId] =useState('')
    const handleOpen = (id : any) => {
        setOpen(true)
        setId(id)
    }
    const handleClose = () => setOpen(false);

    const router = useRouter()

    const onDeleteClick =async ()=> {
        try {
            const {data} = await axios.delete(`${process.env.API_SERVER_URL}/scene/deleteScene/${id}`)
            change()
            handleClose()
        } catch (error) {
            
        }
    }

    const handleDeletePopupNo = ()=> {
        handleClose()
    }

  return (
    <div className={Style.main} style={{ marginTop: "20px" }}>
      <table className={Style.table}>
        <thead className={Style.tableHeading}>
          <tr>
            <td
              width={150}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600", padding: "20px" }}
            >
              <h3>Scene Name</h3>
            </td>
            <td
              width={150}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              <h3>Character Name 1</h3>
            </td>
            <td
              width={150}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              <h3>Character Name 2</h3>
            </td>
            <td
              width={150}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              <h3>Options</h3>
            </td>
          </tr>
        </thead>

        <tbody>
          {scenes?.map((scene: any, i: any) => (
            <tr className={Style.data} key={i}>
              <td style={{ paddingLeft: "20px" }} align="left">
                {scene.scene_name}
              </td>
              <td style={{ paddingLeft: "20px" }} align="left">
                {scene.character1_name}
              </td>
              <td style={{ paddingLeft: "20px" }} align="left">
                {scene.character2_name}
              </td>
              <td>
                <div style={{display:'flex', gap:'10px'}} >
                  <div className={Style.hoverCross} >
                    <ClearIcon
                      onClick={() => handleOpen(scene._id)}
                      sx={{
                        padding: "6px",
                        borderRadius: "5px",
                        color: "#1C6F85",
                        backgroundColor: "rgba(28, 111, 133, 0.25)",
                        width: "35px",
                        height: "35px",
                      }}
                    />
                  </div>
                 <div className={Style.hoverEdit}  >
                 <BorderColorIcon
                    onClick={() =>
                      router.push(
                        `/admin/cms/createScene/${moduleId}/${scene._id}`
                      )
                    }
                    sx={{
                      color: "#9269FF",
                      padding: "4px",
                      borderRadius: "5px",
                      backgroundColor: "rgba(146, 105, 255, 0.25)",
                      width: "35px",
                      height: "35px",
                    }}
                  />
                 </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={open} onClose={handleClose}>
        <div style={style}>
          <DeletePopup
            handleClose={handleClose}
            handleDeleteYes={onDeleteClick}
            handleDeleteNo={handleDeletePopupNo}
          />
        </div>
      </Modal>
    </div>
  );
}

export default SceneTable