import React, { useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { usercontext } from "../Usercontext.js";
const MyEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div >
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChange}
        className="quillover"
      />
    </div>
  );
};

const TechnologyUpdateForm = () => {
  const { userdata } = useContext(usercontext);
  const [useupdate, setUseupdate] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [, setUpdatepro] = useState([]);
  const [imagepost, setimagepost] = useState(userdata.imageprof);
  const [getcat, setgetcat] = useState([]);

  const handleReject = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this Update?"
      );
      if (confirmed) {
        await axios.delete(`http://localhost:8080/deleteupd/${id}`);
        alert("Update  Deleted");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting technology:", error);
    }
  };
  useEffect(() => {
    fetchDatas();
  }, [])
  const fetchDatas = async () => {
    const responses = await axios.get("http://localhost:8080/getcategory");
    setgetcat(responses.data);
  }
  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/gettechUpd");
      console.log(getcat);
      const userfilter = response.data.filter(
        (user) => user.emails === userdata.aemail
      );
      setUseupdate(userfilter);
      const responseAddTech = await axios.get(
        "http://localhost:8080/getAddtech"
      );

      const filteredData = responseAddTech.data.filter(
        (item) => item.aemail === userdata.aemail
      );
      setUpdatepro(filteredData);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDescriptionChange = (html) => {
    setDescription(html);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !description ||!tags) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }


    try {
      let response;
      if (editingIndex !== null) {
        const id = useupdate[editingIndex].id;
        response = await axios.put(`http://localhost:8080/putUpdate/${id}`, {
          category: category,
          description: description,
          names: userdata.aname,
          emails: userdata.aemail,
          images: imagepost,
          tag: tags,
          id: id,
        });
        window.location.reload()
      } else {
        response = await axios.post("http://localhost:8080/AddUpd", {
          category: category,
          description: description,
          tag: tags,
          names: userdata.aname,
          emails: userdata.aemail,
          images: imagepost,
        });
      }
      if (response.status === 200 || response.status === 201) {
        alert("Technology updated successfully");
        setCategory("");
        setDescription("");
        setTags("");
        fetchData();
        setEditingIndex(null);
      } else {
        setErrorMessage("Failed to update technology.");
      }
    } catch (error) {
      console.error("Error updating technology:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleEditClick = (index) => {
    const technology = useupdate[index];
    setCategory(technology.category);
    setDescription(technology.description);
    setTags(technology.tag);
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setCategory("");
    setDescription("");
    setTags("");
    setEditingIndex(null);
  };

  const handelemedia = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setimagepost(reader.result);

      };
    }
  };


  return (
    <>
      <div className="container mt-5 card w-50 shadow-lg p-3 mb-5 bg-white rounded">
        <h2 className="mb-4 text-center">Update Technology</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <select
              value={category}
              className="form-select"
              id="category"
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                Select Category
              </option>
              {getcat.map((item) => (
                <option key={item.id} value={item.categorys}>
                  {item.categorys}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 ">
            <label htmlFor="information" className="form-label">
              Information:
            </label>
            <MyEditor value={description} onChange={handleDescriptionChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">
              Tags:
            </label>
            <input
              type="text"
              id="tags"
              className="form-control"
              value={tags}
              onChange={handleTagsChange}
            />
          </div>
          <div className="text-center">
            {editingIndex !== null ? (
              <>
                <button type="submit" className="btn btn-primary m-3">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary m-3"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button type="submit" className="btn btn-primary m-3 abbs">
                Submit
              </button>
            )}
            {errorMessage && (
              <p className="error mt-2 text-danger">{errorMessage}</p>
            )}
          </div>
        </form>
      </div>
      <div className="mt-5">
        <table className="table table-bordered mt-2 w-75 mx-auto">
          <thead className=" table-primary border border-2 border-light  text-center  ">
            <tr className="border">
              <th>Si No:</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {useupdate.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{index + 1}</td>
                <td>{item.category}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleEditClick(index)}
                  >
                    <CiEdit />
                  </button>
                  <button
                    className="btn btn-success m-1"
                    onClick={() => handleReject(item.id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TechnologyUpdateForm;
