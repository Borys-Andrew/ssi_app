import React, { useContext, useState } from 'react';
import {
  Container,
  Button,
  Box,
  Typography,
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { Movie } from '../types';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type ErrorsTypes = {
  title?: string;
  description?: string;
  poster?: string;
};

const AddMovieForm: React.FC = () => {
  const [formData, setFormData] = useState<Movie>({
    title: '',
    description: '',
    poster: '',
    createdBy: '',
  });
  const [errors, setErrors] = useState<ErrorsTypes>({});
  const [inputMethod, setInputMethod] = useState<'upload' | 'url'>('upload');
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({ ...errors, [name]: '' });
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    if (file) {
      reader.onload = () => {
        setFormData({
          ...formData,
          poster: reader.result as string,
        });

        setErrors({ ...errors, poster: '' });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;

    setFormData({
      ...formData,
      poster: url,
    });

    setErrors({ ...errors, poster: '' });
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMethod(e.target.value as 'upload' | 'url');

    setFormData({
      ...formData,
      poster: '',
    });
  };

  const validate = () => {
    const newErrors: { title?: string; description?: string; poster?: string } =
      {};

    if (!formData.title) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    if (!formData.poster) {
      newErrors.poster = 'Poster is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    const { title, description, poster } = formData;
    const id = Date.now().toString();

    const newMovie = {
      id,
      title,
      description,
      poster,
      createdBy: userId,
    };

    const db = JSON.parse(localStorage.getItem('db_app') as string);
    db.movies.push(newMovie);
    localStorage.setItem('db_app', JSON.stringify(db));

    setFormData({ title: '', description: '', poster: '', createdBy: '' });

    navigate('/');
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', poster: '', createdBy: '' });

    navigate('/');
  };

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          borderRadius={2}
          border={1}
          sx={{ borderColor: 'grey.500' }}
          padding={5}
        >
          <Box sx={{ flex: 1, marginRight: 4 }}>
            {formData.poster ? (
              <Box
                component="img"
                src={formData.poster}
                alt="Image preview"
                sx={{ width: '100%', height: 'auto' }}
              />
            ) : (
              <Typography variant="h6">No image selected</Typography>
            )}
          </Box>

          <Box sx={{ flex: 2 }}>
            <form onSubmit={handleSubmit}>
              <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 3, textAlign: 'center' }}
              >
                Add Movie Form
              </Typography>

              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={!!errors.title}
              >
                <InputLabel htmlFor="title">Title</InputLabel>
                <OutlinedInput
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  label="Title"
                />
                {!!errors.title && (
                  <FormHelperText>{errors.title}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={!!errors.description}
              >
                <InputLabel htmlFor="description">Description</InputLabel>
                <OutlinedInput
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  label="Description"
                />
                {!!errors.description && (
                  <FormHelperText>{errors.description}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                component="fieldset"
                sx={{ mb: 3 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1 }}
                >
                  Select Image Input Method:
                </Typography>
                <RadioGroup
                  row
                  aria-label="inputMethod"
                  name="inputMethod"
                  value={inputMethod}
                  onChange={handleMethodChange}
                >
                  <FormControlLabel
                    value="upload"
                    control={<Radio />}
                    label="Upload Image"
                  />
                  <FormControlLabel
                    value="url"
                    control={<Radio />}
                    label="Enter Image URL"
                  />
                </RadioGroup>
              </FormControl>

              {inputMethod === 'upload' ? (
                <FormControl
                  fullWidth
                  sx={{ mb: 3 }}
                  error={!!errors.poster}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 1 }}
                  >
                    Upload Poster
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                  />
                  {!!errors.poster && (
                    <FormHelperText error>{errors.poster}</FormHelperText>
                  )}
                </FormControl>
              ) : (
                <FormControl
                  fullWidth
                  sx={{ mb: 3 }}
                  error={!!errors.poster}
                >
                  <InputLabel htmlFor="posterUrl">Poster URL</InputLabel>
                  <OutlinedInput
                    id="posterUrl"
                    name="poster"
                    value={formData.poster}
                    onChange={handleImageUrlChange}
                    label="Poster URL"
                  />
                  {!!errors.poster && (
                    <FormHelperText error>{errors.poster}</FormHelperText>
                  )}
                </FormControl>
              )}

              <Box
                display="flex"
                justifyContent="flex-end"
                gap="20px"
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Create
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AddMovieForm;
