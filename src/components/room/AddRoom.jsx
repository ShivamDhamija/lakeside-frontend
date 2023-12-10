import React, { useState } from "react"
import {addRoom} from "../utils/ApiFunctions"

const AddRoom =()=>{
    const [newRoom, setNewRoom]= useState({
        photo:null,
        roomType:"",
        roomPrice:""
    })
    const [imagePreview ,setImagePreview]=useState("")
    const[successMessage, setSuccessMessage ]=useState("")
    const [errorMessage, setErrorMessage]=useState("") 
    const handelRoomInputChange =(e)=>{
        const name =e.target.name
        let value = e.target.value
        if(name === "roomPrice"){
            if(!isNaN(value)){
                value.parseInt(value)
            }else{
                value = ""
            }
        } 
        setNewRoom({...newRoom,[name] :value})
    }

    const  handelImageChange = (e)=>{
        const selecteImage = e.target.files[0]
        setNewRoom({...newRoom,photo: selecteImage})
        setImagePreview(URL.createObjectURL(selecteImage))
    }

    const handelSubmit = async (e)=>{
        e.preventDEfault()
        try{
            const success= await addRoom(newRoom.photo,newRoom.roomType, newRoom.roomPrice)
            if(success !== undefined){
                setSuccessMessage("A new room was added to the database!")
                setNewRoom({photo:null,roomType : "",roomPrice:""})
                setImagePreview("")
                setErrorMessage("")
            }else{
                setErrorMessage("Error adding room")
            }
        }catch(e){
            setErrorMessage(e.message)
        }
    }

    return (
        <>
        <ssecton className= "container, mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Add a New Room</h2>
                    <form onSubmit={handelSubmit}>
                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label">Room Type
                            </label>
                            <div></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label">Room Price
                            </label>
                            <input className="form-control" 
                                required 
                                id="roomPrice" 
                                type ="number"
                                name ="roomPrice"
                                value={newRoom.roomPrice}
                                onChange={handelRoomInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Photo" className="form-label">Room Photo
                            </label>
                            <input
                                id="photo"
                                name="photo"
                                type ="file"
                                className="form-control"
                                onChange={handelImageChange}
                            />
                            {imagePreview &&(
                                <img src={imagePreview} 
                                alt="Preview Room Photo"
                                style={{maxWidth:"400px",maxHeight:"400px"}}
                                className="mb-3"
                                />
                            )}
                            <div></div>
                        </div>
                        <div className="d-grid d-md-flex mt-2">
                            <button className="btn btn-outline-primary ml-5">
                                Save Room
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </ssecton>
        </>
    )
}
export default AddRoom