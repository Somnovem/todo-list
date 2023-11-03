import {Outlet} from "react-router-dom";

export const RootLayout = () => {
    return (
        <div style={{margin:'0',padding:'0'}}>
            <Outlet />
        </div>
    );
}