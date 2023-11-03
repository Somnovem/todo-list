import {useDispatch, useSelector} from "react-redux";
import {changeTaskCompleted, changeTaskFavourite, getProjects,deleteTask,addTask,changeTask} from "../redux/actions";
import {useEffect, useState} from "react";
import { faBars,faStar,faPlus,faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import './todoList.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MainNavigation} from "../Routing/MainNavigation";

export const ToDoList = () => {
    const data = useSelector((state) => {
        return state.projects;
    });

    const dispatch = useDispatch();
    const projects = data.projects;
    const priorityColors = ['','mediumaquamarine','limegreen','green','orange','tomato'];
    const deadlineRegex = /^[0-3]\d.[0,1]\d.\d{4}, [0-2]\d:[0-5]\d:[0-5]\d$/;

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const [selectedProjectIndex,setSelectedProjectIndex] = useState(null);
    const [selectedTask,setSelectedTask] = useState(null);
    const [newTaskName,setNewTaskName] = useState('');
    const [changingTaskName,setChangingTaskName] = useState('');
    const [changingTaskDesc,setChangingTaskDesc] = useState('');
    const [changingTaskTag,setChangingTaskTag] = useState('');
    const [changingTaskDeadline,setChangingTaskDeadline] = useState('');
    const [changingTaskPriority,setChangingTaskPriority] = useState(1);

    const handleSelectTask = (task) => {
        if (selectedTask !== null &&  selectedTask.id === task.id) {
            setSelectedTask(null);
        }
        else {
            setSelectedTask(task);
            setChangingTaskName(task.name);
            setChangingTaskDesc(task.description);
            setChangingTaskPriority(task.priority);
        }
    }

    const handleSelectProjectIndex = (projectIndex = 0) => {
        setSelectedTask(null);
        setSelectedProjectIndex(selectedProjectIndex === projectIndex ? null : projectIndex);
    }

    const handleTaskCompletion = (event, taskId) => {
        event.stopPropagation();
        dispatch(changeTaskCompleted(selectedProjectIndex,taskId));
    }

    const handleTaskFavourite = (event,taskId) => {
        event.stopPropagation();
        dispatch(changeTaskFavourite(selectedProjectIndex,taskId));
    }

    const isFavourited = (taskId) => {
        return projects[selectedProjectIndex].tasks.find(task => task.id === taskId && task.favourited) !== undefined;
    }

    const handleDeleteTask = (taskId) => {
        if(!window.confirm('Do you really want to delete this task?')) return;
        setSelectedTask(null);
        dispatch(deleteTask(selectedProjectIndex,taskId));
    }

    const handleAddTask = () => {
        if (newTaskName.trim() === '') return;
        const taskName = newTaskName;
        setNewTaskName('');
        dispatch(addTask(selectedProjectIndex,taskName));
    }

    const handleChangeTaskName = () => {
        let changedTask = {...selectedTask,name:changingTaskName};
        dispatch(changeTask(selectedProjectIndex,changedTask));
    }

    const handleChangeTaskDesc = () => {
        let changedTask = {...selectedTask,description:changingTaskDesc};
        dispatch(changeTask(selectedProjectIndex,changedTask));
    }

    const handleChangeTaskPriority = () => {
        let changedTask = {...selectedTask,priority:changingTaskPriority};
        dispatch(changeTask(selectedProjectIndex,changedTask));
    }

    const handleChangePriority = (event) => {
        if (event.target.value < 1 || event.target.value > 5) return;
        setChangingTaskPriority(event.target.value);
    }

    const handleDeleteTag = (tagIndex) => {
        let changedTask = selectedTask;
        let res = [];
        for (let i = 0; i < selectedTask.tags.length;++i){
            if (i !== tagIndex) res.push(selectedTask.tags[i]);
        }
        changedTask.tags = res;
        dispatch(changeTask(selectedProjectIndex,changedTask));
    }

    const handleAddTag = () => {
        if(changingTaskTag.trim() === '') return;
        let changedTask = selectedTask;
        changedTask.tags.push(changingTaskTag);
        dispatch(changeTask(selectedProjectIndex, changedTask));
        setChangingTaskTag('');
    }

    const handleChangeDeadline = () => {
        if (deadlineRegex.test(changingTaskDeadline)){
            dispatch(changeTask(selectedProjectIndex, {...selectedTask,deadline: new Date(Date.parse(changingTaskDeadline))}));
            setChangingTaskDeadline('');
        }
    }

    return (
        <div className='container row' id='wrapper'>
            <div className='col-2' id='projects-bar'>
                <MainNavigation/>
                {
                    projects !== undefined && projects !== null && (
                        projects.map((item,index) => (
                            <button className='project-item' key={index} onClick={() => {handleSelectProjectIndex(index)}}>
                                <FontAwesomeIcon icon={faBars}/><span>{item.name}</span>
                            </button>
                        ))
                    )
                }
            </div>
            <div className={selectedTask === null ? 'col-10' : 'col-7'} id='task-bar'>
                <div id='task-list'>
                    {
                        selectedProjectIndex !== null && <div>
                            <div id='project-name'>
                                <p>{projects[selectedProjectIndex].name}</p>
                            </div>
                            <div >
                                {
                                    projects[selectedProjectIndex].tasks.filter(task => !task.done).map(item => (
                                        <button className='container row task-item' key={item.id} onClick={() => {handleSelectTask(item)}}>
                                            <div className='col-1' style={{paddingLeft:'24px'}}>
                                                <button className='button-check' onClick={(e) => {handleTaskCompletion(e,item.id)}}>

                                                </button>
                                            </div>
                                            <div className='col-10'>
                                                {item.name.length < 84 ? item.name : item.name.slice(0,81)+'...'}
                                            </div>
                                            <div className='col-1'>
                                               <button className={isFavourited(item.id) ? 'button-favourited' : 'button-important'} onClick={e => {handleTaskFavourite(e,item.id)}}>
                                                   <FontAwesomeIcon icon={faStar}/>
                                               </button>
                                            </div>
                                        </button>
                                    ))
                                }
                                {
                                    projects[selectedProjectIndex].tasks.filter(task => task.done).length !== 0 && <div>
                                        <div id='completed-tasks-header'>
                                            <hr/>
                                            <p>Completed Tasks</p>
                                        </div>
                                        {
                                            projects[selectedProjectIndex].tasks.filter(task => task.done).map(item => (
                                                <button className='container row task-item checked' key={item.id} onClick={() => {handleSelectTask(item)}}>
                                                    <div className='col-1' style={{paddingLeft:'24px'}}>
                                                        <button className='button-checked' onClick={(e) => {handleTaskCompletion(e,item.id)}}>

                                                        </button>
                                                    </div>
                                                    <div className='col-9'>
                                                        {item.name.length < 84 ? item.name : item.name.slice(0,81)+'...'}
                                                    </div>
                                                    <div className='col-1'>
                                                        <button className={isFavourited(item.id) ? 'button-favourited' : 'button-important'} onClick={e => {handleTaskFavourite(e,item.id)}}>
                                                            <FontAwesomeIcon icon={faStar}/>
                                                        </button>
                                                    </div>
                                                </button>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>

                <div className='filler'/>
                {selectedProjectIndex !== null && <div className='container row' id='task-input'>
                    <div className='col-11'>
                        <textarea value={newTaskName} onChange={(event) => {setNewTaskName(event.target.value)}}/>
                    </div>
                    <div className='col-1 d-flex justify-content-center align-content-center'>
                        <button id='btn-add-task' onClick={handleAddTask}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </div>
                </div>}
                <div className='filler'/>
            </div>
            <div className='col-3' id='info-bar' style={{display: selectedTask === null ? 'none' : 'block'}}>
                {
                    selectedTask !== null && (
                        <div id='info-container'>
                            <div className='info-item'>
                                <textarea value={changingTaskName} onChange={(event) => setChangingTaskName(event.target.value)}
                                onBlur={handleChangeTaskName}/>
                            </div>
                            <div className='info-item'>
                                <h6>Due to: {selectedTask.deadline.toLocaleString()}</h6>
                            </div>
                            <h6>Change deadline: </h6>
                            <div className='container row tag-item' id='tag-add-container'>
                                <div className='col-10'>
                                    <input value={changingTaskDeadline} onChange={(event) => {setChangingTaskDeadline(event.target.value)}}/>
                                </div>
                                <div className='col-1 d-flex justify-content-center align-content-center'>
                                    <button id='btn-add-task' onClick={handleChangeDeadline}>
                                        <FontAwesomeIcon icon={faCalendarAlt}/>
                                    </button>
                                </div>
                            </div>
                            <h6>Description: </h6>
                            <div className='info-item'>
                                <textarea value={changingTaskDesc} onChange={(event) => setChangingTaskDesc(event.target.value)}
                                          onBlur={handleChangeTaskDesc}/>
                            </div>
                            <div className='info-item priority-item' style={{background:priorityColors[selectedTask.priority]}}>
                                <h6>Priority: <input type='number' value={changingTaskPriority} onChange={(event) => handleChangePriority(event)}
                                                     onBlur={handleChangeTaskPriority}/></h6>
                            </div>
                            {selectedTask.tags.length !== 0 && <div>
                                <hr/>
                                <div className='tag-container'>
                                    {
                                        selectedTask.tags.map((tag,index) => (
                                            <button key={index} className='tag-item' onClick={_ => {handleDeleteTag(index)}}>
                                                {tag}
                                            </button>
                                        ))
                                    }
                                </div>
                                <hr/>
                            </div>}
                            <h6>Add tag:</h6>
                            <div className='container row tag-item' id='tag-add-container'>
                                <div className='col-10'>
                                    <input value={changingTaskTag} onChange={(event) => {setChangingTaskTag(event.target.value)}}/>
                                </div>
                                <div className='col-1 d-flex justify-content-center align-content-center'>
                                    <button id='btn-add-task' onClick={handleAddTag}>
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                </div>
                            </div>
                            <button className='btn btn-danger' style={{marginTop:'15px',marginLeft:'5px'}} onClick={() => {handleDeleteTask(selectedTask.id)}}>Delete task</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}