import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactNode } from 'react';

interface IContainerProps {
    children: ReactNode;
}

function DefaultContainer({children}: IContainerProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default DefaultContainer;