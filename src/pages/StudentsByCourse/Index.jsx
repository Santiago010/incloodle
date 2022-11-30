import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalAddStudentACourse from "../../components/ModalAddStudentACourse";
import ModalDeleteStudentFromACourse from "../../components/ModalDeleteStudentFromACourse";
import IndexFinalScoreOfTheStudent from "../../components/ModalFinalScoreOfTheStudent/Index";
import IndexReportStudent from "../../components/ModalReportStudent/Index";
import { useModal } from "../../hooks/useModal";
import {
  ChooseStudent,
  StartGetReport,
  StartGetStudentByCourse,
} from "../../redux/actions/teacherActions";
import Page from "./Page";

const IndexStudentsByCourse = () => {
  const {
    isOpen: isOpenModalCreate,
    handleOpenModal: handleOpenModalCreate,
    handleCloseModal: handleCloseModalCreate,
  } = useModal(false);
  const {
    isOpen: isOpenModalDelete,
    handleOpenModal: handleOpenModalDelete,
    handleCloseModal: handleCloseModalDelete,
  } = useModal(false);
  const {
    isOpen: isOpenModalFinalScore,
    handleOpenModal: handleOpenModalFinalScore,
    handleCloseModal: handleCloseModalFinalScore,
  } = useModal(false);
  const {
    isOpen: isOpenModalReport,
    handleOpenModal: handleOpenModalReport,
    handleCloseModal: handleCloseModalReport,
  } = useModal(false);
  const { jwt } = useSelector((s) => s?.authReducer);
  const { dataStudentsByCourse, dataFiltered } = useSelector(
    (s) => s?.teacherReducer
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleEvaluateStudent = (data) => {
    dispatch(ChooseStudent(data));
    handleOpenModalFinalScore();
  };

  const handleReportStudent = (data) => {
    dispatch(ChooseStudent(data));
    handleOpenModalReport();
    dispatch(StartGetReport(jwt, data.student_id, Number(id)));
  };

  const handleDelete = (data) => {
    dispatch(ChooseStudent(data));
    handleOpenModalDelete();
  };

  useEffect(() => {
    dispatch(StartGetStudentByCourse(jwt, id));
  }, []);

  return (
    <Page
      data={dataFiltered.length === 0 ? dataStudentsByCourse : dataFiltered}
      handleEvaluateStudent={handleEvaluateStudent}
      handleReportStudent={handleReportStudent}
      handleDelete={handleDelete}
      handleCreate={handleOpenModalCreate}
      fragmentModals={
        <>
          <ModalDeleteStudentFromACourse
            isOpen={isOpenModalDelete}
            handleOnClose={handleCloseModalDelete}
          />
          <ModalAddStudentACourse
            isOpen={isOpenModalCreate}
            handleOnClose={handleCloseModalCreate}
          />
          <IndexFinalScoreOfTheStudent
            isOpen={isOpenModalFinalScore}
            handleOnClose={handleCloseModalFinalScore}
          />
          <IndexReportStudent
            isOpen={isOpenModalReport}
            handleOnClose={handleCloseModalReport}
          />
        </>
      }
    />
  );
};

export default IndexStudentsByCourse;
