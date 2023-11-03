export const getProjects = () => {
    return (dispatch) => {
        dispatch({type:'GET_PROJECTS'});
    }
}

export const changeTaskCompleted = (projectIndex,taskId) => {
    return (dispatch) => {
        dispatch({type:'CHANGE_TASK_COMPLETED',payload:{projectIndex,taskId}});
    }
}

export const deleteTask = (projectIndex,taskId) => {
    return (dispatch) => {
        dispatch({type:'DELETE_TASK',payload:{projectIndex,taskId}});
    }
}

export const addTask = (projectIndex,taskName) => {
    return (dispatch) => {
        dispatch({type:'ADD_TASK',payload:{projectIndex,taskName}});
    }
}

export const changeTask = (projectIndex,task) => {
    return (dispatch) => {
        dispatch({type:'CHANGE_TASK',payload:{projectIndex,task}});
    }
}

export const addProject = (projectName) => {
    return (dispatch) => {
        dispatch({type:'ADD_PROJECT',payload:{projectName}});
    }
}

export const changeProject = (project) => {
    return (dispatch) => {
        dispatch({type:'CHANGE_PROJECT',payload:{project}});
    }
}

export const deleteProject = (projectId) => {
    return (dispatch) => {
        dispatch({type:'DELETE_PROJECT',payload:{projectId}});
    }
}

export const changeTaskFavourite = (projectIndex,taskId) => {
    return (dispatch) => {
        dispatch({type:'CHANGE_TASK_FAVOURITE',payload:{projectIndex,taskId}});
    }
}