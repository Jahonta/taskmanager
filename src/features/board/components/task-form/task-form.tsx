import { FormEvent } from 'react';
import { Task } from '@taskmanager/types';

type TaskFormProps = {
  task: Task;
  onSubmit: (task: Task) => void;
};

function TaskForm({ task, onSubmit }: TaskFormProps) {
  const { color, description, dueDate, repeatingDays, isArchived, isFavorite } =
    task;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(task);
  };

  return (
    <article className='card card--edit card--yellow card--repeat'>
      <form
        className='card__form'
        method='get'
        action='#'
        onSubmit={handleSubmit}
      >
        <div className='card__inner'>
          <div className='card__color-bar'>
            <svg className='card__color-bar-wave' width='100%' height='10'>
              <use xlinkHref='#wave'></use>
            </svg>
          </div>

          <div className='card__textarea-wrap'>
            <label>
              <textarea
                className='card__text'
                placeholder='Start typing your text here...'
                name='text'
              >
                This is example of task edit. You can set date and chose
                repeating days and color.
              </textarea>
            </label>
          </div>

          <div className='card__settings'>
            <div className='card__details'>
              <div className='card__dates'>
                <button className='card__date-deadline-toggle' type='button'>
                  date: <span className='card__date-status'>yes</span>
                </button>

                <fieldset className='card__date-deadline'>
                  <label className='card__input-deadline-wrap'>
                    <input
                      className='card__date'
                      type='text'
                      placeholder=''
                      name='date'
                      value='23 September 16:15'
                    />
                  </label>
                </fieldset>

                <button className='card__repeat-toggle' type='button'>
                  repeat:<span className='card__repeat-status'>yes</span>
                </button>

                <fieldset className='card__repeat-days'>
                  <div className='card__repeat-days-inner'>
                    <input
                      className='visually-hidden card__repeat-day-input'
                      type='checkbox'
                      id='repeat-mo-4'
                      name='repeat'
                      value='mo'
                    />
                    <label className='card__repeat-day' htmlFor='repeat-mo-4'>
                      mo
                    </label>
                    <input
                      className='visually-hidden card__repeat-day-input'
                      type='checkbox'
                      id='repeat-tu-4'
                      name='repeat'
                      value='tu'
                      checked
                    />
                    <label className='card__repeat-day' htmlFor='repeat-tu-4'>
                      tu
                    </label>
                    <input
                      className='visually-hidden card__repeat-day-input'
                      type='checkbox'
                      id='repeat-we-4'
                      name='repeat'
                      value='we'
                    />
                    <label className='card__repeat-day' htmlFor='repeat-we-4'>
                      we
                    </label>
                    <input
                      className='visually-hidden card__repeat-day-input'
                      type='checkbox'
                      id='repeat-th-4'
                      name='repeat'
                      value='th'
                    />
                    <label className='card__repeat-day' htmlFor='repeat-th-4'>
                      th
                    </label>
                    <input
                      className='visually-hidden card__repeat-day-input'
                      type='checkbox'
                      id='repeat-fr-4'
                      name='repeat'
                      value='fr'
                      checked
                    />
                    <label className='card__repeat-day' htmlFor='repeat-fr-4'>
                      fr
                    </label>
                    <input
                      className='visually-hidden card__repeat-day-input'
                      type='checkbox'
                      name='repeat'
                      value='sa'
                      id='repeat-sa-4'
                    />
                    <label className='card__repeat-day' htmlFor='repeat-sa-4'>
                      sa
                    </label>
                    <input
                      className='visually-hidden card__repeat-day-input'
                      type='checkbox'
                      id='repeat-su-4'
                      name='repeat'
                      value='su'
                      checked
                    />
                    <label className='card__repeat-day' htmlFor='repeat-su-4'>
                      su
                    </label>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className='card__colors-inner'>
              <h3 className='card__colors-title'>Color</h3>
              <div className='card__colors-wrap'>
                <input
                  type='radio'
                  id='color-black-4'
                  className='card__color-input card__color-input--black visually-hidden'
                  name='color'
                  value='black'
                />
                <label
                  htmlFor='color-black-4'
                  className='card__color card__color--black'
                >
                  black
                </label>
                <input
                  type='radio'
                  id='color-yellow-4'
                  className='card__color-input card__color-input--yellow visually-hidden'
                  name='color'
                  value='yellow'
                  checked
                />
                <label
                  htmlFor='color-yellow-4'
                  className='card__color card__color--yellow'
                >
                  yellow
                </label>
                <input
                  type='radio'
                  id='color-blue-4'
                  className='card__color-input card__color-input--blue visually-hidden'
                  name='color'
                  value='blue'
                />
                <label
                  htmlFor='color-blue-4'
                  className='card__color card__color--blue'
                >
                  blue
                </label>
                <input
                  type='radio'
                  id='color-green-4'
                  className='card__color-input card__color-input--green visually-hidden'
                  name='color'
                  value='green'
                />
                <label
                  htmlFor='color-green-4'
                  className='card__color card__color--green'
                >
                  green
                </label>
                <input
                  type='radio'
                  id='color-pink-4'
                  className='card__color-input card__color-input--pink visually-hidden'
                  name='color'
                  value='pink'
                />
                <label
                  htmlFor='color-pink-4'
                  className='card__color card__color--pink'
                >
                  pink
                </label>
              </div>
            </div>
          </div>

          <div className='card__status-btns'>
            <button className='card__save' type='submit'>
              save
            </button>
            <button className='card__delete' type='button'>
              delete
            </button>
          </div>
        </div>
      </form>
    </article>
  );
}

export { TaskForm };
