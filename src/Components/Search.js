import {changeTaskCompleted, changeTaskFavourite, getProjects} from "../redux/actions";
import {MainNavigation} from "../Routing/MainNavigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faStar} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import './todoList.css'
import './search.css'
import {useEffect, useState} from "react";

export const Search = () => {
    const data = useSelector((state) => {
        return state.projects;
    });

    const dispatch = useDispatch();
    const projects = data.projects;

    const [searchName, setSearchName] = useState('');
    const [searchDescr, setSearchDescr] = useState('');
    const [searchTags, setSearchTags] = useState('');
    const [searchPriority, setSearchPriority] = useState(0);



    const [tasksDone, setTasksDone] = useState([]);
    const [tasksNotDone, setTasksNotDone] = useState([]);

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const performSearch = () => {
        const res = [];
        for (let i = 0; i < projects.length; ++i) {
            const project = projects[i];
            for (let j = 0; j < project.tasks.length; ++j) {
                const task = project.tasks[j];
                let nameAligned = 0;
                let descrAligned = 0;
                let tagsAligned = 0;
                let priorityAligned = 0;
                if (searchName.trim() !== ''){
                    nameAligned = searchName.trim() === task.name ? 1 : 2;
                }
                if (searchDescr.trim() !== '') {
                    let searchWords = searchDescr.split(' ');
                    let taskDescrWords = task.description.split(' ')
                    for (let m = 0; m < searchWords.length; ++m){
                        if (m in taskDescrWords){
                            descrAligned = 1;
                            break;
                        }
                    }
                    if (descrAligned === 0) descrAligned = 2;
                }
                if (searchTags.trim() !== '') {
                    let searchTagsArr = searchTags.split(' ');
                    for (let m = 0; m < task.tags.length; ++m) {
                        if (m in  task.tags) {
                            tagsAligned = 1;
                            break;
                        }
                    }
                    if (tagsAligned === 0) tagsAligned = 2;
                }
                if (priorityAligned !== 0) priorityAligned = searchPriority === task.priority ? 1 : 2;
                if (    nameAligned !== 2 && descrAligned !== 2 &&
                        tagsAligned !== 2 && priorityAligned !== 2  ) {
                    res.push({projectIndex: i, task:task});
                }
            }
        }
        let tempTasksDone = [];
        let tempTasksNotDone = [];
        for (let i = 0; i < res.length; ++i){
            if (res[i].task.done)tempTasksDone.push(res[i]);
            else tempTasksNotDone.push(res[i]);
        }
        setTasksDone(tempTasksDone);
        setTasksNotDone(tempTasksNotDone);
    }

    const handleTaskCompletion = (event, projectIndex, taskId) => {
        event.stopPropagation();
        dispatch(changeTaskCompleted(projectIndex,taskId));
        performSearch();
    }

    const handleTaskFavourite = (event, projectIndex, taskId) => {
        event.stopPropagation();
        dispatch(changeTaskFavourite(projectIndex,taskId));
        performSearch();
    }

    const handleChangePriority = (value) => {
        if (value < 0 || value > 5) return;
        setSearchPriority(value)
    }

    return (
        <div className='container row' id='wrapper'>
            <div className='col-2' id='projects-bar'>
                <MainNavigation/>
            </div>
            <div className='col-10'>
                <div id='search-container'>
                    <div className='container row' id='search-inputs'>
                        <div className="col-3">
                            Name:
                            <input type="text" value={searchName} onChange={(event) => {setSearchName(event.target.value)}}/>
                        </div>
                        <div className="col-3">
                            Description:
                            <input type="text" value={searchDescr} onChange={(event) => {setSearchDescr(event.target.value)}}/>
                        </div>
                        <div className="col-3">
                            Tags:
                            <input type="text" value={searchTags} onChange={(event) => {setSearchTags(event.target.value)}}/>
                        </div>
                        <div className="col-3">
                            Priority:
                            <input type="number" value={searchPriority} onChange={(event) => {handleChangePriority(event.target.value)}}/>
                        </div>
                    </div>
                    <div id='search-button-container'>
                        <button id='search-button' onClick={performSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </div>
                </div>
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