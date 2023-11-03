import {changeTaskCompleted, changeTaskFavourite} from "../redux/actions";
import {MainNavigation} from "../Routing/MainNavigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import './todoList.css'
export const TaskList = (props) => {

    const dispatch = useDispatch();

    let tasksDone = [];
    let tasksNotDone = [];
    for (let i = 0; i < props.taskList.length; ++i){
        const temp = props.taskList[i];
        if(temp.task.done) tasksDone.push(temp);
        else tasksNotDone.push(temp);
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
                <h2 className='task-list-header'>{props.header}</h2>
                <div id='task-list'>
                    <div >
                        {
                            tasksNotDone.map(item => (
                                <button className='container row task-item' key={item.task.id}>
                                    <div className='col-1' style={{paddingLeft:'24px'}}>
                                        <button className='button-check' onClick={(e) => {handleTaskCompletion(e,item.projectIndex,item.task.id)}}>

                                        </button>
                                    </div>
                                    <div className='col-10'>
                                        {item.task.name.length < 84 ? item.task.name : item.task.name.slice(0,81)+'...'}
                                    </div>
                                    <div className='col-1'>
                                        <button className={item.task.favourited ? 'button-favourited' : 'button-important'} onClick={e => {handleTaskFavourite(e,item.projectIndex,item.task.id)}}>
                                            <FontAwesomeIcon icon={faStar}/>
                                        </button>
                                    </div>
                                </button>
                            ))
                        }
                        {
                            tasksDone.length !== 0 && <div>
                                <div id='completed-tasks-header'>
                                    <hr/>
                                    <p>Completed Tasks</p>
                                </div>
                                {
                                    tasksDone.map(item => (
                                        <button className='container row task-item checked' key={item.task.id}>
                                            <div className='col-1' style={{paddingLeft:'24px'}}>
                                                <button className='button-checked' onClick={(e) => {handleTaskCompletion(e,item.projectIndex,item.task.id)}}>

                                                </button>
                                            </div>
                                            <div className='col-9'>
                                                {item.task.name.length < 84 ? item.task.name : item.task.name.slice(0,81)+'...'}
                                            </div>
                                            <div className='col-1'>
                                                <button className={item.task.favourited ? 'button-favourited' : 'button-important'} onClick={e => {handleTaskFavourite(e,item.projectIndex,item.task.id)}}>
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