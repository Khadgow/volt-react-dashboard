
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import {
  acquisitionWidget,
  barChartWidget,
  circleChartWidgetTraffic,
  counterWidgetCustomers,
  counterWidgetRevenue, pageVisitsTable, progressTrackWidget, rankingWidget,
  salesValueWidget, teamMembersWidget
} from "../../interactive guide/Guides";
import {useInteractiveGuide} from "../../interactive guide/Utils";

export default () => {

  const setInteractiveGuide =useInteractiveGuide();
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
          <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />New Task
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" /> Upload Files
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview Security
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Upgrade to Pro
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <ButtonGroup>
          <Button variant="outline-primary" size="sm">Share</Button>
          <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup>
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">

          <SalesValueWidget ref={(ref)=>setInteractiveGuide(ref,salesValueWidget)}
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget ref={(ref)=>setInteractiveGuide(ref, counterWidgetCustomers)}
            category="Customers"
            title="345k"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget ref={(ref)=>setInteractiveGuide(ref, counterWidgetRevenue)}
            category="Revenue"
            title="$43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget ref={(ref)=>setInteractiveGuide(ref, circleChartWidgetTraffic)}
            title="Traffic Share"
            data={trafficShares} />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable ref={(ref)=>setInteractiveGuide(ref, pageVisitsTable)} />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget ref={(ref)=>setInteractiveGuide(ref, teamMembersWidget)} />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget ref={(ref)=>setInteractiveGuide(ref, progressTrackWidget)} />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Total orders"
                    value={452}
                    percentage={18.2}
                    data={totalOrders}
                  ref={(ref)=>setInteractiveGuide(ref, barChartWidget)}/>
                </Col>

                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget ref={(ref)=>setInteractiveGuide(ref, rankingWidget)}/>
                </Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget ref={(ref)=>setInteractiveGuide(ref, acquisitionWidget)} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
