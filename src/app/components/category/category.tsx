import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './style.css'; // Certifique-se de importar o CSS

function ProductCategories() {
  return (
    <ButtonGroup aria-label="Basic example" className="custom-button-group">
      <Button variant="primary">Eletrônicos</Button>
      <Button variant="secondary">Casa</Button>
      <Button variant="secondary">Chipocle</Button>
      <Button variant="secondary">Cozinha</Button>
      <Button variant="secondary">Utensilhos</Button>
    </ButtonGroup>
  );
}

export default ProductCategories;
