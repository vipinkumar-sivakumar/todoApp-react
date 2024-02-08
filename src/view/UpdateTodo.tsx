import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { posttodo, puttoddobyid } from "../api";

interface FormData {
  title: string;
  description: string;
}

const MyForm: React.FC = () => {
  const { register, handleSubmit, formState:{errors,isValid}, setValue } = useForm<FormData>({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const {state} = useLocation()
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    
    if (id) {
      fetchTodoDetails();
    }
  }, [id]);

    const fetchTodoDetails = () => {
    try {
      if (!state) return; 
            
      setValue("title", state.title);
      setValue("description", state.desc);
    } catch (error) {
      console.error("Error fetching todo details:", error);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      
      const apiData = {
        title: data.title,
        desc: data.description,
      };

      if (id) {        
        await puttoddobyid(id, apiData);
      } else {        
        await posttodo(apiData);
      }

      
      navigate("/");
    } catch (error) {
      
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
  
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = (confirmed: boolean) => {
    
    setConfirmDialogOpen(false);

    if (confirmed) {
      navigate("/");
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" gutterBottom align={"center"} margin={"15px"}>
          {id ? "Edit Note" : "Add Note"}
        </Typography>
        <Box border={"solid"} padding={`25px`} bgcolor={"background.paper"}>
          <Box >
            <TextField
            InputLabelProps={{ shrink: true }}
              {...register("title", {
                required: "Please provide a title",
                maxLength: {
                    value: 20,
                    message: "The max length of title is 10",
                }})}
              label="title"             
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title && errors.title.message}             
            />
          </Box>
          <Box>
            <TextField
             InputLabelProps={{ shrink: true }}
              {...register("description", {
                required: "Please provide a description",
                maxLength: {
                    value: 500,
                    message: "The max length of description is 500",
                }})}
              label="description"  
              fullWidth
              margin="normal"
              error={!!errors.description}
              helperText={errors.description && errors.description.message} 
           
            />
          </Box>
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              style={{ marginLeft: "8px" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>

      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmDialogOpen}
        onClose={() => handleConfirmDialogClose(false)}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Do you really want to cancel?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleConfirmDialogClose(false)}
            color="primary"
          >
            No
          </Button>
          <Button
            onClick={() => handleConfirmDialogClose(true)}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyForm;
