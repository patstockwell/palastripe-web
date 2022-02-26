import React, {useState, ChangeEvent, useRef} from 'react';
import styled from 'styled-components';
import jsonp from 'jsonp';

import {BackLinkBanner} from '../components/BackLinkBanner';
import {ButtonBase} from '../components/SharedStyles';
import {Input as InputBase} from './ActiveWorkout/ActivitySearch';
import {
  LOCAL_STORAGE_SUBSCRIBE_EMAIL,
  gutterWidth,
  purple,
  lightGrey3,
  bannerHeight,
} from '../helpers/constants';
import {CheckboxTick, CheckboxCross} from '../components/Checkbox';

const Form = styled.form`
  text-align: left;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Response = styled.p`
  color: grey;
`;

const Input = styled(InputBase)`
  margin: 16px 0;

  &::placeholder {
    color: lightgrey;
  }
`;

const SubscribeButton = styled(ButtonBase)<{ disable: boolean }>`
  display: block;
  margin: 24px auto;
  background: ${props => props.disable ? 'lightgrey' : purple};
  cursor: ${props => props.disable ? 'default' : 'pointer'};
`;

const Gutter = styled.div`
  padding: ${gutterWidth}px;
  text-align: center;
  background-color: ${lightGrey3};
  min-height: calc(100vh - ${(2 * gutterWidth) + bannerHeight}px);
`;

const Label = styled.label`
  margin: 16px 0;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
  color: grey;
`;

interface MailChimpResponse {
  result: 'error' | 'success';
  msg: string;
}

export const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    emailInputRef.current.blur();
    nameInputRef.current.blur();
    const query = `MERGE0=${email}&MERGE1=${name}&u=7fa06b8e5242dba5bd51178a3&id=3ca9272db3`;
    const url = 'https://palastripe.us17.list-manage.com/subscribe/post-json';

    jsonp(`${url}?${query}`, {
      param: 'c', // What does this do? Copied from react-mailchimp-subscribe
      timeout: 10000,
    }, (err, data: MailChimpResponse) => {
      localStorage.setItem(LOCAL_STORAGE_SUBSCRIBE_EMAIL, email);
      const hasError = !!err || data.result === 'error';
      setResponse(err ? err.message : data.msg);
      setLoading(false);
      setError(hasError);
      if (!hasError) { // clear the inputs if successful
        setName('');
        setEmail('');
      }
    });

    setLoading(true);
  };

  const displayedMessage = response === 'Timeout'
    ? 'The request timed out. Please try again later'
    : response;

  const success = response && !error;

  return (
    <>
      <BackLinkBanner
        back={{ showArrows: true, link: '/' }}
        heading="Early Access Subscription"
      />
      <Gutter>
        <Form onSubmit={handleSubmit}>

          <Label htmlFor="email">Email Address *</Label>
          <Input
            placeholder="address@domain.com"
            type="email"
            onChange={handleEmailChange}
            id="email"
            value={email}
            ref={emailInputRef}
          />

          <Label htmlFor="name">Name *</Label>
          <Input
            placeholder="First name (Last name)"
            type="text"
            onChange={handleNameChange}
            id="name"
            value={name}
            ref={nameInputRef}
          />

          <SubscribeButton
            name="submit"
            disabled={success} // this prop is a standard html attribute
            disable={success} // this a custom prop for styling
          >Subscribe</SubscribeButton>
        </Form>
        {loading && <Response>Requesting...</Response>}
        {displayedMessage ? (
          <>
            <CheckboxWrapper>
              {error ? <CheckboxCross /> : <CheckboxTick checked />}
            </CheckboxWrapper>
            <Response dangerouslySetInnerHTML={{ __html: displayedMessage }} />
          </>
        ) : (
          <p>Join the <strong>palastripe</strong> community. Subscribers will be notified first about upcoming features including account creation and workout templates. This list will not send spam and you can unsubscribe at anytime.</p>
        )}
      </Gutter>
    </>
  );
};
