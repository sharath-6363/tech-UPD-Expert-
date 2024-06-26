import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AllCss/ViewTechImfo.css";
import { BsArrowUp } from "react-icons/bs";
import Comments from "../VisitorComponent/Comments.js"
const TechnologyUpdates = () => {


  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [showDescription, setShowDescription] = useState({});
  const [, setemail] = useState([]);
  const [isNoResultsFound, setIsNoResultsFound] = useState("");
  const [, setisdes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/gettechUpd");

        setisdes(response.data.map((abb) => abb.id));
        setUpdates(response.data);
        setemail(response.data.map((rss) => rss.emails));

        const initialShowDescriptionState = response.data.reduce(
          (acc, update) => {
            acc[update.id] = update.description.length > 100 ? false : true;
            return acc;
          },
          {}
        );
        setShowDescription(initialShowDescriptionState);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const searchUpdates = () => {
    const filteredUpdates = updates.filter((update) => {
      const categoryMatch = update.category
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      // const descriptionMatch = update.description
      //   .toLowerCase()
      //   .includes(searchInput.toLowerCase());
      const tagsMatch = 
        Array.isArray(update.tag)&&
        update.tag.find((tag) =>
          tag.toLowerCase().includes(searchInput.toLowerCase())
        );
      return categoryMatch  || tagsMatch;
    });

    setSearchResults(filteredUpdates);

    if (filteredUpdates.length === 0) {
      setIsNoResultsFound(true);
    } else {
      setIsNoResultsFound(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === "") {
      setSearchResults([]);
    }
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchUpdates();
  };
  const handleViewMoreClick = (updateId) => {
    setShowDescription((prevState) => ({
      ...prevState,
      [updateId]: !prevState[updateId],
    }));
  };


  return (
    <div>
      <div className="container" onClick={() => handleViewMoreClick()}>
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
          <input
            className="form-control mr-sm-2 mt-5 w-75 mx-auto shadow"
            type="search"
            placeholder="Search by category "
            aria-label="Search"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          {isNoResultsFound && (
            <p className="text-danger text-center fs-4 m-2 mt-5 mx-auto">
              No results found
            </p>
          )}
        </form>
        <h2 className="my-4">Latest Technology Updates</h2>
        <ul className="list-group ">
          {searchResults.length > 0
            ? searchResults.map((update) => (
              <li key={update.id} className="list-group-item m-2 border-2 ">
                <h3 className="m-3">{update.category}</h3>
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: showDescription[update.id]
                        ? update.description
                        : update.description?.slice(0, 200),
                    }}
                  />
                  {update.description.length > 200 && (
                    <button
                      className="text-primary bg-white border-0 fs-4"
                      onClick={() => handleViewMoreClick(update.id)}
                    >
                      {showDescription[update.id] ? (
                        <BsArrowUp
                          className=" fs-3 bg-primary rounded-1 text-dark"
                          id="arowup"
                        />
                      ) : (
                        "View More..."
                      )}
                    </button>
                  )}
                  <div>

                    {showDescription[update.id] && (
                      <div>

                        <Comments rid={update.id} />
                      </div>
                    )}
                  </div>
                </div>
                {update.tag && (
                  <p>
                    <strong>Tags:</strong> {update.tag}
                  </p>
                )}
                {update.image && (
                  <img
                    src={update.image}
                    className="img-fluid"
                    alt="Technology Update"
                    style={{ width: "20%" }}
                  />
                )}

                <div className="updetfrm">
                  <h5 className="m-3">Update from </h5>
                  <img src={update.images} alt="profile" className="getedimg " />
                  <p className="fs-4 ">{update.names}</p>
                </div>
              </li>
            ))

            : updates.map((update) => {
              const rid = update.id
              return (
                <li key={update.id} className="list-group-item m-2 border-2 ">
                  <h2 className="m-3">{update.category}</h2>
                  <div className=" updetfrm  ">
                    <h5 className="m-2">Update from </h5>
                    <img
                      src={update.images}
                      alt="profilee"
                      className="getedimg m-2"
                    ></img>
                    <p className="fs-4 ">{update.names}</p>
                  </div>
                  <div>
                    <div className="discription"
                      dangerouslySetInnerHTML={{
                        __html: showDescription[update.id]
                          ? update.description
                          : update.description?.slice(0, 200),
                      }}
                    />
                    {update.description?.length > 200 && (
                      <button
                        className="text-primary bg-white border-0 fs-4"
                        onClick={() => handleViewMoreClick(update.id)}
                      >
                        {showDescription[update.id] ? (
                          <BsArrowUp
                            className=" fs-3 bg-primary rounded-1 text-dark"
                            id="arowup"
                          />
                        ) : (
                          "View More..."
                        )}
                      </button>
                    )}
                  </div>
                  {update.tag && (
                    <p>
                      <strong>Tags:</strong> {update.tag}

                    </p>
                  )}
                  {update.image && (
                    <img
                      src={update.image}
                      className="img-fluid"
                      alt="Technology Update"
                      style={{ width: "20%" }}
                    />
                  )}
                  <div>
                    {showDescription[update.id] && (
                      <div>

                        <Comments rid={rid} />
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  );
};
export default TechnologyUpdates;
