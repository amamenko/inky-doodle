import React, { useState } from "react";
import { StyledAnchor } from "../Search/SearchComponent/styled/StyledAnchor";
import { StyledNavLogo } from "../Search/SearchComponent/styled/StyledNavLogo";
import { Link } from "react-router-dom";
import { ImHome3 } from "react-icons/im";
import { StyledBackToHomeButton } from "../Home/styled/StyledBackToHomeButton";
import InkyLogo from "../../images/inky.png";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import axios from "axios";

const StyledContactPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  padding-bottom: 3rem;

  h2 {
    font-size: 1rem;
    margin: 2rem 0;
    text-align: center;
  }

  @media (min-width: 1024px) {
    width: 50%;
    margin: 0 auto;
  }

  @media (min-width: 1024px) and (max-width: 1400px) {
    width: 75%;
  }
`;

const StyledFormDescription = styled.div`
  display: flex;
  width: 75%;
  font-size: 0.8rem;
  padding: 2rem 0;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0 0 1rem 0;
  }

  @media (min-width: 1200px) {
    font-size: 1rem;
  }
`;

const StyledContactForm = styled.form`
  font-size: 0.8rem;
  width: 75%;

  input {
    color: #000 !important;
    caret-color: #000 !important;
  }

  input,
  button,
  textarea {
    margin-bottom: 2rem;
  }

  button {
    padding: 0.5rem 2rem;
  }
`;

const StyledSubmitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  button {
    margin-bottom: 0;
  }

  span {
    margin-left: 1rem;
    border-color: #006bb3;
    border-bottom-color: transparent;
  }
`;

const StyledSubmitButton = styled.button`
  opacity: 1;
  transition: opacity 0.5s ease;
`;

const StyledSuccessfulSubmissionContainer = styled.div`
  margin-top: 2rem;
  color: green;
`;

const Contact = () => {
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  });

  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    });

    if (ok) {
      form.reset();
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    setServerState({ submitting: true });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_GETFORM_CONTACT_ENDPOINT}`,
      data: new FormData(form),
    })
      .then((r) => {
        handleServerResponse(
          true,
          "Your Inky Doodle contact form submission has been sent successfully! We will get back to you shortly.",
          form
        );
      })
      .catch((r) => {
        handleServerResponse(false, r.response.data.error, form);
      });
  };

  return (
    <>
      <StyledAnchor href="/">
        <StyledNavLogo src={InkyLogo} alt="Inky Doodle Logo" />
      </StyledAnchor>
      <Link to="/">
        <StyledBackToHomeButton type="button" className="nes-btn is-warning">
          <ImHome3 />
          <p>Home</p>
        </StyledBackToHomeButton>
      </Link>
      <StyledContactPage>
        <h2>Contact Us</h2>
        <StyledFormDescription>
          <p>
            We love to hear from you! If you have any questions, comments, or
            requests, feel free to reach out to us!
          </p>
        </StyledFormDescription>
        <StyledContactForm onSubmit={handleOnSubmit}>
          <div className="nes-field">
            <label htmlFor="name_field">Name</label>
            <input
              type="text"
              name="name"
              id="name_field"
              className="nes-input"
            />
          </div>

          <div className="nes-field">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              name="email"
              id="email_field"
              aria-describedby="email"
              className="nes-input"
            />
          </div>

          <label htmlFor="textarea_field">Questions/Comments</label>
          <textarea
            name="message"
            id="textarea_field"
            maxLength={1000}
            className="nes-textarea"
            rows="7"
          />

          <StyledSubmitContainer>
            <StyledSubmitButton
              type="submit"
              className="nes-btn is-primary"
              disabled={serverState.submitting}
            >
              Submit
            </StyledSubmitButton>
            <ClipLoader loading={serverState.submitting} />
          </StyledSubmitContainer>
          {serverState.status && (
            <StyledSuccessfulSubmissionContainer>
              <p>{serverState.status.msg}</p>
            </StyledSuccessfulSubmissionContainer>
          )}
        </StyledContactForm>
      </StyledContactPage>
    </>
  );
};

export default Contact;
