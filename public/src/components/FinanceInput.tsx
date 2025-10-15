import { useRef, forwardRef, useImperativeHandle } from 'react';
import { TextInput } from '@mantine/core';

interface FinanceInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (question: string) => void;
}

export interface FinanceInputRef {
  focus: () => void;
}

const FinanceInput = forwardRef<FinanceInputRef, FinanceInputProps>(
  ({ value, onChange, onSubmit }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    const handleSubmit = () => {
      if (!value.trim()) return;
      onSubmit(value);
      onChange('');
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    };

    return (
      <TextInput
        ref={inputRef}
        size="lg"
        radius={'xl'}
        placeholder="Ask your finance question..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        style={{ width: '100%' }}
        autoFocus
      />
    );
  }
);

FinanceInput.displayName = 'FinanceInput';

export default FinanceInput;
