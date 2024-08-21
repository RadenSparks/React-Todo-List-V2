const UpdateForm = ({ updateData, changeHolder, updateTask, cancelUpdate }) => {
  return (
    <>
      <div className="row align-items-center"> {/* Align items vertically in the center */}
        <div className="col">
          {/* Input field for updating the task title */}
          <input 
            value={updateData && updateData.title} // Binds the input value to updateData.title if updateData exists
            onChange={(e) => changeHolder(e)} // Calls changeHolder function to update the input value on change
            className="form-control form-control-lg" // Applies Bootstrap styling
          />
        </div>
        <div className="col-auto">
          {/* Dropdown for selecting task priority */}
          <select className="form-select form-select-lg" onChange={(e) => changeHolder(e)} value={updateData.priority}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="col-auto">
          {/* Button to save the updated task */}
          <button
            onClick={updateTask} // Calls updateTask function when clicked
            className="btn btn-lg btn-success mr-2" // Applies Bootstrap styling and margin
          >Update</button>
          {/* Button to cancel the update action */}
          <button
            onClick={cancelUpdate} // Calls cancelUpdate function when clicked
            className="btn btn-lg btn-warning" // Applies Bootstrap styling for a warning button
          >Cancel</button>
        </div>
      </div>
      <br />  
    </>
  );
}

export default UpdateForm; // Exports the UpdateForm component for use in other parts of the application
