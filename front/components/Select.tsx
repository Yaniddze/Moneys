import { 
  FC, 
  useState, 
  ChangeEvent,
} from 'react';
import styled from 'styled-components';
import { 
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';

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
  label: string;
  onChange: (value: string) => void;
}

type SelectChangeType = {
  name: string;
  value: string;
}

export const Select: FC<PropTypes> = ({ 
  nodes,
  error,
  onChange,
  label,
}: PropTypes) => {
  const [selected, setSelected] = useState<string>('');
  
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
      <FormControl variant="outlined">
        <InputLabel>{label}</InputLabel>
        <MuiSelect
          color="primary"
          onChange={handleChange}
          value={selected}
          error={error}
          label={label}
        >
          {items}
        </MuiSelect>
      </FormControl>
    </Wrapper>
  );
};
