import { ActionIcon, Group, NumberInput } from '@mantine/core';
import { useRef } from 'react';

const NumInput = ({ value, onChange, max }) => {
  const handlers = useRef();

  return (
    <Group spacing={5}>
      <ActionIcon
        className='h-9 w-9'
        variant='default'
        onClick={() => handlers.current.decrement()}
      >
        –
      </ActionIcon>

      <NumberInput
        hideControls
        value={value}
        onChange={onChange}
        handlersRef={handlers}
        max={max}
        min={0}
        step={1}
        // styles={{ input: { width: 54, textAlign: 'center' } }}
        className='w-14'
      />

      <ActionIcon
        className='h-9 w-9'
        variant='default'
        onClick={() => handlers.current.increment()}
      >
        +
      </ActionIcon>
    </Group>
  );
};
export default NumInput;
