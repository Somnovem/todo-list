import './todoList.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getProjects, changeProject, addProject, deleteProject} from "../redux/actions";
import {MainNavigation} from "../Routing/MainNavigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

export const ManageProjects = () => {
    const data = useSelector((state) => {
        return state.projects;
    });

    const dispatch = useDispatch();
    const projects = data.projects;
    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const [selectedProject,setSelectedProject] = useState(null);
    const [newProjectName,setNewProjectName] = useState('');
    const [changingProjectName,setChangingProjectName] = useState('');

    const handleSelectProject = (project) => {
        if (selectedProject && selectedProject.id === project.id) {
            setSelectedProject(null);
            setChangingProjectName('');
        }
        else {
            setSelectedProject(project);
            setChangingProjectName(project.name);
        }
    }

    const handleAddProject = () => {
        if(newProjectName.trim() === '') return;
        dispatch(addProject(newProjectName))
        setNewProjectName('');
    }

    const handleChangeProjectName = () => {
        let changedProject = {...selectedProject,name:changingProjectName};
        dispatch(changeProject(changedProject));
    }

    const handleDeleteProject = (event,projectId) => {
        event.stopPropagation();
        if (window.confirm('Do you really want to delete this project?')) dispatch(deleteProject(projectId));
    }

    return  (
        <div className='container row' id='wrapper'>
            <div className='col-2' id='projects-bar'>
                <MainNavigation/>
            </div>
            <div className={selectedProject === null ? 'col-10' : 'col-7'}>
                <div id='task-list'>
                    {
                        projects.map(project => (
                            <button className='container row task-item' onClick={() => {handleSelectProject(project)}}>
                                <div className='col-10'>
                                    <h6>{project.name}</h6>
                                </div>
                                <div className='col-2 d-flex justify-content-center align-items-center'>
                                    <button className='btn btn-danger' onClick={(event) => {handleDeleteProject(event,project.id)}}>
                                        Delete Project
                                    </button>
                                </div>
                            </button>
                        ))
                    }
                </div>
                <div className='filler'/>
                <div className='container row' id='task-input' style={{width:'80%',margin:'0 auto'}}>
                    <div className='col-11'>
                        <textarea value={newProjectName} onChange={(event) => {setNewProjectName(event.target.value)}}/>
                    </div>
                    <div className='col-1 d-flex justify-content-center align-content-center'>
                        <button id='btn-add-task' onClick={handleAddProject}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </div>
                </div>
                <div className='filler'/>
            </div>
            {selectedProject !== null && <div className='col-3'>
                <div id='info-container'>
                    <div className='info-item'>
                                <textarea value={changingProjectName} onChange={(event) => setChangingProjectName(event.target.value)}
                                          onBlur={handleChangeProjectName}/>
                    </div>
                </div>
            </div>}
        </div>
    )

}