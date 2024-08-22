import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ToDo = ({ toDo, markDone, setUpdateData, deleteTask, updateTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDetails, setEditedDetails] = useState('');

  const handleEditTask = (taskId) => {
    updateTask(taskId, { title: editedTitle, details: editedDetails });
    setEditingTaskId(null);
  };

  return (
    <>
      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          const createdAt = new Date(task.createdAt).toLocaleString();

          return (
            <React.Fragment key={task.id}>
              <div className="col taskBg">
                <div className={task.status ? 'done' : ''}>
                  <span className="taskNumber">{index + 1}</span>
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      placeholder="Edit task title..."
                      style={{ color: '#000', backgroundColor: '#fff', margin: '10px 0', width: '100%' }}
                    />
                  ) : (
                    <span className="taskText">{task.title}</span>
                  )}
                  <span className="taskTime" style={{ marginLeft: '10px' }}>{createdAt}</span> {/* Added margin-left */}
                  <span className={`taskPriority ${task.priority}`}>{task.priority}</span>
                </div>
                <div className="iconsWrap">
                  <span title="Completed / Not Completed" onClick={() => markDone(task.id)}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                  <span title="Edit" onClick={() => {
                    setEditingTaskId(task.id);
                    setEditedTitle(task.title);
                    setEditedDetails(task.details || '');
                  }}>
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                  <span title="Delete" onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
                <div className="detailsSection" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  <p><strong>Details:</strong> {task.details || 'No details provided.'}</p>
                  {editingTaskId === task.id && (
                    <>
                      <textarea
                        value={editedDetails}
                        onChange={(e) => setEditedDetails(e.target.value)}
                        rows={3}
                        placeholder="Edit task details..."
                        style={{ color: '#000', backgroundColor: '#fff', margin: '10px 0', width: '100%' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button
                          onClick={() => handleEditTask(task.id)}
                          style={{ backgroundColor: 'blue', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px' }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTaskId(null)}
                          style={{ backgroundColor: 'red', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })
      }
    </>
  );
}

export default ToDo;
