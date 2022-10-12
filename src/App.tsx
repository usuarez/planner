import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AddTask } from "./components/AddTask";
import { MobileMenu } from "./components/MobileMenu";
import { TodayView } from "./pages/todayView";

function App() {
  const [showCreateTask, setShowCreateTask] = useState(false);
  return (
    <div className="app">
      <Container fluid>
        <Row>
          <Col xs={12}>
            <TodayView />
          </Col>
        </Row>
      </Container>
      <MobileMenu setShowCreateTask={setShowCreateTask} />
      <AddTask
        showCreateTask={showCreateTask}
        setShowCreateTask={setShowCreateTask}
      />
    </div>
  );
}

export default App;
