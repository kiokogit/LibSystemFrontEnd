import { IconButton } from "@material-ui/core";
import { Menu } from '@material-ui/icons'
import { AppBar, Button} from "@mui/material";
import { Link } from "react-router-dom";

export const Header = () => {

    return (
        <div>
            <AppBar style={{ padding: 10, width: '100%', color: 'black', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div class="dropdown">
                        <IconButton class="dropbtn">
                            <Menu />
                            </IconButton>
                            <div class="dropdown-content">
                                <button>Explore Library</button>
                                <button>Login</button>
                                <button>SignUp</button>
                                <button>Admin</button>
                            </div>
                            </div>
                        <Button variant='text' component={Link} to='/'>
                            Home
                        </Button>
                    </div>
                    <div>
                        <Button variant='outlined' component={Link} to='/loginPage' >
                            User Portal
                        </Button>
                        <Button variant='text' style={{ margin: '5px', fontSize: '0.7rem' }} component={Link} to='/adminLogin'>
                            Admin Portal
                        </Button>
                    </div>
                </div>
            </AppBar>
        </div>
    );
};
