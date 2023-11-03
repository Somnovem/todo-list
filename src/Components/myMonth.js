import './todoList.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getProjects} from "../redux/actions";
import {TaskList} from "./taskList";

export const MyMonth = () => {
    const data = useSelector((state) => {
        return state.projects;
    });

    const dispatch = useDispatch();
    const projects = data.projects;
    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const monthTasks = [];
    const today = new Date();
    for (let i = 0; i < projects.length; ++i) {
        for (let j = 0; j < projects[i].tasks.length; ++j) {
            const task = projects[i].tasks[j];
            if (task.deadline.getMonth() === today.getMonth()
                && task.deadline.getFullYear() === today.getFullYear())monthTasks.push({task:task,projectIndex:i});
        }
    }
    return <TaskList taskList={monthTasks} header={'My Month'}/>
}