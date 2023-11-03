import './todoList.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getProjects} from "../redux/actions";
import {TaskList} from "./taskList";

export const MyDay = () => {
    const data = useSelector((state) => {
        return state.projects;
    });

    const dispatch = useDispatch();
    const projects = data.projects;
    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const todayTasks = [];
    const today = new Date();
    for (let i = 0; i < projects.length; ++i) {
        for (let j = 0; j < projects[i].tasks.length; ++j) {
            const task = projects[i].tasks[j];
            if (task.deadline.getDay() === today.getDay() && task.deadline.getMonth() === today.getMonth()
                && task.deadline.getFullYear() === today.getFullYear()) todayTasks.push({task:task,projectIndex:i});
        }
    }
    return <div>
        <TaskList taskList={todayTasks} header={'My Day'}/>
    </div>
}