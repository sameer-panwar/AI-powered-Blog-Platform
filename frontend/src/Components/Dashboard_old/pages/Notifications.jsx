import axios from 'axios';
import {useEffect, useState} from 'react';
import {CircleX, ThumbsUp, MessageSquare} from 'lucide-react';

export const Notifications=()=>{
    const [dataHouse, setDataHouse] = useState([]);

    const getNotifications = async ()=>{
        const userID = localStorage.getItem("userID");
        try{
            const response = await axios.get(`http://localhost:3000/getNotifications/${userID}`,{
                headers:{
                    Authorization: localStorage.getItem("token")
                }
            });

            if(!response){
                console.log("Cannot get Notifications");
            }else{
                setDataHouse(response.data.data);
            }
        }catch(err){
            console.log("Server Error", err);
        }
    }

    useEffect(()=>{
        getNotifications();
    },[]);

    return(
        <div className="h-full w-full flex flex-col">
            <h1 className="text-center m-10 text-4xl font-bold">Nofifications</h1>
            {dataHouse.length > 0? 
                <ul className="h-full w-inherit flex flex-col mx-10  gap-4 mt-10">
                    {dataHouse.map((item)=>{
                        return <li 
                                className={`${item.isRead? "bg-white": "bg-gray-200"} grid grid-cols-[10%_1fr_10%] gap-6 w-full h-fit p-6 text-xl border-2 rounded-xl cursor-pointer`} 
                                
                                key={item._id}>
                                    <div className="h-10 w-10 bg-black rounded-full m-auto"></div>
                                    <div>
                                        <h1 className='font-bold'>{item.blogId.title}</h1>
                                        {`${item.from.name} has ${item.type == "like"? "Liked": "commented on"} Your Blog.`}
                                    </div>
                                    <div className='m-auto'>
                                        {item.type === "like"? <ThumbsUp />: <MessageSquare />}
                                    </div>
                                </li>
                        })
                    }
                </ul>
                :
                <h2 className='flex justify-center items-center gap-4 text-xl'><CircleX />No Notifications</h2>
            }
        </div>
    )
}
