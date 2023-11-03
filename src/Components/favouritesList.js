import './todoList.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MainNavigation} from "../Routing/MainNavigation";

import './todoList.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {changeTaskCompleted, changeTaskFavourite, getProjects} from "../redux/actions";
import {faStar} from "@fortawesome/free-solid-svg-icons";

export const FavouritesList = () => {
    const data = useSelector((state) => {
        return state.projects;
    });

    const dispatch = useDispatch();
    const projects = data.projects;
    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);
    const importantDoneTasks = [];
    const importantNotDoneTasks = [];
    for (let i = 0; i < projects.length; ++i) {
        for (let j = 0; j < projects[i].tasks.length; ++j) {
            if (projects[i].tasks[j].favourited){
                if (projects[i].tasks[j].done) importantDoneTasks.push({task:projects[i].tasks[j],projectIndex:i});
                else importantNotDoneTasks.push({task:projects[i].tasks[j],projectIndex:i});
            }
        }
    }

    const handleTaskCompletion = (event, projectIndex, taskId) => {
        event.stopPropagation();
        dispatch(changeTaskCompleted(projectIndex,taskId));
    }

    const handleTaskFavourite = (event, projectIndex, taskId) => {
        event.stopPropagation();
        dispatch(changeTaskFavourite(projectIndex,taskId));
    }

    return (
        <div className='container row' id='wrapper'>
            <div className='col-2' id='projects-bar'>
                <MainNavigation/>
            </div>
            <div className='col-10'>
                <h2 className='task-list-header'>Important Tasks</h2>
                <div id='task-list'>
                    <div >
                        {
                            importantNotDoneTasks.map(item => (
                                <button className='container row task-item' key={item.task.id}>
                                    <div className='col-1' style={{paddingLeft:'24px'}}>
                                        <button className='button-check' onClick={(e) => {handleTaskCompletion(e,item.projectIndex,item.task.id)}}>

                                        </button>
                                    </div>
                                    <div className='col-10'>
                                        {item.task.name.length < 84 ? item.task.name : item.task.name.slice(0,81)+'...'}
                                    </div>
                                    <div className='col-1'>
                                        <button className='button-favourited' onClick={e => {handleTaskFavourite(e,item.projectIndex,item.task.id)}}>
                                            <FontAwesomeIcon icon={faStar}/>
                                        </button>
                                    </div>
                                </button>
                            ))
                        }
                        {
                            importantDoneTasks.length !== 0 && <div>
                                <div id='completed-tasks-header'>
                                    <hr/>
                                    <p>Completed Tasks</p>
                                </div>
                                {
                                    importantDoneTasks.map(item => (
                                        <button className='container row task-item checked' key={item.task.id}>
                                            <div className='col-1' style={{paddingLeft:'24px'}}>
                                                <button className='button-checked' onClick={(e) => {handleTaskCompletion(e,item.projectIndex,item.task.id)}}>

                                                </button>
                                            </div>
                                            <div className='col-9'>
                                                {item.task.name.length < 84 ? item.task.name : item.task.name.slice(0,81)+'...'}
                                            </div>
                                            <div className='col-1'>
                                                <button className='button-favourited' onClick={e => {handleTaskFavourite(e,item.projectIndex,item.task.id)}}>
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
            </div>
        </div>
    )
}