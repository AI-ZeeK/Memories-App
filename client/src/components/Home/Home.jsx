import { Grid, Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";

const Home = () => {
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div>
      <Grow in x>
        <Grid
          className="mainContainer"
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Grow>
    </div>
  );
};

export default Home;
