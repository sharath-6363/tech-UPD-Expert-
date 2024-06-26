import React, { useState } from "react";
import "../AllCss/Email.css";

export default function SendEmailComponent({ setbol }) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = () => {
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100">
      <div className="backscreen" onClick={() => setbol(false)}></div>
      <div className="posi p-4">
        <h2>Send Email</h2>
        <div>
          <label>Recipient Email:</label>
          <br />
          <input
            type="email"
            className="form-control"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Subject:</label>
          <br />
          <input
            type="text"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label>Message:</label>
          <br />
          <textarea
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <br />
        <button
          onClick={handleSendEmail}
          className="btn btn-primary blocked w-100 "
        >
          Send Email
        </button>
      </div>
    </div>
  );
}
