import { IconButton } from "@material-ui/core";
import { Menu } from '@material-ui/icons'
import { AppBar, Card, Button} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {

    const [toggleMenu, setToggleMenu] = useState(false)

    return (
        <div>
            <AppBar style={ { padding: 10, width: '100%', color: 'black', backgroundColor:'inherit' } }>
                <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }>
                    <div>
                    <IconButton onClick={ (e) => setToggleMenu(!toggleMenu) }>
                        <Menu />
                    </IconButton>
                    <Button variant='text' component={ Link } to='/'>
                        Home
                        </Button>
                        </div>
                    <div>
                        <Button variant='outlined' component={ Link } to='/loginPage' >
                            User Portal
                        </Button>
                        <Button variant='text' style={{margin:'5px', fontSize:'0.7rem'}} component={ Link } to='/adminLogin'>
                            Admin Portal
                        </Button>
                    </div>
                </div>
            { !toggleMenu ? null : (<Card style={ { position: 'relative', marginTop: '0px', float: 'left', width:'max-content' } }>
                <ul>
                    <li>
                        Home
                    </li>
                    <li>
                        About
                    </li>
                    <hr />
                    <li>
                        Services
                    </li>
                    <li>
                        Home
                    </li>
                    <li>
                        About
                    </li>
                    <hr />
                    <li>
                        Services
                    </li>
                </ul>
            </Card>) }
            </AppBar>
        </div>
    );
};
