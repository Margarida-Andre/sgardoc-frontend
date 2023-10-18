import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../store";
import * as ConfigActions from "../../store/configurations/actions";
import { Props } from "../../types";

const HomeConfig: React.FC<Props> = (props) => {
  const { classes, cursos, disciplinas, inputs } = props.configurations;
  return (
    <>
      <div> Home </div>

      <div> Classes &gt; {classes.length} </div>
      <div> Cursos &gt; {cursos.length} </div>
      <div> Disciplinas &gt; {disciplinas.length} </div>
      <div> Campos &gt; {inputs.length} </div>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  configurations: state.configurations,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ConfigActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeConfig);
