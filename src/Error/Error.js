import { Grid,Paper} from '@material-ui/core';


function Errormessage() {

  const paperStyle={width:340,background: "#FFF0F0", height:80, marginBottom:"17px", paddingTop:10, paddingBottom:10}
  const parastyle={fontSize:14,fontStyle: "normal", fontWeight: 500, margin:0,marginLeft:25,marginRight:25, color: "#BB4035"}
  return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid>
                    <p style={parastyle}>Looks like you already have an account. Enter your password to sign in.</p>
                    <p style={parastyle}>We've sent you an email with a link to reset your password if you need to.</p>
                </Grid>
            </Paper>
        </Grid>
     
  );
}

export default Errormessage;
