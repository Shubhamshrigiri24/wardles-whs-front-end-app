import { Grid,Paper, TextField, Button } from '@material-ui/core';
//import Question from './Assets/Question.svg';
//import Arrowright from './Assets/Arrowright.svg';

function HomeAddressmanual(){ 

    const paperStyle={padding :20, width:340, margin:"10px auto", background: "#F7FBFF"};


    return(
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid align='left'>
                    <h2 style={{fontSize: 28, margin:0}}>Enter your home address</h2>
                </Grid>

                    <p style={{fontSize: 18,marginBottom:15}}>Use the address registered with your prescriber.</p>

                <TextField size="small"
                    style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)", background:"white"}}
                    placeholder="Address line one" 
                    type="text"  variant="outlined" 
                    fullWidth
                    />
                
                <TextField size="small"
                    style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)", background:"white"}}
                    placeholder="Address line two" 
                    type="text"  variant="outlined" 
                    fullWidth
                    />

                <TextField size="small"
                    style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)", background:"white"}}
                    placeholder="City" 
                    type="text"  variant="outlined" 
                    fullWidth
                    />
                
                <TextField size="small"
                    style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)", background:"white"}}
                    placeholder="Postcode" 
                    type="text"  variant="outlined" 
                    fullWidth
                    />

                <Button variant="contained" size="Large" disableElevation style={{background: "#FFCD00",color:"#07283C", marginBottom:"17px", fontSize:"18px", textTransform: "none"}} fullWidth type="submit" >Next</Button>

                <Button variant="contained" size="Large" disableElevation style={{background: "#E8F8FF",color:"#0066BE",borderRadius: '6px', fontSize:"18px", textTransform: "none", display:"flex", justifyContent:"space-between"}} fullWidth type="submit" >
                      <div style={{display:"flex", justifyContent:"flex-start", margin:0,padding:0}}>
                        {/* <img src={Question} alt="error" /> */}
                        <p style={{margin:0,padding:0, marginLeft:10, fontSize:16}}>Who is my prescriber?</p>
                      </div>
                      {/* <img src={Arrowright} alt="error" /> */}
                </Button>
    


            </Paper>
        </Grid>
    )
}

export default HomeAddressmanual;