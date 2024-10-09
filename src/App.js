import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Tab, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const initialTodoItems = [
  { title: "Todo 1", description: "Description for Todo 1", dueDate: "2024-10-15" },
  { title: "Todo 2", description: "Description for Todo 2", dueDate: "2024-10-10" },
  { title: "Todo 3", description: "Description for Todo 3", dueDate: "2024-10-05" },
  { title: "Todo 4", description: "Description for Todo 4", dueDate: "2024-10-01" },
];

const App = () => {
  const [items, setItems] = useState(initialTodoItems);

  const getColorVariant = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff > 7) return 'primary';
    if (daysDiff > 4) return 'success';
    if (daysDiff > 2) return 'warning';
    return 'danger';
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const dueDate = event.target.elements.dueDate.value;

    if (title && dueDate) {
      const newTodo = { title, description: '', dueDate };
      setItems([...items, newTodo]);
      event.target.reset();
    }
  };

  return (
    <Container>
      <h1 class="d-block d-flex justify-content-center " style={{ margin: '30px'}}>Assignment 2: Vishnu Vardhan Perali's ToDo List</h1>

      <Row className="mb-4" >
        <Col sm={4} className="bg-success p-4 light-green">
          <Form onSubmit={handleAddTodo}>
            <Form.Group controlId="title">
              <Form.Label>ToDo Item</Form.Label>
              <Form.Control type="text" placeholder="Add todo item" />
            </Form.Group>
            <Form.Group controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" placeholder="mm/dd/yyyy" />
            </Form.Group>
            <Button className="custom-blue mt-3 w-100" style={ { backgroundColor: 'blue'}}
                type="submit">
              Add Todo
            </Button>
          </Form>
        </Col>
        <Col sm={8}>
          <Tab.Container defaultActiveKey={items.length > 0 ? '0' : ''}>
            <Row>
              <Col sm={4}>
                <ListGroup>
                  {items.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      eventKey={index.toString()}
                      variant={getColorVariant(item.dueDate)}
                      action
                    >
                      {item.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col sm={8} className="p-4">
                <Tab.Content>
                  {items.map((item, index) => (
                    <Tab.Pane eventKey={index.toString()} key={index}>
                      <h5 className="text-primary">{item.title}</h5>
                      <div
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        className="border p-2 mb-3"
                      >
                        {item.description || 'No description'}
                      </div>
                      <Form.Label>Due Date:</Form.Label>
                      <input
                        type="date"
                        className="form-control w-50"
                        value={item.dueDate}
                        onChange={(e) => {
                          const updatedItems = [...items];
                          updatedItems[index].dueDate = e.target.value;
                          setItems(updatedItems);
                        }}
                      />
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
