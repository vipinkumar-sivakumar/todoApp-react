import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useState, useEffect, useCallback } from "react";
import { deletebyid, gettodo } from "../../api";
import { CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useNavigate } from "react-router-dom";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface TodoItem {
  id: string;
  title: string;
  desc: string;
}

const useStyle = makeStyles()(() => ({
  centeringWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const options = ["Edit", "Delete"];
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openEl, setOpenEl] = React.useState<null | string>(null);
  const open = Boolean(anchorEl);

  const [loading, setLoading] = useState(true);
  const [todoData, setTodoData] = useState<TodoItem[]>([]);
  const navigate = useNavigate();
  const { classes } = useStyle();

  const handleClick =
    (id: string) => (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      setOpenEl(id);
    };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenEl(null);
  };

  const handleEdit = useCallback(
    (item: TodoItem) => {
      navigate(`/Edit/${item.id}`, { state: item });
      setAnchorEl(null);
    },
    [navigate]
  );

  const handleDelete = useCallback(async (id: string) => {
    try {
      await deletebyid(id);
      setTodoData(await gettodo());
      console.log("Triggering the delete");
      setAnchorEl(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }, []);

  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    try {
      const data = await gettodo();

      if (Array.isArray(data)) {
        console.log("API response is an array:", data);
        setTodoData(data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } else {        
        console.error("Unexpected API response:", data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleFunction = useCallback(
    (option: string, item:TodoItem) => {
      if (option === "Delete") {
        handleDelete(item.id);
      } else if (option === "Edit") {
        handleEdit(item);
      }
    },
    [handleDelete, handleEdit]
  );

  return (
    <Box sx={{ flexGrow: 1 }} margin={"20px"}>
      {loading && (
        <div className={classes.centeringWrapper}>
          <CircularProgress />
        </div>
      )}
      {!loading && (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {todoData.map((item) => (
            <Grid item xs={2} sm={4} md={4} key={item.id}>
              <Item>
                <div className="w-full h-48  shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex justify-between px-4 pt-4">
                    <div>
                      <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.title}
                      </h5>
                    </div>
                    <IconButton
                      style={{ color: "white" }}
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick(item.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={openEl === item.id}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      }}
                    >
                      {options.map((option) => (
                        <MenuItem
                          key={option}
                          onClick={() => handleFunction(option, item)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
