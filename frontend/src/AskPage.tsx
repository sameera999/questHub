import React from 'react';
import { Page } from './Page';
import { useForm } from 'react-hook-form';
import {
  FieldContainer,
  FieldInput,
  FieldLabel,
  FieldTextArea,
  Fieldset,
  FormButtonContainer,
  PrimaryButton,
} from './Styles';

type FormData = {
  title: string;
  content: string;
};

export const AskPage = () => {
  const { register } = useForm<FormData>();
  return (
    <Page title="Ask a question">
      <form>
        <Fieldset>
          <FieldContainer>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <FieldInput id="title" type="text" {...register('title')} />
          </FieldContainer>
          <FieldContainer>
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <FieldTextArea id="content" {...register('content')} />
          </FieldContainer>
          <FormButtonContainer>
            <PrimaryButton type="submit">Submit Your Question</PrimaryButton>
          </FormButtonContainer>
        </Fieldset>
      </form>
    </Page>
  );
};

export default AskPage;
