import React from "react";
import { useState , useEffect} from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../AllCss/updatecatecory.css"
import axios from "axios";
export default function UpdateCategory() {
  const [categorys, setcategorys] = useState("");
  const[ errorMessage,setErrorMessage]=useState("")
const[getcat,setgetcat]=useState([]);
  const handelcategory = (e) => {
    setcategorys(e.target.value);
  };
  const handelsubmit = async () => {
    if(categorys===''){
      alert("Mention the Category")
    }else{
   try{
     const response = await fetch("http://localhost:8080/updCate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      categorys:categorys
       
      }),
    });

    if (response.ok) {
      // const vuserdata = await response.json();
      // setuserdata(vuserdata);
      alert("Category Updated")
      window.location.reload()
    } else {
      setErrorMessage("Update failed. Please check your credentials.");
    }
  } catch (hi) {
    setErrorMessage(
      "An error occurred during login. Please try again later."
    );
  }

  };
}
  useEffect(()=>{
    const fechdata=async ()=>{
  
  const responces= await axios.get("http://localhost:8080/getcategory")
  setgetcat(responces.data)
    }
    fechdata()
},[])

const handleReject = async (id) => {
  try {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Update?"
    );
    if (confirmed) {
      await axios.delete(`http://localhost:8080/deletecat/${id}`);
      alert("Update  Deleted");
      window.location.reload()
    
    }
  } catch (error) {
    console.error("Error deleting technology:", error);
  }
}
 

  return (
    <div className="">
      <div className="card w-50 mx-auto mt-5  shadow-lg ">
        <input
          type="text"
          placeholder="Add category"
          value={categorys}
          onChange={handelcategory}
          className="form-control w-50 mt-5 mx-auto"
        />

        <button type="submit" className="btn btn-danger w-25 mx-auto m-3" onClick={handelsubmit}>
          Add
        </button>
        <p className="text-danger">{errorMessage}</p>
      </div>
      <div className="mx-auto mt-5 card w-50">
        <h4 className="text-center">List of Category</h4>
        <table className="table table-bordered mt-3 w-75 mx-auto">
          <thead className=" table-dark border border-2 border-light  text-center  ">
        <tr>
          <th>ID</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className="table text-center">
        {getcat.map((item, index)=>(
          <tr key={item.id ||index}>
            <td>{index+1}</td>
            <td>{item.categorys}</td>
            <td>
              <button onClick={() => handleReject(item.id)} className="btn btn-danger abbs"><RiDeleteBin6Line /></button>
            </td>

          </tr>)
        )}
      </tbody>
    </table>
      </div>
    </div>
  );
}
