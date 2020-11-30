import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

function Note({ data }) {

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
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

    return (
        <div className={classes.root}>
            <Grid container spacing={4} className={classes.container} justify={"center"}>

            {data.map((item, id) => {
                return  <Grid item xs={12} md={4} sm={4} key={id}>
                    <Card className={classes.root} variant="outlined" bg={"dark"} text={"white"} border="info">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>Date of Register: {item.date}</Typography>
                            <Typography variant="h5" component="h2">{item.responsible}</Typography>
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