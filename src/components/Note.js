import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import shadows from "@material-ui/core/styles/shadows";

function Note({ data }) {

    // Styles
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            boxShadow: shadows["10"],
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        container: {
            paddingRight: '20px',
            paddingLeft: '20px'
        }
    });
    const classes = useStyles();

    // Note Template
    return (
        <div>
            <Grid container spacing={4} className={classes.container} justify={"center"}>

            {data.map((item, id) => {
                return  <Grid item xs={12} md={6} sm={6} key={id}>
                    <Card className={classes.root} variant="outlined" bg={"dark"} text={"white"} border="info">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom><b>Date of Register:</b> {item.date}</Typography>
                            <Typography variant="h5" component="h2"><b>Responsable:</b> {item.responsible}</Typography>
                            <hr/>
                            <Typography variant="body1" component="p"><b>Description</b></Typography>
                            <Typography variant="body2" component="p">{item.description}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            })}

            </Grid>
        </div>

    );
}

export default Note;