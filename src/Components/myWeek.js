import './todoList.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getProjects} from "../redux/actions";
import {TaskList} from "./taskList";

export const MyWeek = () => {
    const data = useSelector((state) => {
        return state.projects;
    });

    const dispatch = useDispatch();
    const projects = data.projects;
    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const weekTasks = [];
    const today = new Date();
    for (let i = 0; i < projects.length; ++i) {
        for (let j = 0; j < projects[i].tasks.length; ++j) {
            const task = projects[i].tasks[j];
            const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
            const firstDay = new Date(task.deadline.getFullYear(), task.deadline.getMonth(), task.deadline.getDate() - task.deadline.getDay());
            const lastDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
            if (Math.abs((firstDay - lastDay) / oneDay) < 7) weekTasks.push({task:task,projectIndex:i});
        }
    }
    return <TaskList taskList={weekTasks} header={'My Week'}/>
}