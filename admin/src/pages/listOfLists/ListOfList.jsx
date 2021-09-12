import "./listOfList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteListsCall, getListsCall } from "../../context/listContext/ListApiCalls";

const ListOfList = () => {
  const { lists, dispatch } = useContext(ListContext);

  useEffect( () => {
    getListsCall(dispatch);
  },[ dispatch ])
  
  const handleDelete = (id) => {
   deleteListsCall(id, dispatch);
  };

  // console.log(movies)

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "title", headerName: "title", width: 220 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname:"/list/" + params.row._id,list:params.row }}>
              <button className="movieListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="movieListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="movieList">
  {    <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={ row => row._id}
      />}
    </div>
  );
};

export default ListOfList;
