import {
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  BoxButton,
  BoxContainer,
  BoxPrincipal,
  ModalStyle,
  titleModal,
  textFields,
} from "./styles/stylesModals";
import CloseIcon from "@mui/icons-material/Close";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { StartAddDocumentsByCourse } from "../redux/actions/teacherActions";

const ModalAddStudentACourse = ({ isOpen, handleOnClose }) => {
  const dispatch = useDispatch();
  const { jwt } = useSelector((s) => s?.authReducer);
  const { course } = useSelector((s) => s?.teacherReducer);
  const [values, handleInputChange, resetValues] = useForm({
    studentId: 0,
    courseId: course.course_id,
  });

  const { studentId } = values;

  const handleOnSubmit = (ev) => {
    ev.preventDefault();
    console.log(values);
    handleOnClose();
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose} sx={ModalStyle}>
      <Box sx={BoxPrincipal}>
        <Box sx={BoxContainer}>
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
            Agregar Estudiante al curso
          </Typography>
          <form
            onSubmit={(ev) => handleOnSubmit(ev)}
            style={{ alignSelf: "center" }}
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
                Estudiante
              </Typography>
              <Select
                required
                name="studentId"
                //fullWidth
                sx={textFields}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Filtrar Por"
                onChange={handleInputChange}
                value={studentId}
              >
                <MenuItem value="">
                  <em></em>
                </MenuItem>
                <MenuItem value={0}>Documento</MenuItem>
                <MenuItem value={1}>Examen</MenuItem>
              </Select>
            </Box>

            <Box sx={BoxButton}>
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

export default ModalAddStudentACourse;
