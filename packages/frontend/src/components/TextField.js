// TextField.js
import { Form, MaskedInput } from "rsuite";

export default function TextField(props) {
  const { name, label, placeholder,onChange, style, mask, ...rest } = props;

  return (
    <Form.Group controlId={`${name}-3`} style={style}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      {mask ? <MaskedInput
        name={name}
        mask={mask}
        placeholder={placeholder}
        value={rest.value}
        onChange={onChange}
        {...rest}
      /> :
        <Form.Control placeholder={placeholder} name={name} {...rest} />
      }
    </Form.Group>
  );
}
