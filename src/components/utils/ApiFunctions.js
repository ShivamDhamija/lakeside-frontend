import axios from "axios"

export const api= axios.create({
    baseURL : "http://localhost:9192"
})
//This function add a new room to  the database
export async function AddRoom(photot, roomType, roomPrice){
    const formData = new FormData()
    formData.append("photo", photot)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)
    const respnse = await api.post("/rooms/add/new-room", formData)
    if(respnse.status === 201)
        return true;
    return false;
}
//This function gets all room types from data base
export async function getRoomTypes(){
    try{
        const respnse =await api.get("/rooms/room-types")
        return respnse.data
    }
    catch(error){
        throw new Error("Error fetching room types")
    }
}