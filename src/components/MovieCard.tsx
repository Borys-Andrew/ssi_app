import {
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import React from 'react';
import { Delete, Edit, FavoriteBorder, Favorite } from '@mui/icons-material';

type MoviecardProps = {
  id: string;
  title: string;
  poster: string;
  description: string;
};

const MovieCard: React.FC<MoviecardProps> = ({
  id,
  title,
  poster,
  description,
}) => {
  const isFavorite = false;

  const handleToggleFavorite = () => {
    console.log(`toggle favite movie id ${id}`);
  };

  const handleDelete = () => {
    console.log(`Delete movie with ${id}`);
  };

  const handleEdit = () => {
    console.log(`Edit movie with ${id}`);
  };

  return (
    <Box width="300px">
      <Card
        sx={{
          position: 'relative',
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={poster}
          alt={`Poster ${title}`}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            sx={{
              WebkitLineClamp: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            typography="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              height: '40px',
            }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            aria-label="edit"
            size="small"
            title="Edit movie"
            onClick={handleEdit}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            title="Delete movie"
            onClick={handleDelete}
          >
            <Delete />
          </IconButton>
        </CardActions>
        <IconButton
          aria-label="add to favorites"
          size="medium"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
        </IconButton>
      </Card>
    </Box>
  );
};

export default MovieCard;
