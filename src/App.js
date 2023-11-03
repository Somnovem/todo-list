import './App.css';
import {ToDoList} from "./Components/toDoList";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {RootLayout} from "./Routing/RootLayout";
import {FavouritesList} from "./Components/favouritesList";
import {MyDay} from "./Components/myDay";
import {MyWeek} from "./Components/myWeek";
import {MyMonth} from "./Components/myMonth";
import {ManageProjects} from "./Components/manageProjects";
import {Search} from "./Components/Search";
const router = createBrowserRouter([
    {
        path:'/',
        element:<RootLayout/>,
        children:
            [
                {path:'/',element:<ToDoList/>},
                {path:'/projects',element:<ManageProjects/>},
                {path:'/favourite',element:<FavouritesList/>},
                {path:'/myday',element:<MyDay/>},
                {path:'/myweek',element:<MyWeek/>},
                {path:'/mymonth',element:<MyMonth/>},
                {path:'/search',element:<Search/>},
            ]
    }
]);

function App() {
    return <RouterProvider router={router} style={{margin:'0',padding:'0'}}/>
}

export default App;
