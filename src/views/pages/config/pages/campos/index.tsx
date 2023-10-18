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

const Campos: React.FC<Props> = (props) => {
  const [inputs, setInputs] = useState(props.configurations.inputs);
  const { REMOVE_INPUT } = props;

  const DeleteCampo = (index: number) => {
    REMOVE_INPUT(index);
    setInputs(props.configurations.inputs);
  };

  const EditCampo = (index: number) => {
    console.log("Edit Campo na Position => ", index);
  };

  return (
    <>
      <ContainerHeaderItemConfig>
        <h2>Campos</h2>
        <LinkAdd linkText="Campos" linkTo="/config/campos/add" />
      </ContainerHeaderItemConfig>

      <ListItems
        items={inputs}
        handleDelete={DeleteCampo}
        handleEdit={EditCampo}
      />
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  configurations: state.configurations,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ConfigActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Campos);
