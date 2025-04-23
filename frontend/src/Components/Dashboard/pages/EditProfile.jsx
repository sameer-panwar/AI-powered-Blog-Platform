import { useEffect, useState } from "react"
import { Label } from "../../Auth/Login"
import axios from "axios";

export const EditProfile=({profile, onClose})=>{
    const [newValues, setNewValues]=useState({});
    const [success, setSuccess]=useState(false);

    useEffect(()=>{
        const id=profile._id
        const name=profile.name;
        const role=profile.role;
        const bio=profile.bio;
        setNewValues({
            id: id,
            name: name,
            role: role,
            bio: bio
        });
    },[]);

    function handleChange(e){
        setNewValues((prev)=>({
            ...prev,
            [e.target.name] : e.target.value 
        }))
    }
    
    const handleSubmit=async ()=>{
        console.log(newValues);
        try{
            const response=await axios.put("http://localhost:3000/editProfile",{
                id: newValues.id,
                name: newValues.name,
                role: newValues.role,
                bio: newValues.bio
            })
            console.log(response.data);
            if(!response.data.success){
                console.log("Cant update");        
            }else{
                console.log("Updated!!");
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                }, 2000);
            }

        }catch(error){
            console.error("Server Error", error);
        }
    }

    return(
        <div className="fixed inset-0 bg-white flex flex-col items-center border-4 ml-[15%] mr-[25%] pb-20">
            {success && <div className="fixed top-0 m-4 border-2 p-2 bg-green-500 text-white font-bold rounded-xl">Profile updated Successfull.</div>}
            <button 
                className="ml-auto mb-auto p-6 text-3xl font-extrabold border-3 cursor-pointer"
                onClick={onClose}
                >X
            </button>
            <div className="w-40 h-40 rounded-full bg-black mb-10"></div>
            <Label
                children="Name"
                type="text"
                name="name"
                value={newValues.name}
                onChange={handleChange}
            />
            <Label 
                children="Role"
                type="text"
                name="role"
                value={newValues.role}
                onChange={handleChange}
            />
            <Label 
                children="Bio"
                type="textarea"
                name="bio"
                value={newValues.bio}
                onChange={handleChange}
            />
            <button 
                className="bg-red-400 text-white font-bold px-4 py-2 mt-4 rounded-sm cursor-pointer"
                onClick={handleSubmit}>
                    Apply Changes
            </button>
        </div>
    )
}