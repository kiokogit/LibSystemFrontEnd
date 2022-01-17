//footer
import React from 'react';
import { Link, Container } from '@material-ui/core'

export function Footer() {
    //Dummy Links
    return (
        <Container style={{ backgroundColor: 'black', color: 'white', height: '150px', display:'flex', flexDirection:'row', justifyContent:'space-between', padding:'20px'}}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                Links
                <Link>For Librarians</Link>
                <Link>For Tutors</Link>
                <Link>About</Link>
                <Link>Home</Link>
                <Link>For Admin</Link>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
                External Links
                <Link>IMF Library</Link>
                <Link>JKUAT Library</Link>
                <Link>KNBS</Link>
                <Link>Ministry of Education</Link>
                <Link>CBC</Link>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
                Partners
                <Link>Safaricos</Link>
                <Link>Eissen-Jink</Link>
                <Link>KNBS</Link>
                <Link>Ministry of Education</Link>
                <Link>KICD</Link>
            </div>
            <div>
                <p>Created in 2021</p>
                <p>Copyright: {new Date().getFullYear()}</p>
            </div>
        </Container>
    );
};