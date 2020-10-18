import { 
  FC, 
  useState, 
  ChangeEvent,
} from 'react';
import styled from 'styled-components';
import { Select as MuiSelect, MenuItem } from '@material-ui/core';

const Wrapper = styled.div`
  width: 100%;

  > * {
    width: 100%;
  }
`;

export type Node = {
  title: string;
  value: string;
}

type PropTypes = {
  children?: never;
  nodes: Node[];
  error: boolean;
  onChange: (value: string) => void;
}

type SelectChangeType = {
  name: string;
  value: string;
}

export const Select: FC<PropTypes> = (
  { nodes, error, onChange }: PropTypes,
) => {
  const [selected, setSelected] = useState<string>(nodes.length > 0 ? nodes[0].value : '');
  
  const items = nodes.map((node) => (
    <MenuItem key={node.value} value={node.value}>{node.title}</MenuItem>
  ));

  const handleChange = (e: ChangeEvent<SelectChangeType>) => {
    e.preventDefault();
    const { value } = e.target;

    onChange(value);
    setSelected(value);
  };

  return (
    <Wrapper>
      <MuiSelect
        color="primary"
        variant="outlined"
        onChange={handleChange}
        value={selected}
        error={error}
      >
        {items}
      </MuiSelect>
    </Wrapper>
  );
};
