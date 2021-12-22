//footer
import React from 'react';
import { Link, Container } from '@material-ui/core'

export function Footer() {
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
                External Links
                <Link>IMF Library</Link>
                <Link>JKUAT Library</Link>
                <Link>KNBS</Link>
                <Link>Ministry of Education</Link>
                <Link>CBC</Link>
            </div>
            <div>
                <p>This library prides itself of a phenominal legacy since its inception in 2003</p>
                <p>Copyright: &copy 2021</p>
            </div>
        </Container>
    );
};