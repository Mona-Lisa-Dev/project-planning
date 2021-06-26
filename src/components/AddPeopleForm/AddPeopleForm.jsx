// import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import s from './AddPeopleForm.module.scss';

const AddPeopleForm = () => {
  const [email, setEmail] = useState('');

  const handleChange = e => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!email) {
      alert('Enter e-mail!');
      return;
    }

    setEmail('');
  };

  return (
    <div className={s.form}>
      <h2 className={s.title}>Add people</h2>
      <form id="add" onSubmit={handleSubmit}>
        <label htmlFor={email}>
          <input
            required
            id={email}
            value={email}
            type="text"
            name="email"
            autoComplete="current-email"
            placeholder="Enter e-mail"
            className={s.input}
            onChange={handleChange}
          />
        </label>
      </form>

      <p className={s.text}>Added users:</p>
      <p>You have not added any users yet</p>
      <button form="add" type="submit" className={s.ready_btn}>
        Ready
      </button>
      <button form="add" type="button" className={s.cancel_btn}>
        Cancel
      </button>
    </div>
  );
};

export default AddPeopleForm;
