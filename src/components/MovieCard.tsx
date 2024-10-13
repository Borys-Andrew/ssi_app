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
import { useNavigate } from 'react-router-dom';

type MoviecardProps = {
  id: string;
  title: string;
  poster: string;
  description: string;
  onDelete: (id: string) => void;
};

const MovieCard: React.FC<MoviecardProps> = ({
  id,
  title,
  poster,
  description,
  onDelete,
}) => {
  const navigate = useNavigate();
  const isFavorite = false;

  const handleToggleFavorite = () => {
    console.log(`toggle favite movie id ${id}`);

    // const db = localStorage.getItem('db_app');
    // const parsedDB = JSON.parse(db as string);

    // const user = parsedDB.users.find((user: User) => {
    //   return user.id === userId;
    // });

    // user.favorites.includes(id)
    //   ? (user.favorites = user.favorites.filter(
    //       (movieId: string) => movieId !== id,
    //     ))
    //   : user.favorites.push(id);

    // localStorage.setItem('db_app', JSON.stringify(parsedDB));
  };

  const handleEdit = () => {
    console.log(`Edit movie with ${id}`);
    navigate(`/edit-movie/${id}`, { replace: true });
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
        <CardContent
          sx={{
            paddingBottom: '0',
          }}
        >
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
            onClick={() => onDelete(id)}
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
            backgroundColor: 'rgba(117, 117, 117, 1)',
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
