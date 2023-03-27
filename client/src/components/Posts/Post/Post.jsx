import React from "react";
import "./styles.css";
import moment, { parseTwoDigitYear } from "moment";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { ThumbUpAltOutlined } from "@mui/icons-material";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId, currentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const Likes = () => {
    if (post.likeCount.length > 0) {
      return post.likeCount.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" /> &nbsp;{" "}
          {post.likeCount.length > 2
            ? `You and ${post.likeCount.length - 1} others`
            : `${post.likeCount.length} ${
                post.likeCount.length > 1 ? "Likes" : "Like"
              } `}
        </>
      ) : (
        <>
          <ThumbUpAltIcon fontSize="small" /> &nbsp; {post.likeCount.length}{" "}
          {post.likeCount.length === 1 ? "like" : "likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" /> &nbsp; Like
      </>
    );
  };
  return (
    <Card className="card">
      <CardMedia
        className="media"
        image={post.selectedFile}
        title={post.title}
      />
      <div className="overlay">
        <Typography variant="h6"> {post.name} </Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className="overlay2">
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post.creator) && (
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize="default" />
          </Button>
        )}
      </div>
      <div className="details">
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className="title" variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          className="title"
          variant="body2"
          color="text-secondary"
          component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className="cardActions">
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => {
            dispatch(likePost([post._id, user.result?._id]));
          }}>
          <Likes />
          {/* &nbsp; {post?.likeCount?.length + 1} */}
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
