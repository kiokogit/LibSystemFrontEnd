import { IconButton } from "@material-ui/core";
import { Menu } from '@material-ui/icons'
import { AppBar, Card, Button} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {

    const [toggleMenu, setToggleMenu] = useState(false)

    return (
        <div>
        <AppBar style={{ padding: 10, width: '100%', backgroundColor: 'inherit', color:'black' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <IconButton onClick={(e)=>setToggleMenu(!toggleMenu)}>
                    <Menu />
                </IconButton>
                <Button variant='text' component={Link}  to='/'>
                    Home
                </Button>
                <Button variant='text' component={Link}  to='/loginPage' >
                    Login/Register
                </Button>
                <Button variant='text' component={Link}  to='/adminLogin'>
                    admin
                </Button>
            </div>
            </AppBar>
            {!toggleMenu ? null:( <Card style={{display:'inherit',position:'static', marginTop:'0px', float:'left'}}>
            <ul>
                <li>
                    Home
                </li>
                <li>
                    About
                    </li>
                    <hr/>
                <li>
                    Services
                </li>
                <li>
                    Home
                </li>
                <li>
                    About
                    </li>
                    <hr/>
                <li>
                    Services
                </li>
            </ul>
        </Card>)}
            </div>
    );
};
