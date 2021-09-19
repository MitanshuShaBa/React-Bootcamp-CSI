import {AppBar, Toolbar, Typography} from "@material-ui/core"
import "./Header.css"

const Header = () => {
    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant='h6' className="title">CSI Todo List</Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
