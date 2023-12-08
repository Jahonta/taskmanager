import { FormEvent, useState, useRef } from 'react';
import cn from 'classnames';

import { Task } from '@taskmanager/types';
import { Button } from '@taskmanager/components';
import {
  getEmptyRepeatingDays,
  isRepeating as helperIsRepeating,
} from '@taskmanager/helpers';
import { useDatepicker } from '@taskmanager/hooks';

import { formatCardDate } from '../../helpers/format';

import { ColorsContainer } from '../colors-container/colors-container';
import { RepeatingContainer } from '../repeating-container/repeating-container';

type TaskFormProps = {
  task: Task;
  onSubmit: (task: Task) => void;
  onDelete: () => void;
  isCreating: boolean;
};

function TaskForm({
  task,
  onSubmit,
  onDelete,
  isCreating = false,
}: TaskFormProps) {
  const [color, setColor] = useState(task.color);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [repeatingDays, setRepeatingDays] = useState(task.repeatingDays);
  const [hasDueDate, setHasDueDate] = useState(Boolean(dueDate));
  const [isRepeating, setIsRepeating] = useState(
    helperIsRepeating(repeatingDays)
  );
  const dateRef = useRef<HTMLInputElement>(null);
  useDatepicker({
    dateRef,
    defaultDate: dueDate,
    condition: hasDueDate,
    onClose: setDueDate,
  });

  const isValid =
    (isRepeating && helperIsRepeating(repeatingDays)) ||
    (hasDueDate && dueDate);

  const handleDueDateToggle = () => {
    if (!hasDueDate) {
      setIsRepeating(false);
    }
    setHasDueDate((prevHasDueDate) => !prevHasDueDate);
  };

  const handleRepeatingToggle = () => {
    if (!isRepeating) {
      setHasDueDate(false);
    }
    setIsRepeating((prevIsRepeating) => !prevIsRepeating);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      ...task,
      color,
      description,
      dueDate: hasDueDate ? dueDate : null,
      repeatingDays: isRepeating ? repeatingDays : getEmptyRepeatingDays(),
    });
  };

  return (
    <article
      className={cn('card', 'card--edit', `card--${color}`, {
        'card--repeat': isRepeating,
      })}
    >
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
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>
          </div>

          <div className='card__settings'>
            <div className='card__details'>
              <div className='card__dates'>
                <Button
                  extraClasses={['card__date-deadline-toggle']}
                  onClick={handleDueDateToggle}
                >
                  date:{' '}
                  <span className='card__date-status'>
                    {hasDueDate ? 'yes' : 'no'}
                  </span>
                </Button>

                <fieldset
                  className='card__date-deadline'
                  disabled={!hasDueDate || isRepeating}
                >
                  <label className='card__input-deadline-wrap'>
                    <input
                      className='card__date'
                      type='text'
                      placeholder=''
                      name='date'
                      defaultValue={formatCardDate(dueDate)}
                      ref={dateRef}
                    />
                  </label>
                </fieldset>

                <Button
                  extraClasses={['card__repeat-toggle']}
                  onClick={handleRepeatingToggle}
                >
                  repeat:
                  <span className='card__repeat-status'>
                    {isRepeating ? 'yes' : 'no'}
                  </span>
                </Button>

                <fieldset
                  className='card__repeat-days'
                  disabled={!isRepeating || hasDueDate}
                >
                  <RepeatingContainer
                    onChange={setRepeatingDays}
                    currentRepeatingDays={repeatingDays}
                  />
                </fieldset>
              </div>
            </div>

            <ColorsContainer onChange={setColor} currentColor={color} />
          </div>

          <div className='card__status-btns'>
            <Button
              extraClasses={['card__save']}
              type='submit'
              disabled={!isValid}
            >
              save
            </Button>
            <Button extraClasses={['card__delete']} onClick={onDelete}>
              {isCreating ? 'cancel' : 'delete'}
            </Button>
          </div>
        </div>
      </form>
    </article>
  );
}

export { TaskForm };
