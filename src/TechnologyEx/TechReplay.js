import React from "react";

export default function TechReplay() {
  return (
    <div className="">
      <div>
          <h3 className="text-center mt-5">Query From Users</h3>
        <table className="table table-bordered mt-3 w-75 mx-auto">
          <thead className=" table-dark border border-2 border-light  text-center  ">
            <tr className="">
              <th>ID</th>
              <th>Name </th>
              <th>Email</th>
              <th>Query</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center ">
            <tr>
              <td>ID</td>
              <td>Sharath</td>
              <td>sharath12@gmail.com</td>
              <td>hi</td>
              <td>Action</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
