import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useComponentVisible } from '../../hooks/useComponentVisible';
import { BasicText } from './styled/basic-text';
import { TextContainer } from './styled/text-container';
import { TextInput } from './styled/text-input';

type Props = {
  text: string;
  onChange: (value: string) => void;
};

export const Text = ({ onChange, text }: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [value, setValue] = useState(text);

  useEffect(() => setValue(text), [text]);

  const onEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    onChange(value);
    setIsComponentVisible(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onChange(value);
      setIsComponentVisible(false);
    }
  };

  return (
    <TextContainer className="text-container" ref={ref}>
      {isComponentVisible ? (
        <TextInput
          className="text-input"
          value={value}
          onChange={onEdit}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <BasicText
          className="text-content"
          onClick={() => setIsComponentVisible(true)}
        >
          {value}
        </BasicText>
      )}
    </TextContainer>
  );
};
