import React, { useState } from "react";
// import { Container } from './styles';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ContainerHeaderItemConfig } from "../../shared/HeaderItemConfig/styles";
import LinkAdd from "../../shared/LinkAdd";
import ListItems from "../../shared/ListItems";
import { AppState } from "../../store";
import * as ConfigActions from "../../store/configurations/actions";
import { Props } from "../../types";

const Classes: React.FC<Props> = (props) => {
  const [classes, setClasses] = useState(props.configurations.classes);
  const { REMOVE_CLASSE } = props;

  const DeleteClasse = (index: number) => {
    REMOVE_CLASSE(index);
    setClasses(props.configurations.classes);
  };

  const EditClasse = (index: number) => {
    console.log("Edit Classe na Position => ", index);
  };

  return (
    <>
      <ContainerHeaderItemConfig>
        <h2>Classes </h2>
        <LinkAdd linkText="Classes" linkTo="/config/classes/add" />
      </ContainerHeaderItemConfig>

      <ListItems
        items={classes}
        handleDelete={DeleteClasse}
        handleEdit={EditClasse}
      />
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  configurations: state.configurations,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ConfigActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
