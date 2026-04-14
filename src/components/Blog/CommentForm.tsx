import React from "react";

const CommentForm: React.FC = () => (
  <div className="contact-form">
    <h6 className="contact-title">Leave a Comment</h6>
    <form id="CommentsForm" method="post" action="#">
      <div className="form-inputs">
        <div className="type_1">
          <input
            type="text"
            name="fullname"
            id="fullname"
            className="csame"
            placeholder="First name*"
          />
        </div>
        <div className="type_1">
          <input
            type="email"
            name="email"
            id="emailInput"
            className="csame"
            placeholder="Email address*"
            required
          />
        </div>
      </div>
      <div className="form-textarea">
        <div className="type_1">
          <textarea
            name="description"
            rows={3}
            id="textareaInput"
            className="csame"
            placeholder="Write your comment..."
          ></textarea>
        </div>
      </div>
      <div className="tm-height-30 tm-height-lg-20"></div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="0"
          id="checkDefault"
        />
        <label className="form-check-label" htmlFor="checkDefault">
          I agree to the collection and storage of my data.
        </label>
      </div>
      <div className="tm-height-60 tm-height-lg-30"></div>
      <button type="submit" id="submit" className="primary__btn border-0">
        <span>POST COMMENTS</span>
      </button>
    </form>
  </div>
);

export default CommentForm;
