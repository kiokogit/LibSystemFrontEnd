import { IconButton } from "@material-ui/core";
import { Menu } from '@material-ui/icons'
import { AppBar, Typography, Card} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {

    const [toggleMenu, setToggleMenu] = useState(false)

    return (
        <div>
        <AppBar style={{ padding: 10, width: '100%', backgroundColor: 'inherit', color:'black' }}>
            <Typography>
            ES LIBRARIES LTD
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <IconButton onClick={(e)=>setToggleMenu(!toggleMenu)}>
                    <Menu aria-haspopup="true"/>
                </IconButton>
                <Link to='/'>
                    Home
                </Link>
                <Link to='/book/new'>
                    About
                </Link>
                <Link to='/loginPage' >
                    User Portal
                </Link>
                <Link to='/signupPage' >
                    Register
                </Link>
                <Link to='/adminLogin'>
                    Admin Portal
                </Link>
            </div>
            </AppBar>
            {!toggleMenu ? null:( <Card style={{display:'inherit', marginTop:'0px', float:'left'}}>
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
