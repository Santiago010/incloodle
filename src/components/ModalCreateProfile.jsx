import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Select,
  ButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import {
  boxContainer,
  boxPrincipal,
  modalStyle,
  titleModal,
  textFields,
} from "./styles/stylesModals";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../hooks/useForm";
import { StartAddProfile } from "../redux/actions/profileActions";

const ModalCreateProfile = ({ isOpen, handleOnClose }) => {
  const [rol, setRol] = useState(0);
  const { jwt } = useSelector((s) => s?.authReducer);
  const [values, handleInputChange, resetValues] = useForm({
    name: "",
    email: "",
    rut: "",
    password: "",
  });

  const { name, email, rut, password } = values;
  const dispatch = useDispatch();
  const handleOnSubmit = (ev) => {
    ev.preventDefault();
    dispatch(StartAddProfile(jwt, values, rol));
    handleOnClose();
  };

  useEffect(() => {
    resetValues();
  }, [isOpen]);

  return (
    <Modal open={isOpen} onClose={handleOnClose} sx={modalStyle}>
      <Box sx={boxPrincipal}>
        <Box sx={boxContainer}>
          <IconButton
            aria-label="delete"
            size="small"
            sx={{ alignSelf: "flex-end" }}
            onClick={handleOnClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <Typography
            variant="h6"
            component="h6"
            textAlign="center"
            sx={titleModal}
          >
            Agregar Perfil
          </Typography>
          <form
            onSubmit={(ev) => handleOnSubmit(ev)}
            style={{
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginY: "20px",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                textAlign="center"
                sx={{ color: "#fff" }}
              >
                Nombre
              </Typography>
              <TextField
                required
                size="small"
                sx={textFields}
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginY: "20px",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                textAlign="center"
                sx={{ color: "#fff" }}
              >
                Rol
              </Typography>
              <Select
                required
                name="rol"
                //fullWidth
                sx={textFields}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Filtrar Por"
                onChange={(ev) => setRol(ev.target.value)}
                value={rol}
              >
                <MenuItem value="">
                  <em></em>
                </MenuItem>
                <MenuItem value={1}>Profesor</MenuItem>
                <MenuItem value={2}>Estudiante</MenuItem>
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginY: "20px",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                textAlign="center"
                sx={{ color: "#fff" }}
              >
                Rut
              </Typography>
              <TextField
                size="small"
                required
                name="rut"
                sx={textFields}
                id="outlined-basic"
                label="Rut"
                variant="outlined"
                value={rut}
                onChange={handleInputChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginY: "20px",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                textAlign="center"
                sx={{ color: "#fff" }}
              >
                Contraseña
              </Typography>
              <TextField
                size="small"
                required
                name="password"
                sx={textFields}
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
                type="password"
                value={password}
                onChange={handleInputChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginY: "20px",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                textAlign="center"
                sx={{ color: "#fff" }}
              >
                Email
              </Typography>
              <TextField
                required
                name="email"
                sx={textFields}
                size="small"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={handleInputChange}
              />
            </Box>
            <Box
              sx={{
                alignSelf: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                sx={{ backgroundColor: "#fff", marginX: "10px" }}
                variant="outlined"
              >
                Guardar
              </Button>
              <Button
                sx={{ backgroundColor: "#fff", marginX: "10px" }}
                variant="outlined"
                onClick={handleOnClose}
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCreateProfile;
