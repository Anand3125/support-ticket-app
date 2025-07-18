import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  status: yup.string().oneOf(['Open', 'In Progress', 'Closed']).required('Status is required'),
  priority: yup.string().oneOf(['Low', 'Medium', 'High']).required('Priority is required'),
  assignee: yup.string().required('Assignee is required'),
});

type FormData = yup.InferType<typeof schema>;

const CreateTicketForm: React.FC = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      status: 'Open',
      priority: 'Medium',
      assignee: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      setOpenSnackbar(true);
      reset();
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3, boxShadow: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h5" gutterBottom>
        Create New Ticket
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
              required
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
              required
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" required error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Select {...field} label="Status">
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" required error={!!errors.priority}>
              <InputLabel>Priority</InputLabel>
              <Select {...field} label="Priority">
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="assignee"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Assignee"
              fullWidth
              margin="normal"
              error={!!errors.assignee}
              helperText={errors.assignee?.message}
              required
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting || mutation.isLoading}
        >
          {mutation.isLoading ? 'Creating...' : 'Create Ticket'}
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Ticket created successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateTicketForm;
