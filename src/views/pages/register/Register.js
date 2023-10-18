import { CCol, CInput, CLabel, CRow } from "@coreui/react";
import { useState } from "react";
import { animated, useTransition } from "react-spring";
import { ContainerFoto, ContainerGeral, ContainerText } from "./style";

const ConfigData = [
  <>
    <h2> O Que pedimos na inscrição </h2>
    <field>
      <input type="checkbox" name="" id="" />
      <label htmlFor="">Bi do Aluno</label>
    </field>
    <field>
      <input type="checkbox" name="" id="" />
      <label htmlFor="">Certificado do Aluno</label>
    </field>
    <field>
      <input type="checkbox" name="" id="" />
      <label htmlFor="">Atestado Médico do Aluno</label>
    </field>
    <field>
      <input type="checkbox" name="" id="" />
      <label htmlFor="">Cartão de Vacina do Aluno</label>
    </field>
    <field>
      <input type="checkbox" name="" id="" />
      <label htmlFor="">Recenseamento Militar</label>
    </field>
    <field>
      <input type="checkbox" name="" id="" />
      <label htmlFor="">Cópia do Bi do encarregado</label>
    </field>
    <field>
      <input type="checkbox" name="" id="" />
      <label htmlFor=""> Classe Pretendida </label>
    </field>
    <field>
      <input type="checkbox" name="" id="" />
      <label htmlFor=""> Classe Anterior </label>
    </field>
  </>,
  <>
    <h2>Dados Pessoais </h2>

    <CRow>
      <CCol md="6">
        <CLabel htmlForm="name">Nome Completo</CLabel>
        <CInput name="name" id="name" placeholder="Name" />
      </CCol>
      <CCol md="6">
        <CLabel htmlForm="date-nasc">Data de Nascimento</CLabel>
        <CInput
          type="date"
          name="date-nasc"
          id="date-nasc"
          placeholder="Data de Nascimento"
        />
      </CCol>
      <CCol md="6">
        <CLabel htmlFor="bi">Contacto</CLabel>
        <CInput
          type="number"
          name="bi"
          id="bi"
          placeholder="+222 923 723 604"
        />
      </CCol>
      <CCol md="6">
        <CLabel htmlFor="address"> Endereço </CLabel>
        <CInput
          type="text"
          name="address"
          id="address"
          placeholder="Ex: Angola Luanda, Sambizanga Casa S/N"
        />
      </CCol>
    </CRow>
  </>,

  <>
    <h2> Perfil da Escola </h2>

    <CRow>
      <CCol md="6">
        <CLabel htmlFor="bi">Nº da Escola</CLabel>
        <CInput type="number" name="bi" id="bi" placeholder="5111" />
      </CCol>
      <CCol md="6">
        <CLabel htmlFor="bi">Nº de Identificação</CLabel>
        <CInput type="number" name="bi" id="bi" placeholder="5111" />
      </CCol>

      <CCol md="6">
        <CLabel htmlFor="bi">Bi Number</CLabel>
        <CInput type="text" name="bi" id="bi" placeholder="Bi Number" />
      </CCol>
      <CCol md="6">
        <CLabel htmlFor="address"> Endereço </CLabel>
        <CInput
          type="text"
          name="address"
          id="address"
          placeholder="Ex: Angola Luanda, Sambizanga Casa S/N"
        />
      </CCol>
    </CRow>
  </>,

  <>
    <h2>Dados de acesso</h2>

    <CRow>
      <CCol md="6">
        <CLabel htmlFor="bi">Insira o seu E-mail</CLabel>
        <CInput type="gmail" name="gmail" id="gmail" placeholder="E-mail" />
      </CCol>
      <CCol md="6">
        <CLabel htmlForm="name">Insira sua Senha</CLabel>
        <CInput name="password" type="password" placeholder="Senha" />
      </CCol>
      <CCol md="6">
        <CLabel htmlForm="name">Confirme a sua Senha</CLabel>
        <CInput name="password" type="password" placeholder="Senha" />
      </CCol>
    </CRow>
  </>,
];

const Config = () => {
  const [index, setIndex] = useState(1);
  const transitions = useTransition(index, {
    from: { opacity: 0, transform: "scale(1.1)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
    delay: 100,
  });
  return (
    <ContainerGeral>
      <ContainerFoto></ContainerFoto>
      <ContainerText>
        <div>
          <form action="post">
            {transitions(
              (styles, item) =>
                item && (
                  <animated.div class="content" style={styles}>
                    {ConfigData[index]}
                  </animated.div>
                )
            )}
            <div className="control">
              <button
                type="button"
                disabled={index === 1}
                onClick={() => setIndex(index - 1)}
              >
                Prev
              </button>
              <button
                type="button"
                disabled={index >= ConfigData.length - 1}
                onClick={() => setIndex(index + 1)}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </ContainerText>
    </ContainerGeral>
  );
};

export default Config;
