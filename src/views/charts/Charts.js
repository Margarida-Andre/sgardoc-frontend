import { CCard, CCardBody, CCardGroup, CCardHeader } from "@coreui/react";
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
} from "@coreui/react-chartjs";
import React from "react";

const Charts = () => {
  return (
    <CCardGroup columns className="cols-2">
      <CCard>
        <CCardHeader>Estatística</CCardHeader>

        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: "Interaçao no sistema",
                backgroundColor: "#00D8FF",
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
              },
            ]}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Estatística</CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: ["#41B883", "#3b3b98", "#00D8FF", "#DD1B16"],
                data: [40, 20, 80, 10],
              },
            ]}
            labels={["Aprovados", "Expulsos", "Desistentes", "Reprovados"]}
            options={{
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Estatística</CCardHeader>
        <CCardBody>
          <CChartLine
            datasets={[
              {
                label: "Aprovados",
                backgroundColor: "#3b3b98",
                data: [30, 39, 10, 50, 30, 70, 35],
              },
              {
                label: "Reprovados",
                backgroundColor: "rgb(0,216,255,0.9)",
                data: [39, 80, 40, 35, 40, 20, 45],
              },
            ]}
            options={{
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Estatística</CCardHeader>
        <CCardBody>
          <CChartPie
            datasets={[
              {
                backgroundColor: ["#41B883", "#3b3b98", "#00D8FF", "#DD1B16"],
                data: [40, 20, 80, 10],
              },
            ]}
            labels={["Aprovados", "Expulsos", "Desistentes", "Reprovados"]}
            options={{
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
};

export default Charts;
