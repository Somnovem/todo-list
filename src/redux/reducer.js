import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

const loadProjectsFromCookies = () => {
    const savedProjects = Cookies.get('projectsToDo2');
    if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects);
        for (let i = 0; i < parsedProjects.length; ++i){
            for (let j = 0; j < parsedProjects[i].tasks.length; ++j){
                let temp = parsedProjects[i].tasks[j].deadline;
                parsedProjects[i].tasks[j] = {...parsedProjects[i].tasks[j],deadline:new Date(temp) };
            }
        }
        projects = parsedProjects;
        return projects;
    }
    return [];
};

const saveProjectsToCookies = () => {
    Cookies.set('projectsToDo2', JSON.stringify(projects), { expires: 7 }); // Expires in 7 days
};

let projects = [];

const defaultState ={
    projects: loadProjectsFromCookies()
};

export const reducer  = (state = defaultState,action) => {
    switch (action.type) {
        case 'GET_PROJECTS':
            return {...state};
        case 'CHANGE_TASK_COMPLETED':
            const {projectIndex,taskId} = action.payload;
            const index = projects[projectIndex].tasks.indexOf(projects[projectIndex].tasks.find(task => task.id === taskId));
            projects[projectIndex].tasks[index].done = !projects[projectIndex].tasks[index].done;
            saveProjectsToCookies();
            return {...state, projects:projects};
        case 'CHANGE_TASK_FAVOURITE':
            const projectFavouriteIndex = action.payload.projectIndex;
            const taskFavouriteId = action.payload.taskId;
            const indexFavourite = projects[projectFavouriteIndex].tasks.indexOf(projects[projectFavouriteIndex].tasks.find(task => task.id === taskFavouriteId));
            projects[projectFavouriteIndex].tasks[indexFavourite].favourited = !projects[projectFavouriteIndex].tasks[indexFavourite].favourited;
            saveProjectsToCookies();
            return {...state, projects:projects};
        case 'ADD_TASK':
            const projectIndexAdd = action.payload.projectIndex;
            const taskNameAdd = action.payload.taskName;
            const newTask = {
                id:uuidv4(),
                name: taskNameAdd,
                deadline: new Date(),
                description: '',
                tags: [],
                priority: 1,
                done:false,
                favourited:false
            }
            projects[projectIndexAdd].tasks.push(newTask);
            saveProjectsToCookies();
            return {...state, projects:projects};
        case 'CHANGE_PROJECT':
            const indexProjectChange = projects.indexOf(projects.find(project => project.id === action.payload.project.id))
            projects[indexProjectChange].name = action.payload.project.name;
            saveProjectsToCookies();
            return {...state, projects:projects};
        case 'DELETE_TASK':
            const projectIndexDelete = action.payload.projectIndex;
            const taskIdDelete = action.payload.taskId;
            const indexDelete = projects[projectIndexDelete].tasks.indexOf(projects[projectIndexDelete].tasks.find(task => task.id === taskIdDelete));
            let res = [];
            for (let i = 0; i < projects[projectIndexDelete].tasks.length;++i){
                if (i !== indexDelete) res.push(projects[projectIndexDelete].tasks[i]);
            }
            projects[projectIndexDelete].tasks = res;
            saveProjectsToCookies();
            return {...state, projects:projects};
        case 'ADD_PROJECT':
            projects.push({
                id:uuidv4(),
                name:action.payload.projectName,
                tasks: []
            });
            saveProjectsToCookies();
            return {...state, projects:projects};
        case 'CHANGE_TASK':
            const projectChangeIndex = action.payload.projectIndex;
            const taskChange = action.payload.task;
            const indexChange = projects[projectChangeIndex].tasks.indexOf(projects[projectChangeIndex].tasks.find(task => task.id === taskChange.id));
            projects[projectChangeIndex].tasks[indexChange] = taskChange;
            saveProjectsToCookies();
            return {...state, projects:projects};
        case 'DELETE_PROJECT':
            let resProjects = [];
            for (let i = 0; i < projects.length; ++i){
                if(projects[i].id !== action.payload.projectId) resProjects.push(projects[i]);
            }
            projects = resProjects;
            saveProjectsToCookies();
            return {...state, projects:projects};
        default:
            return state;
    }
}